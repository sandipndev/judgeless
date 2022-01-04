locals {
  firebase_admin_sa = "${local.name_prefix}-firebase-admin-sa"
}

resource "google_service_account" "fb_admin" {
  project      = local.gcp_project
  account_id   = local.firebase_admin_sa
  display_name = local.firebase_admin_sa
  description  = "Firebase Admin Account of ${local.name_prefix}"
}

resource "google_project_iam_member" "fb_admin" {
  project = local.gcp_project
  role    = "roles/firebase.admin"
  member  = "serviceAccount:${google_service_account.fb_admin.email}"
}

resource "google_service_account_key" "fb_admin_key" {
  service_account_id = google_service_account.fb_admin.name
  public_key_type    = "TYPE_X509_PEM_FILE"

  depends_on = [
    google_project_iam_member.fb_admin
  ]
}

locals {
  fb_admin_sa_json_ns = nonsensitive(base64decode(google_service_account_key.fb_admin_key.private_key))
  fb_admin_sa_pkey_s  = sensitive(jsondecode(local.fb_admin_sa_json_ns)["private_key"])
}

resource "kubernetes_secret" "fb_admin_creds" {
  metadata {
    name = "firebase-admin-config"
  }

  data = {
    sa-email       = google_service_account.fb_admin.email
    sa-private-key = local.fb_admin_sa_pkey_s
  }
}

resource "google_firebase_web_app" "judgeless" {
  provider     = google-beta
  project      = local.gcp_project
  display_name = "Judgeless Web App"
}

data "google_firebase_web_app_config" "judgeless" {
  provider   = google-beta
  project    = local.gcp_project
  web_app_id = google_firebase_web_app.judgeless.app_id
}

resource "kubernetes_secret" "firebase_creds" {
  metadata {
    name = "firebase-web-app-config"
  }

  data = {
    api-key      = data.google_firebase_web_app_config.judgeless.api_key
    auth-domain  = data.google_firebase_web_app_config.judgeless.auth_domain
    database-url = data.google_firebase_web_app_config.judgeless.database_url
    project-id   = local.gcp_project
  }
}

