![iQueue](https://raw.githubusercontent.com/wiki/triconn/iqueue/iQueue-logo.png)
[![Build Status](https://travis-ci.org/triconn/iqueue.svg)](https://travis-ci.org/triconn/iqueue)
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
# Run the commands above up to and including `npm install`
npm run dev
```

#### API Docs

iQueue uses swagger for automatic API documentation.  Start the app, and visit the `/documentation` route.

