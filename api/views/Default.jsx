// Default layout template
var React = require('react');
var Cache = require('../../config/cache.js');

var Default = React.createClass({

  render: function() {

    var title = 'iQueue';
    var jsBundle = 'js/bundle-' + Cache.bust() + '.js';

    return(
      <html>
      <head>

        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <title>{title}</title>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet"></link>
        <link href='https://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'></link>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"></link>

      </head>
      <body style={{fontFamily: ['Varela Round', 'sans-serif']}}>
        <div id="main"></div>
        <script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
        <script src={jsBundle}></script>
      </body>
      </html>
    );
  }
});

module.exports = Default;

