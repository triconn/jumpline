export function getServerConnection () {

  return {
    port: parseInt(process.env.PORT, 10) || 8000,
    host: '0.0.0.0',
    routes: {
      cors: true,
    },
  }

}
