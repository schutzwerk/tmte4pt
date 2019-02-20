SHELL := /bin/bash
VERSION ?= latest

# The directory of this file
DIR := $(shell echo $(shell cd "$(shell  dirname "${BASH_SOURCE[0]}" )" && pwd ))

IMAGE_NAME ?= schutzwerk/tmte4pt
CONTAINER_NAME ?= tmte4pt

# Build the container
build: ## Build the image
	sudo docker build --rm -t $(IMAGE_NAME):$(VERSION) .

build-local: ## Build the image using a local version of CANalyzat0r
	sudo docker build -t $(IMAGE_NAME) -f Dockerfile.local .

build-nc: ## Build the container without caching
	sudo docker build --rm --no-cache -t $(IMAGE_NAME) .

run: ## Run container
	sudo docker run \
		-it \
		--name $(CONTAINER_NAME) \
		-p 127.0.0.1:8080:8080 \
		$(IMAGE_NAME):$(VERSION)

stop: ## Stop a running container
	sudo docker stop $(CONTAINER_NAME)

remove: ## Remove a (running) container
	sudo docker rm -f $(CONTAINER_NAME)

restart: ## Restart the container
	make remove; \
	make run

remove-image-force: ## Remove the latest image (forced)
	sudo docker rmi -f $(IMAGE_NAME):$(VERSION)

# This will output the help for each task
.PHONY: help

help: ## This help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help
