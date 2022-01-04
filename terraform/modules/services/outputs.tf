output "web_app_api_key" {
  value = data.google_firebase_web_app_config.judgeless.api_key
}
output "web_app_auth_domain" {
  value = data.google_firebase_web_app_config.judgeless.auth_domain
}
output "web_app_database_url" {
  value = data.google_firebase_web_app_config.judgeless.database_url
}
