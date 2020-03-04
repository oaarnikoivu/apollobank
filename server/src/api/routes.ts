import { Router } from 'express';
import cors from 'cors';

import * as accountController from '../controllers/account';
import * as cardsController from '../controllers/cards';
import * as paymentsController from '../controllers/payments';
import * as dashboardController from '../controllers/dashboard';

const apiRouter: Router = Router();

apiRouter.use(cors());

apiRouter.get('/accounts', accountController.getAccounts);
apiRouter.post('/accounts', accountController.postAccounts);
apiRouter.get('/cards', cardsController.getCards);
apiRouter.get('/payments', paymentsController.getPayments);
apiRouter.get('/dashboard', dashboardController.getDashboard);

export default apiRouter;
