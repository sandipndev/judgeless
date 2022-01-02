resource "google_firebase_web_app" "judgeless" {
  provider     = google-beta
  project      = local.project
  display_name = "Judgeless Web App"
}
