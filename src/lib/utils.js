import Dotenv from 'dotenv'

export function loadDotEnv (environment = process.env.NODE_ENV) {

  switch (environment) {

    case 'development':
      return Dotenv.config({ path: '.env' })

    case 'staging':
      return Dotenv.config({ path: '.env-staging' })

    case 'production':
      return Dotenv.config({ path: '.env-prod' })

    default:
      return Dotenv.config({ path: '.env' })
  }

}
