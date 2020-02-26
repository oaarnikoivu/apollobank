import express, { Express } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import './lib/env';

import * as homeController from './controllers/home';
import * as accountController from './controllers/account';
import * as cardsController from './controllers/cards';
import * as paymentsController from './controllers/payments';
import * as dashboardController from './controllers/dashboard';
import * as userController from './controllers/user';

const app: Express = express();

mongoose
  .connect(process.env.DATABASE_URL as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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

app.get('/', homeController.index);
app.get('/accounts', accountController.getAccounts);
app.get('/cards', cardsController.getCards);
app.get('/payments', paymentsController.getPayments);
app.get('/dashboard', dashboardController.getDashboard);
app.post('/auth/signup', userController.postSignup);

export default app;
