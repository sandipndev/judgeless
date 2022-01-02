variable "name_prefix" {}
variable "cluster_endpoint" {}
variable "cluster_ca_cert" {}
variable "ingress_nginx_version" { default = "4.0.6" }
variable "cert_manager_version" { default = "v1.5.3" }
variable "letsencrypt_issuer_email" {}
variable "pg_host" {}
variable "pg_admin_username" {}
variable "pg_admin_password" {}

locals {
  name_prefix              = var.name_prefix
  cluster_endpoint         = var.cluster_endpoint
  cluster_ca_cert          = var.cluster_ca_cert
  ingress_namespace        = "${local.name_prefix}-ingress"
  ingress_nginx_version    = var.ingress_nginx_version
  cert_manager_version     = var.cert_manager_version
  letsencrypt_issuer_email = var.letsencrypt_issuer_email

  pg_host             = var.pg_host
  pg_admin_username   = var.pg_admin_username
  pg_admin_password   = var.pg_admin_password
  judgeless_pg_user   = "judgeless_user"
  judgeless_pg_dbname = "judgeless_db"
}
