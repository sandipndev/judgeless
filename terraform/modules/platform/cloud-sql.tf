resource "google_compute_global_address" "peering" {
  provider = google-beta

  project       = local.project
  name          = "${local.name_prefix}-peering"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = data.google_compute_network.vpc.id
}

resource "google_service_networking_connection" "cloud_sql" {
  provider                = google-beta
  network                 = data.google_compute_network.vpc.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.peering.name]
}

resource "random_id" "db_name_suffix" {
  byte_length = 4
}

resource "google_sql_database_instance" "instance" {
  name = "${local.pg_instance_name}-${random_id.db_name_suffix.hex}"

  project             = local.project
  database_version    = "POSTGRES_13"
  region              = local.region
  deletion_protection = !local.destroyable_postgres

  settings {
    tier              = local.postgres_tier
    availability_type = "ZONAL"

    backup_configuration {
      enabled                        = true
      point_in_time_recovery_enabled = true
    }

    ip_configuration {
      ipv4_enabled    = false
      private_network = data.google_compute_network.vpc.id
    }
  }

  depends_on = [google_service_networking_connection.cloud_sql]
}

resource "random_password" "admin" {
  length  = 20
  special = false
}

resource "google_sql_user" "admin" {
  name     = "${local.pg_instance_name}-admin"
  instance = google_sql_database_instance.instance.name
  password = random_password.admin.result
  project  = local.project
}
