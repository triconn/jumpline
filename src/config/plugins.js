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

export default plugins
