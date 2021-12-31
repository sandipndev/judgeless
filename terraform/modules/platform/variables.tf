# Outputs from Inception
variable "gcp_project" {}
variable "name_prefix" { default = "judgeless" }
variable "cluster_sa" {}

# Kubernetes
variable "region" { default = "us-east1" }
variable "network_prefix" { default = "10.1" }
variable "kube_version" { default = "1.21.5-gke.1302" }
variable "node_default_machine_type" { default = "n2-standard-4" }
variable "min_default_node_count" { default = 1 }
variable "max_default_node_count" { default = 2 }

# Postgres
variable "postgres_tier" { default = "db-f1-micro" }
variable "destroyable_postgres" { default = false }

locals {
  project     = var.gcp_project
  name_prefix = var.name_prefix

  cluster_sa                = var.cluster_sa
  cluster_name              = "${var.name_prefix}-cluster"
  cluster_location          = local.region
  master_ipv4_cidr_block    = "172.16.0.0/28"
  region                    = var.region
  network_prefix            = var.network_prefix
  kube_version              = var.kube_version
  node_default_machine_type = var.node_default_machine_type
  min_default_node_count    = var.min_default_node_count
  max_default_node_count    = var.max_default_node_count

  postgres_tier           = var.postgres_tier
  destroyable_postgres    = var.destroyable_postgres
  shared_pg_instance_name = "${local.name_prefix}-shared-pg"
}
