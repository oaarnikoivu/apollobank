import { Router } from 'express';

import * as accountController from '../controllers/account';
import * as cardsController from '../controllers/cards';
import * as paymentsController from '../controllers/payments';
import * as dashboardController from '../controllers/dashboard';

const apiRouter: Router = Router();

apiRouter.get('/accounts', accountController.getAccounts);
apiRouter.get('/cards', cardsController.getCards);
apiRouter.get('/payments', paymentsController.getPayments);
apiRouter.get('/dashboard', dashboardController.getDashboard);

export default apiRouter;
