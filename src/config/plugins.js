import Good from 'good'
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
      ops: {
        interval: 5000,
      },
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', request: '*', response: '*', error: '*' }],
        }, {
          module: 'good-console',
        }, 'stdout'],
      },
    },
  },
]

export default plugins
