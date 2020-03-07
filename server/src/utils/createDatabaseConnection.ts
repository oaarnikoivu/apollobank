import * as PostgressConnectionStringParser from "pg-connection-string";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const databaseUrl: string | undefined = process.env.DATABASE_URL;

const connectionOptions: PostgressConnectionStringParser.ConnectionOptions = PostgressConnectionStringParser.parse(
	databaseUrl as string
);

export const typeOrmConnections: PostgresConnectionOptions = {
	type: "postgres",
	host: connectionOptions.host as string,
	port: connectionOptions.port as any,
	username: connectionOptions.user,
	password: connectionOptions.password,
	database: connectionOptions.database as string,
	synchronize: true,
	entities: ["target/entity/**/*.js"],
	extra: {
		ssl: true
	}
};
