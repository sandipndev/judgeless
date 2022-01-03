resource "helm_release" "judgeless" {
  name       = "judgeless"
  chart      = "${path.module}/../../../charts"
  repository = "https://sandipndev.github.io/judgeless/charts/"

  values = [
    templatefile("${path.module}/judgeless-values.yml.tmpl", {
      PROJECT_ID: local.gcp_project
      SERVICE_NAME: local.name_prefix
    })
  ]

  depends_on = [
    kubernetes_secret.postgres_creds
  ]

  dependency_update = true
}
