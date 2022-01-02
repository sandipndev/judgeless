terraform {
  required_providers {
    postgresql = {
      source  = "cyrilgdn/postgresql"
      version = "1.14.0"
    }
  }
}

provider "postgresql" {
  host     = local.pg_host
  username = local.pg_admin_username
  password = local.pg_admin_password

  # GCP doesn't let superuser mode 
  # https://cloud.google.com/sql/docs/postgres/users#superuser_restrictions
  superuser = false
}

resource "random_password" "judgeless_pg_password" {
  length  = 20
  special = false
}

resource "postgresql_role" "judgeless_pg_user" {
  name     = local.judgeless_pg_user
  password = random_password.judgeless_pg_password.result
  login    = true
}

resource "postgresql_database" "judgeless_db" {
  name       = local.judgeless_pg_dbname
  owner      = local.pg_admin_username
  template   = "template0"
  lc_collate = "en_US.UTF8"

  lifecycle {
    prevent_destroy = true
  }
}

resource "postgresql_grant" "revoke_public_judgeless" {
  database    = postgresql_database.judgeless_db.name
  role        = "public"
  object_type = "database"
  privileges  = []
}

resource "postgresql_grant" "grant_all_judgeless" {
  database    = postgresql_database.judgeless_db.name
  role        = postgresql_role.judgeless_pg_user.name
  object_type = "database"

  # Basically "ALL" but then tf will redeploy
  privileges = ["CONNECT", "CREATE", "TEMPORARY"]

  depends_on = [
    postgresql_grant.revoke_public_judgeless,
  ]
}

resource "kubernetes_secret" "postgres_creds" {
  metadata {
    name = "judgeless-postgres"
  }

  data = {
    "DATABASE_URL" = "postgres://${local.judgeless_pg_user}:${random_password.judgeless_pg_password.result}@${local.pg_host}:5432/${local.judgeless_pg_dbname}"
  }
}
