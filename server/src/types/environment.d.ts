import * as ts from 'typescript';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      CORS_ORIGIN: string;
      DATABASE_URL?: string;
    }
  }
}
