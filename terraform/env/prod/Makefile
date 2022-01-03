TF:=terraform

bootstrap:
	cd bootstrap \
		&& $(TF) init \
		&& $(TF) apply

prep-inception:
	../../../scripts/prep-inception.sh '$(USERS)' '$(INCEPTION_EMAIL)'

inception:
	cd inception \
		&& $(TF) apply

prep-platform:
	../../../scripts/prep-platform.sh

platform:
	cd platform \
		&& $(TF) apply

services:
	../../../scripts/services.sh

initial-services:
	cd services \
		&& $(TF) init \
		&& $(TF) apply -target module.services.helm_release.cert_manager

judgeless-services:
	cd services \
		&& $(TF) apply

# For debugging
clean:
	find . | grep terra | grep -v "./bootstrap/terraform.tfvars" | xargs rm -rf
	find . | grep tfstate | grep -v "./bootstrap/terraform.tfvars" | xargs rm -rf
	find . | grep tfvars | grep -v "./bootstrap/terraform.tfvars" | xargs rm -rf
	rm id_rsa id_rsa.pub inception-sa-creds.json gcr-sa-creds.json

.PHONY: bootstrap prep-inception inception prep-platform platform prep-services initial-services services clean
