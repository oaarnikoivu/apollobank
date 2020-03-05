import { MiddlewareFn } from "type-graphql";
import { MyContext } from "./MyContext";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
	const authorization = context.req.headers["authorization"];
	return next();
};
