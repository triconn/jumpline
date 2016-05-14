const Package = require('../../package.json')

export function getJsBundle () {

  return `bundle-${Package.version}.js`

}

export function getCssBundle () {

  return `${Package.version}.css`

}
