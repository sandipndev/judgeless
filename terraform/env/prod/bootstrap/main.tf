variable "gcp_project" {}
variable "tf_state_bucket_force_destroy" { default = false }

module "bootstrap" {
  source = "../../../modules/bootstrap"

  gcp_project                   = var.gcp_project
  tf_state_bucket_force_destroy = var.tf_state_bucket_force_destroy
}

output "gcp_project" {
  value = module.bootstrap.gcp_project
}
output "name_prefix" {
  value = module.bootstrap.name_prefix
}
output "inception_sa" {
  value = module.bootstrap.inception_sa
}
output "tf_state_bucket_name" {
  value = module.bootstrap.tf_state_bucket_name
}
output "tf_state_bucket_location" {
  value = module.bootstrap.tf_state_bucket_location
}
