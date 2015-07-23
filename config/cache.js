var Package = require('../package.json');

module.exports = {

  bust: function() {
    return Package.version;
  }
};

