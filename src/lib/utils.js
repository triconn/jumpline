const Package = require('../../package.json')
const Assets = require('../config/assets.json')

export function getJsBundle () {

  return Assets.bundle.js

}

export function getCssBundle () {

  return `${Package.version}.css`

}
