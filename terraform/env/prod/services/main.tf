variable "gcp_project" {}
variable "name_prefix" {}
variable "cluster_endpoint" {}
variable "cluster_ca_cert" {}
variable "letsencrypt_issuer_email" { default = "bot@judgeless.co" }
variable "pg_host" {}
variable "pg_admin_username" {}
variable "pg_admin_password" {}

data "google_client_config" "default" {
  provider = google-beta
}

provider "kubernetes" {
  experiments {
    manifest_resource = true
  }

  host                   = var.cluster_endpoint
  token                  = data.google_client_config.default.access_token
  cluster_ca_certificate = var.cluster_ca_cert
}

provider "helm" {
  kubernetes {
    host                   = var.cluster_endpoint
    token                  = data.google_client_config.default.access_token
    cluster_ca_certificate = var.cluster_ca_cert
  }
}

module "services" {
  source = "../../../modules/services"

  gcp_project              = var.gcp_project
  name_prefix              = var.name_prefix
  letsencrypt_issuer_email = var.letsencrypt_issuer_email
  cluster_endpoint         = var.cluster_endpoint
  cluster_ca_cert          = var.cluster_ca_cert
  pg_host                  = var.pg_host
  pg_admin_username        = var.pg_admin_username
  pg_admin_password        = var.pg_admin_password
}
