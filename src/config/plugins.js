import Good from 'good'
import GoodConsole from 'good-console'
import Inert from 'inert'
import Vision from 'vision'

const plugins = [
  {
    register: Inert,
  },
  {
    register: Vision,
  },
  {
    register: Good,
    options: {
      opsInterval: 5000,
      reporters: [
        {
          reporter: GoodConsole,
          events: { log: '*', request: '*', response: '*', error: '*' },
        },
      ],
    },
  },
]


// Register development plugins
if (process.env.NODE_ENV === 'development') {

  const HapiSwagger = require('hapi-swagger')

  plugins.push(
    {
      register: HapiSwagger,
      options: {
        documentationPath: '/docs',
      },
    }
  )

}

export default plugins
