// Start webpack based on environment
var Webpack = require('webpack');
var compiler = Webpack(require('./webpack.config.js'));
var dateFormat = require('dateformat');
var format = "dd mmm HH:MM:ss";

var reportSeconds = function(stats) {

  var seconds = (stats.endTime - stats.startTime) / 1000;
  var now = dateFormat(new Date(), format);
  console.log(now + ' - Webpack bundle completed in ' + seconds + 's');
};

module.exports = function() {

  if(process.env.NODE_ENV === 'production') {

    compiler.run(function(err, stats) {

      if(err) return console.error(err);
      reportSeconds(stats);
    });

  } else {

    compiler.watch({}, function(err, stats) {

      if(err) return console.error(err);
      reportSeconds(stats);
    });
  }
};

