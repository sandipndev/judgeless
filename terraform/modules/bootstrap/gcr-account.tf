locals {
  gcr_sa_name = "${local.name_prefix}-gcr-push-tf"
}

resource "google_service_account" "gcr_push" {
  project      = local.project
  account_id   = local.gcr_sa_name
  display_name = local.gcr_sa_name
  description  = "Account for pushing Container Images for ${local.name_prefix}"
}

resource "google_project_iam_member" "gcr_push" {
  project = local.project
  role    = "roles/storage.admin"
  member  = "serviceAccount:${google_service_account.gcr_push.email}"
}
