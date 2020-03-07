import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import cors from "cors";
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken } from "./auth";
import { sendRefreshToken } from "./sendRefreshToken";
import { AccountResolver } from "./resolvers/AccountResolver";
import { typeOrmConnections } from "./utils/createDatabaseConnection";

(async () => {
	const app = express();

	app.use(cookieParser());
	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true
		})
	);
	app.post("/refresh_token", async (req, res) => {
		const token = req.cookies.jid;
		if (!token) {
			return res.send({ ok: false, accessToken: "" });
		}

		let payload: any = null;

		try {
			payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
		} catch (err) {
			console.log(err);
			return res.send({ ok: false, accessToken: "" });
		}

		// token is valid and can send back access token
		const user = await User.findOne({ id: payload.userId });

		if (!user) {
			return res.send({ ok: false, accessToken: "" });
		}

		if (user.tokenVersion !== payload.tokenVersion) {
			return res.send({ ok: true, accessToken: createAccessToken(user) });
		}

		sendRefreshToken(res, createRefreshToken(user));

		return res.send({ ok: true, accessToken: createAccessToken(user) });
	});

	// await createConnection();
	await createConnection(typeOrmConnections);

	const appolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver, AccountResolver]
		}),
		context: ({ req, res }) => ({ req, res })
	});

	appolloServer.applyMiddleware({ app, cors: false });

	app.listen(process.env.PORT || 4000, () => {
		console.log(`🚀 Server ready at ${process.env.PORT || 4000}/${appolloServer.graphqlPath}`);
	});
})();
