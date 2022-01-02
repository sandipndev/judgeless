resource "helm_release" "judgeless" {
  name       = "judgeless"
  chart      = "${path.module}/../../../charts"
  repository = "https://sandipndev.github.io/judgeless/charts/"

  depends_on = [
    kubernetes_secret.postgres_creds
  ]

  dependency_update = true
}
