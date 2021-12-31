variable "gcp_project" {}
variable "name_prefix" { default = "judgeless" }
variable "tf_state_bucket_location" { default = "us-east1" }
variable "tf_state_bucket_force_destroy" { default = false }
variable "enable_services" { default = true }

locals {
  name_prefix                   = var.name_prefix
  tf_state_bucket_location      = var.tf_state_bucket_location
  tf_state_bucket_force_destroy = var.tf_state_bucket_force_destroy
  project                       = var.gcp_project
}
