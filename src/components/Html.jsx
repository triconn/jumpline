// Default layout template
import React from 'react'

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
          href='/static/favicon.ico'
          rel='icon'
        >
        </link>

      </head>
      <body>

        <component id='App'>
        </component>

        <script
          type='application/javascript'
          dangerouslySetInnerHTML={{ __html: props.initialState }}
        ></script>
        <script
          type='application/javascript'
          src={props.assets.vendor.js}
        ></script>
        <script
          type='application/javascript'
          src={props.assets.bundle.js}
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
  assets: React.PropTypes.object,
  initialState: React.PropTypes.object,
}

export default Html
