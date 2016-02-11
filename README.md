![iQueue](https://raw.githubusercontent.com/wiki/triconn/iqueue/iQueue-logo.png)
[![Build Status](https://travis-ci.org/triconn/iqueue.svg?branch=master)](https://travis-ci.org/triconn/iqueue)
[![bitHound Score](https://www.bithound.io/github/triconn/iqueue/badges/score.svg)](https://www.bithound.io/github/triconn/iqueue)

An SMS paging API and web client

#### Quick Start

```
export TWILIO_ACCOUNT_SID=xxxxxxxx
export TWILIO_AUTH_TOKEN=xxxxxxxx
export TWILIO_NUMBER=5551234567

git clone https://github.com/triconn/iqueue.git
cd iqueue
npm install
npm run build
npm start
```

#### Development

```
# For most dev including client components and styling, just run:
npm run dev

# If you're editing server assets and need auto-reloading:
npm run watch
```

###### Debugging

For client-side component debugging, install [React DevTools](https://fb.me/react-devtools).

For client-side state debugging, install the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) ([source](https://github.com/zalmoxisus/redux-devtools-extension))

#### API Docs

iQueue uses swagger for automatic API documentation in development.  Start the app with `NODE_ENV=development`, and visit the `/docs` route.
