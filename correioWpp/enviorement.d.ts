declare global {
    namespace NodeJS {
      interface ProcessEnv {
        AMQP_SERVER: string;
        QUEUE_CORREIO: string;
        CALLMEBOT_URL: string;
      }
    }
  }
  export {}