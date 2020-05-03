"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./resolvers/UserResolver");
const AccountResolver_1 = require("./resolvers/AccountResolver");
const TransactionResolver_1 = require("./resolvers/TransactionResolver");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = require("jsonwebtoken");
const cors_1 = __importDefault(require("cors"));
const User_1 = require("./entity/User");
const auth_1 = require("./utils/auth");
const sendRefreshToken_1 = require("./utils/sendRefreshToken");
const createTypeOrmConnection_1 = require("./utils/createTypeOrmConnection");
const typeorm_1 = require("typeorm");
const CardResolver_1 = require("./resolvers/CardResolver");
require("dotenv/config");
require("reflect-metadata");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(cookie_parser_1.default());
    app.use(cors_1.default({
        origin: process.env.NODE_ENV === "production"
            ? "https://vigilant-goldwasser-9ac664.netlify.app"
            : "http://localhost:3000",
        credentials: true,
    }));
    app.get("/", (_req, res) => {
        res.send("🚀 Server is running");
    });
    app.post("/refresh_token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.cookies.jid;
        if (!token) {
            return res.send({ ok: false, accessToken: "" });
        }
        let payload = null;
        try {
            payload = jsonwebtoken_1.verify(token, process.env.REFRESH_TOKEN_SECRET);
        }
        catch (err) {
            console.log(err);
            return res.send({ ok: false, accessToken: "" });
        }
        const user = yield User_1.User.findOne({ id: payload.userId });
        if (!user) {
            return res.send({ ok: false, accessToken: "" });
        }
        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: true, accessToken: auth_1.createAccessToken(user) });
        }
        sendRefreshToken_1.sendRefreshToken(res, auth_1.createRefreshToken(user));
        return res.send({ ok: true, accessToken: auth_1.createAccessToken(user) });
    }));
    process.env.NODE_ENV === "production"
        ? yield createTypeOrmConnection_1.createTypeOrmConnection()
        : yield typeorm_1.createConnection();
    const appolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [UserResolver_1.UserResolver, AccountResolver_1.AccountResolver, TransactionResolver_1.TransactionResolver, CardResolver_1.CardResolver],
        }),
        introspection: true,
        playground: true,
        context: ({ req, res }) => ({ req, res }),
    });
    appolloServer.applyMiddleware({ app, cors: false });
    app.listen(process.env.PORT || 4000, () => {
        console.log(`🚀 Server ready at ${process.env.PORT || 4000}${appolloServer.graphqlPath}`);
    });
}))();
//# sourceMappingURL=index.js.map