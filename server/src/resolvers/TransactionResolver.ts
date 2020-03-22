import { Account } from "./../entity/Account";
import { Transaction } from "./../entity/Transaction";
import { User } from "./../entity/User";
import { MyContext } from "./../MyContext";
import { isAuth } from "./../isAuth";
import { Resolver, Query, UseMiddleware, Ctx, Mutation, Arg } from "type-graphql";
import faker from "faker";

@Resolver()
export class TransactionResolver {
	@Query(() => [Transaction])
	@UseMiddleware(isAuth)
	async transactions(@Arg("currency") currency: string, @Ctx() { payload }: MyContext) {
		if (!payload) {
			return null;
		}

		const owner = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			const account = await Account.findOne({ where: { owner: owner, currency: currency } });

			if (account) {
				return Transaction.find({ where: { account: account } });
			}
		}

		return null;
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async createTransaction(@Arg("currency") currency: string, @Ctx() { payload }: MyContext) {
		if (!payload) {
			return false;
		}

		const owner = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			const account = await Account.findOne({
				where: { owner: owner, currency: currency }
			});

			if (account) {
				try {
					await Transaction.insert({
						account,
						transactionType: faker.finance.transactionType(),
						date: faker.date.recent(31),
						amount: faker.finance.amount()
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
