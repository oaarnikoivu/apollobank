import { checkTokenSetUser, isLoggedIn } from './middleware';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import './lib/env';

import apiRouter from './api/routes';
import * as homeController from './controllers/home';
import * as userController from './controllers/user';

const app: Express = express();

mongoose
  .connect(process.env.DATABASE_URL as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to DB'))
  .catch((err: Error) => console.log(err));

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);
app.use(express.json());
app.use(checkTokenSetUser);

app.get('/', homeController.index);

// authenticated api routes
app.use('/api', isLoggedIn, apiRouter);

// signup and login routes
app.post('/auth/signup', userController.postSignup);
app.post('/auth/login', userController.postLogin);

export default app;
