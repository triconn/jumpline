// Default layout template
const React = require('react');
const jsBundle = require('../../src/lib/utils.js').getJsBundle();

export default class Index extends React.Component {

  render() {

    const title = 'iQueue';
    const jsBundlePath = `/static/js/${jsBundle}`;
    return (

      <html>
      <head>

        <meta
          charSet="utf-8"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
        <title>
          {title}
        </title>
        <link
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
          rel="stylesheet"
        ></link>
        <link
          href='https://fonts.googleapis.com/css?family=Varela+Round'
          rel='stylesheet'
          type='text/css'>
        </link>
        <link
          href="/static/images/favicon.ico"
          rel="icon">
        </link>

      </head>
      <body>

        <component id="App">
        </component>
        <script
          src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"
        ></script>
        <script
          src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
        ></script>
        <script
          src={jsBundlePath}
        ></script>

      </body>
      </html>

    );
  }
}

