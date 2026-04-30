REMOTE_USER ?= lertumpai
REMOTE_HOST ?= 192.168.1.99
REMOTE_DIR ?= /home/lertumpai/applications/nsl-qa-learning
REMOTE_PASSWORD ?= S@rawit5171718

DOCKER_COMPOSE_FILE ?= app.docker-compose.yml
DOCKER_COMPOSE_TEMPLATE ?= template.docker-compose.yml
DOCKER_IMAGE_NAME ?= nsl-qa-learning-app
APP_TAR := app.tar

VERSION := $(shell node -p "require('./package.json').version")

deploy:
	make build-image
	make deploy-tar
	make update-compose
	make clean-images
	make clean-remote-images
	make remove-tar
	make remove-compose

build-image:
	@echo "[PROCESS] Build docker image with version $(VERSION)"
	docker build -t $(DOCKER_IMAGE_NAME):$(VERSION) .
	@echo "[PROCESS] Saving docker image to tar file..."
	docker save -o $(APP_TAR) $(DOCKER_IMAGE_NAME):$(VERSION)

deploy-tar:
	@echo "[PROCESS] Copying new tar file..."
	sshpass -p $(REMOTE_PASSWORD) scp -o StrictHostKeyChecking=no $(APP_TAR) $(REMOTE_USER)@$(REMOTE_HOST):$(REMOTE_DIR)
	@echo "[PROCESS] Loading Docker image from tar..."
	sshpass -p $(REMOTE_PASSWORD) ssh -o StrictHostKeyChecking=no $(REMOTE_USER)@$(REMOTE_HOST) "cd $(REMOTE_DIR) && docker load -i $(APP_TAR)"
	@echo "[PROCESS] Restarting Docker services..."
	
update-compose:
	@echo "[PROCESS] Creating docker compose file from template with version $(VERSION)"
	cp $(DOCKER_COMPOSE_TEMPLATE) $(DOCKER_COMPOSE_FILE)
	sed -i "s/DOCKER_IMAGE_NAME/$(DOCKER_IMAGE_NAME)/g" $(DOCKER_COMPOSE_FILE)
	sed -i "s/DOCKER_VERSION/$(VERSION)/g" $(DOCKER_COMPOSE_FILE)
	@echo "[PROCESS] Updating docker compose file..."
	sshpass -p $(REMOTE_PASSWORD) scp $(DOCKER_COMPOSE_FILE) $(REMOTE_USER)@$(REMOTE_HOST):$(REMOTE_DIR) 
	@echo "[PROCESS] Restarting Docker services..."
	sshpass -p $(REMOTE_PASSWORD) ssh $(REMOTE_USER)@$(REMOTE_HOST) "cd $(REMOTE_DIR) && docker compose -f $(DOCKER_COMPOSE_FILE) down && docker compose -f $(DOCKER_COMPOSE_FILE) up -d"
	@echo "[PROCESS] Deployment completed successfully!"

clean-images:
	@echo "[PROCESS] Cleaning unused Docker images..."
	docker image prune -a -f
	@echo "[PROCESS] Docker image cleanup completed!"

clean-remote-images:
	@echo "[PROCESS] Cleaning unused Docker images on remote server..."
	sshpass -p $(REMOTE_PASSWORD) ssh $(REMOTE_USER)@$(REMOTE_HOST) "docker image prune -a -f"
	@echo "[PROCESS] Remote Docker image cleanup completed!"

remove-tar:
	@echo "[PROCESS] Removing tar file..."
	rm -f $(APP_TAR)
	@echo "[PROCESS] Tar file removed!"

remove-compose:
	@echo "[PROCESS] Removing generated compose file..."
	rm -f $(DOCKER_COMPOSE_FILE)
	@echo "[PROCESS] Generated compose file removed!"

gen:
	npm run generate:api