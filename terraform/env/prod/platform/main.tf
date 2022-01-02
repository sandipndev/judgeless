variable "name_prefix" {}
variable "gcp_project" {}
variable "cluster_sa" {}
variable "node_default_machine_type" { default = "e2-medium" }
variable "destroyable_postgres" { default = false }

module "platform" {
  source = "../../../modules/platform/"

  name_prefix               = var.name_prefix
  gcp_project               = var.gcp_project
  cluster_sa                = var.cluster_sa
  node_default_machine_type = var.node_default_machine_type
  destroyable_postgres      = var.destroyable_postgres
}

output "cluster_endpoint" {
  value = module.platform.master_endpoint
}
output "cluster_ca_cert" {
  value = module.platform.cluster_ca_cert
}
output "pg_host" {
  value = module.platform.pg_host
}
output "pg_admin_username" {
  value = module.platform.pg_admin_username
}
output "pg_admin_password" {
  value     = module.platform.pg_admin_password
  sensitive = true
}
