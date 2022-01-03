#!/bin/bash

set -eu

pushd bootstrap

gcp_project=$(terraform output gcp_project | jq -r)
tf_state_bucket_name=$(terraform output tf_state_bucket_name | jq -r)
name_prefix=$(terraform output name_prefix | jq -r)

popd

pushd inception

cluster_sa=$(terraform output cluster_sa | jq -r)
bastion_ip="$(terraform output bastion_ip | jq -r)"

popd

pushd platform

cluster_endpoint=$(terraform output cluster_endpoint | jq -r)
cluster_ca_cert="$(terraform output -json cluster_ca_cert | jq -r)"
pg_host="$(terraform output pg_host | jq -r)"
pg_admin_username="$(terraform output pg_admin_username | jq -r)"
pg_admin_password="$(terraform output pg_admin_password | jq -r)"

popd

pushd services

cat <<EOF > terraform.tf
terraform {
  backend "gcs" {
    bucket = "${tf_state_bucket_name}"
    prefix = "${name_prefix}/services"
  }
}
EOF

cat <<EOF > terraform.tfvars
name_prefix = "${name_prefix}"
cluster_endpoint = "${cluster_endpoint}"
cluster_ca_cert = <<-EOT
${cluster_ca_cert}
EOT
pg_host = "${pg_host}"
pg_admin_username = "${pg_admin_username}"
pg_admin_password = "${pg_admin_password}"
EOF

popd

REPO_ROOT=$(git rev-parse --show-toplevel)
REPO_ROOT_DIR="${REPO_ROOT##*/}"

if ! [[ -f id_rsa ]]; then
  ssh-keygen -b 4096 -t rsa -f $(pwd)/id_rsa -q -N ""
fi

if ! [[ -f inception-sa-creds.json ]]; then
cat <<EOF >inception-sa-creds.json
${GOOGLE_CREDENTIALS}
EOF
fi

gcloud auth activate-service-account --key-file=$(pwd)/inception-sa-creds.json
gcloud compute os-login ssh-keys add --key-file=$(pwd)/id_rsa.pub --project=${gcp_project}
gcloud auth revoke

BASTION_USER=${BASTION_USER:-"sa_$(jq ".client_id" inception-sa-creds.json -r)"}
ADDITIONAL_SSH_OPTS=${ADDITIONAL_SSH_OPTS:-"-i $(pwd)/id_rsa -o StrictHostKeyChecking=no"}

echo "Syncing to bastion"
rsync --exclude '**/.terraform/**' --exclude '**.terrafor*' -avr -e "ssh -l ${BASTION_USER} ${ADDITIONAL_SSH_OPTS}" \
  ${REPO_ROOT}/terraform ${REPO_ROOT}/charts ${bastion_ip}:${REPO_ROOT_DIR}

set +e
for i in {1..60}; do
  echo "Attempt ${i} to find make on bastion"
  ssh ${ADDITIONAL_SSH_OPTS} ${BASTION_USER}@${bastion_ip} "which make" && break
  sleep 2
done
set -e

ssh ${ADDITIONAL_SSH_OPTS} ${BASTION_USER}@${bastion_ip} \
  "cd judgeless/terraform/env/prod; \
  export GOOGLE_CREDENTIALS=\$(cat inception-sa-creds.json); \
  echo yes | make initial-services; \
  echo yes | make judgeless-services"
