// Default layout template
import React from 'react'
import Assets from '../config/assets.json'

const Html = function Html (props) {

  const title = props.title || 'Jumpline'
  return (

    <html>
      <head>

        <meta
          charSet='utf-8'
        ></meta>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        ></meta>
        <title>
          {title}
        </title>
        <link
          href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'
          rel='stylesheet'
        ></link>
        <link
          href='https://fonts.googleapis.com/css?family=Varela+Round'
          rel='stylesheet'
          type='text/css'
        >
        </link>
        <link
          href='/static/images/favicon.ico'
          rel='icon'
        >
        </link>

      </head>
      <body>

        <component id='App'>
        </component>
        <script
          type='application/javascript'
          src={Assets.vendor.js}
        ></script>
        <script
          type='application/javascript'
          src={Assets.bundle.js}
        ></script>
        <script
          type='application/javascript'
          src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js'
        ></script>

      </body>
    </html>

  )

}

Html.propTypes = {
  title: React.PropTypes.string,
}

export default Html
