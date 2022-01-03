resource "random_password" "cookie_secret_prev" {
  length  = 20
  special = false
}

resource "random_password" "cookie_secret_curr" {
  length  = 20
  special = false
}

resource "kubernetes_secret" "cookies" {
  metadata {
    name = "cookie-secret"
  }

  data = {
    previous = random_password.cookie_secret_prev.result
    current  = random_password.cookie_secret_curr.result
  }
}

resource "helm_release" "judgeless" {
  name       = "judgeless"
  chart      = "${path.module}/../../../charts"
  repository = "https://sandipndev.github.io/judgeless/charts/"

  values = [
    templatefile("${path.module}/judgeless-values.yml.tmpl", {
      PROJECT_ID : local.gcp_project
      SERVICE_NAME : local.name_prefix
      TRIGGER_TIME : timestamp()
    })
  ]

  depends_on = [
    kubernetes_secret.postgres_creds,
    kubernetes_secret.cookies,
    kubernetes_secret.fb_admin_creds,
    kubernetes_secret.firebase_creds,
  ]

  dependency_update = true
}
