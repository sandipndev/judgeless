db:
	docker compose up db -d
	yarn migrate

services:
	make db

stop:
	docker compose down

destroy:
	docker compose down -v
	docker compose rm -f

.PHONY: db stop destroy
