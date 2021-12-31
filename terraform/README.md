## Terraform Modules for Judgeless

This folder contains [terraform](https://terraform.io) definitions to spin up Robust Infrastructure on top of Google Cloud Platform, suitable for running this application grounds-up.

The infrastructure is organized into 4 modules, which should be executed in sequence. The Bootstrap phase can be executed against a GCP Project with `owner` access. The final state is a regional GKE Cluster, running on a private network with a Bastion Host deployed for access.

The lifecycle looks as follows:

1. [Bootstrap](./modules/bootstrap) - Enables required APIs and provisions the initial "inception" service account as well as the GCS bucket to store all terraform state required in all other phases. This step should be executed 1 time only and not automated.
2. [Inception](./modules/inception) - Provisions all security sensitive resources like the VPC network, Bastion, Roles, Service Accounts etc.
3. [Platform](./modules/platform) - Provisions the GKE cluster itself
4. [Services](./modules/services) - Deploys the [ingress-nginx](https://github.com/kubernetes/ingress-nginx) and [cert-manager](https://cert-manager.io/docs/) charts onto the K8s cluster - followed by [Judgeless](../charts) charts.

---

Inspiration for infrastructure taken from [GaloyMoney/galoy-infra](https://github.com/GaloyMoney/galoy-infra)
