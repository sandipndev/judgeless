#!/bin/bash

set -eu

pushd bootstrap
tf_state_bucket_name=$(terraform output tf_state_bucket_name | jq -r)
name_prefix=$(terraform output name_prefix | jq -r)
terraform output > ../platform/terraform.tfvars
popd

pushd inception
terraform output >> ../platform/terraform.tfvars
popd

pushd platform

cat <<EOF > terraform.tf
terraform {
  backend "gcs" {
    bucket = "${tf_state_bucket_name}"
    prefix = "${name_prefix}/platform"
  }
}
EOF

terraform init
popd
