"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountController = __importStar(require("../controllers/account"));
const cardsController = __importStar(require("../controllers/cards"));
const paymentsController = __importStar(require("../controllers/payments"));
const dashboardController = __importStar(require("../controllers/dashboard"));
const apiRouter = express_1.Router();
apiRouter.get('/accounts', accountController.getAccounts);
apiRouter.get('/cards', cardsController.getCards);
apiRouter.get('/payments', paymentsController.getPayments);
apiRouter.get('/dashboard', dashboardController.getDashboard);
exports.default = apiRouter;
//# sourceMappingURL=routes.js.map