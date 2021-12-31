# Outputs from Bootstrap
variable "gcp_project" {}
variable "name_prefix" { default = "judgeless" }
variable "inception_sa" {}
variable "tf_state_bucket_name" {}
variable "tf_state_bucket_location" {}

# Bastion
variable "region" { default = "us-east1" }
variable "primary_zone" { default = "b" }
variable "bastion_machine_type" { default = "e2-micro" }
variable "bastion_image" { default = "ubuntu-os-cloud/ubuntu-2110" }
variable "network_prefix" { default = "10.0" }

# ACL
variable "users" {
  type = list(object({
    id        = string
    inception = bool
    platform  = bool
    logs      = bool
  }))
}

locals {
  project                  = var.gcp_project
  name_prefix              = var.name_prefix
  inception_sa             = var.inception_sa
  tf_state_bucket_name     = var.tf_state_bucket_name
  tf_state_bucket_location = var.tf_state_bucket_location

  region               = var.region
  network_prefix       = var.network_prefix
  bastion_zone         = "${local.region}-${var.primary_zone}"
  bastion_machine_type = var.bastion_machine_type
  bastion_image        = var.bastion_image

  log_viewers      = [for user in var.users : user.id if user.logs]
  inception_admins = [for user in var.users : user.id if user.inception]
  platform_admins = concat(
    [for user in var.users : user.id if user.platform],
    ["serviceAccount:${var.inception_sa}"]
  )
}
