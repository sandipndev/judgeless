output "cluster_ca_cert" {
  value = base64decode(google_container_cluster.primary.master_auth.0.cluster_ca_certificate)
}

output "master_endpoint" {
  value = "https://${google_container_cluster.primary.private_cluster_config.0.private_endpoint}"
}

output "cluster_name" {
  value = google_container_cluster.primary.name
}

output "cluster_location" {
  value = google_container_cluster.primary.location
}

output "pg_host" {
  value = google_sql_database_instance.instance.private_ip_address
}

output "pg_admin_username" {
  value = google_sql_user.admin.name
}

output "pg_admin_password" {
  value     = random_password.admin.result
  sensitive = true
}
