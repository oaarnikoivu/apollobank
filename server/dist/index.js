"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("./middleware");
const routes_1 = require("./api/routes");
require('dotenv').config();
const app = express_1.default();
const PORT = process.env.PORT;
app.use(morgan_1.default('common'));
app.use(helmet_1.default());
app.use(cors_1.default({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express_1.default.json());
app.use('/', routes_1.router);
app.use(middleware_1.notFound);
app.use(middleware_1.errorHandler);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
//# sourceMappingURL=index.js.map