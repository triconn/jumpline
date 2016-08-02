![Jumpline](https://raw.githubusercontent.com/wiki/triconn/jumpline/iQueue-logo.png)
[![Build Status](https://travis-ci.org/triconn/jumpline.svg?branch=master)](https://travis-ci.org/triconn/jumpline)
[![bitHound Score](https://www.bithound.io/github/triconn/jumpline/badges/score.svg)](https://www.bithound.io/github/triconn/jumpline)

An SMS paging API and web client

#### Quick Start

```bash
git clone https://github.com/triconn/jumpline.git
cd jumpline

# Add env vars
echo 'JUMPLINE_API_URL=https://api.example.com/graphql
GOOGLE_CLIENT_ID=xxx-xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxxx
GOOGLE_REDIRECT_URL=http://localhost:3000/login
GCLOUD_AUTH_EMAIL=myemail@example.com
GCLOUD_PROJECT_ID=my-project-id
DOCKER_MACHINE_NAME=my-docker-machine
SLACK_WEBHOOK=https://hooks.slack.com/services/xxx/xxx/xxxx' > .env
. .env
# Also add .env-staging and .env-prod if building those environments

# Install, build, and run
npm install
npm run build
npm start
```

#### Development

```bash
# For most dev, just run:
npm run dev

# For testing and auto-reloading:
npm run watch-test
```

###### Debugging

For client-side component debugging, install [React DevTools](https://fb.me/react-devtools).

For client-side state debugging, install the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) ([source](https://github.com/zalmoxisus/redux-devtools-extension))

#### Deployment

Ensure the Docker staging environment is currently selected

```
docker-machine ls
```

Build staging

```
npm run build-staging
```

Deploy to service A

```
npm run up-a
```

Deploy to service B

```
npm run up-b
```

##### Deploy via Registry Image

```bash
# Verify gcloud config
gcloud config list
gcloud config set auth set ${GCLOUD_AUTH_EMAIL}
gcloud config set project ${GOOGLE_PROJECT_ID}

# Build and deploy to registry
nr compose-staging -- build jumpline
docker tag docker_jumpline:latest us.gcr.io/${GOOGLE_PROJECT_ID}/jumpline
gcloud docker push us.gcr.io/${GOOGLE_PROJECT_ID}/jumpline

# Login (temp access) and pull to env
docker-machine ls
eval $(docker-machine env jl-staging)
docker login -e none -u oauth2accesstoken -p "$(gcloud auth print-access-token)" https://us.gcr.io
```

#### API Docs

Jumpline uses swagger for automatic API documentation in development.  Start the app with `NODE_ENV=development`, and visit the `/docs` route.
