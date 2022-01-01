TF:=terraform

bootstrap:
	cd bootstrap \
		&& $(TF) init \
		&& $(TF) apply

prep-inception:
	../../../scripts/prep-inception.sh '$(USERS)'

inception:
	cd inception \
		&& $(TF) apply

prep-platform:
	../../../scripts/prep-platform.sh

platform:
	cd platform \
		&& $(TF) apply

# For debugging
clean:
	find . | grep terra | grep -v "./bootstrap/terraform.tfvars" | xargs rm -rf
	find . | grep tfstate | grep -v "./bootstrap/terraform.tfvars" | xargs rm -rf
	find . | grep tfvars | grep -v "./bootstrap/terraform.tfvars" | xargs rm -rf
	rm inception-sa-creds.json

recreate-project:
	echo Y | gcloud projects delete judgeless-testing-$(NOW)
	gcloud projects create judgeless-testing-$(NEXT)
	gcloud alpha billing projects link judgeless-testing-$(NEXT) --billing-account=$(BILLING_ACCOUNT)
	
	sed -i 's/judgeless-testing-$(NOW)/judgeless-testing-$(NEXT)/g' ./bootstrap/terraform.tfvars
	sed -i 's/judgeless-test-$(NOW)/judgeless-test-$(NEXT)/g' ./bootstrap/terraform.tfvars

	make clean

.PHONY: bootstrap prep-inception inception prep-platform platform clean recreate-project
