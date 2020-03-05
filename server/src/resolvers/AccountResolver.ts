import { isAuth } from "./../isAuth";
import { Query, Resolver, Mutation, Ctx, UseMiddleware, Arg } from "type-graphql";
import { MyContext } from "../MyContext";
import { User } from "../entity/User";
import { Account } from "../entity/Account";

@Resolver()
export class AccountResolver {
	@Query(() => [Account])
	accounts() {
		return Account.find();
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async createAccount(
		@Arg("currency") currency: string,
		@Arg("balance") balance: number,
		@Ctx() { payload }: MyContext
	) {
		if (!payload) {
			return false;
		}

		const owner = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			const account = await Account.findOne({
				where: { owner: owner, currency: currency }
			});

			if (account) {
				console.log("Account with currency already exists!");
				return false;
			} else {
				try {
					await Account.insert({
						owner,
						currency,
						balance
					});
				} catch (err) {
					console.log(err);
					return false;
				}
			}
		}
		return true;
	}
}
