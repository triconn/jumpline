
module.exports = {

  getServer: function () {

    return {
      port: parseInt(process.env.PORT) || 8000,
      host: '0.0.0.0'
    };
  },

  getDb: function() {

    return {
      connection: 'disk',
      migrate: 'drop'
    };
  }

};

