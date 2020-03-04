"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("./middleware");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
require("./lib/env");
const routes_1 = __importDefault(require("./api/routes"));
const homeController = __importStar(require("./controllers/home"));
const userController = __importStar(require("./controllers/user"));
const app = express_1.default();
mongoose_1.default
    .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));
app.use(morgan_1.default('common'));
app.use(helmet_1.default());
app.use(cors_1.default({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express_1.default.json());
app.use(middleware_1.checkTokenSetUser);
app.get('/', homeController.index);
app.use('/api', middleware_1.isLoggedIn, routes_1.default);
app.post('/auth/signup', userController.postSignup);
app.post('/auth/login', userController.postLogin);
exports.default = app;
//# sourceMappingURL=app.js.map