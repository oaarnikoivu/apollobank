import { getConnectionOptions, createConnection } from "typeorm";
import { Account } from "../entity/Account";
import { User } from "../entity/User";
import { Transaction } from "../entity/Transaction";
import { Card } from "../entity/Card";

export const createTypeOrmConnection = async () => {
	const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
	return process.env.NODE_ENV === "production"
		? createConnection({
				...connectionOptions,
				url: process.env.DATABASE_URL,
				entities: [User, Account, Transaction, Card],
				name: "default"
		  } as any)
		: createConnection({ ...connectionOptions, name: "default" });
};
