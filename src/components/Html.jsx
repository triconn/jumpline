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
          src={props.assets.bootstrap.js}
        ></script>
        <script
          type='application/javascript'
          src={props.assets.bundle.js}
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
