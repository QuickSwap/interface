#!/bin/sh
echo "initiating..."

# these fields will be set in package.json file and will depend on cloud provider
PACKAGE_VERSION=$(node -p "require('./package.json').version")
SUBSCRIPTION_ID=$(node -p "require('./package.json').dockerRegistry.subscription")
REGISTRY=$(node -p "require('./package.json').dockerRegistry.registry")
REPO=$(node -p "require('./package.json').dockerRegistry.repo")

# if staging, demo or any other repo is passed as argument.
if [ $1 ]; then
  REPO=$1
fi

DOCKER_REGISTRY="$REGISTRY/$REPO"
echo "PACKAGE_VERSION = $PACKAGE_VERSION"
echo "DOCKER_REGISTRY = $DOCKER_REGISTRY"

## run azure container registry task to build and upload
# az acr build --image "$REPO:${PACKAGE_VERSION}" \
#   --registry $REGISTRY \
#   --subscription $SUBSCRIPTION_ID \
#   --file Dockerfile .
