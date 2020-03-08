import { Resolver, Query } from "type-graphql";

@Resolver()
export class TransactionResolver {
	@Query(() => String)
	transactions() {
		return "hi!";
	}
}
