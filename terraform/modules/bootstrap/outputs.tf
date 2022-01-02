output "gcp_project" {
  value = local.project
}
output "name_prefix" {
  value = local.name_prefix
}
output "inception_sa" {
  value = google_service_account.inception.email
}
output "tf_state_bucket_name" {
  value = google_storage_bucket.tf_state.name
}
output "tf_state_bucket_location" {
  value = google_storage_bucket.tf_state.location
}
