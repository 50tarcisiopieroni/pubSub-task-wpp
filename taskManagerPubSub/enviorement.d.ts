declare global {
    namespace NodeJS {
      interface ProcessEnv {
        AMQP_SERVER: string;
        QUEUE_MENSAGEM: string;
        QUEUE_CORREIO: string;
        MONGODB_CONNECTION_URL: string;
        PORT: string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}