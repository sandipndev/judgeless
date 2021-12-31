variable "gcp_project" {}
variable "name_prefix" {}
variable "inception_sa" {}
variable "tf_state_bucket_name" {}
variable "tf_state_bucket_location" {}
variable "users" {
  type = list(object({
    id        = string
    inception = bool
    platform  = bool
    logs      = bool
  }))
}

module "inception" {
  source = "../../../modules/inception/gcp"

  gcp_project              = var.gcp_project
  name_prefix              = var.name_prefix
  inception_sa             = var.inception_sa
  tf_state_bucket_name     = var.tf_state_bucket_name
  tf_state_bucket_location = var.tf_state_bucket_location

  users = var.users
}

output "bastion_ip" {
  value = module.inception.bastion_ip
}
output "bastion_name" {
  value = module.inception.bastion_name
}
output "bastion_zone" {
  value = module.inception.bastion_zone
}
output "cluster_sa" {
  value = module.inception.cluster_sa
}
