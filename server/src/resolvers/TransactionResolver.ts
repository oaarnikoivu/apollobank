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
				let transactionType = faker.finance.transactionType();
				let amount = parseInt(faker.finance.amount());
				let date = faker.date.recent(31);
				let balance = account.balance;

				if (balance <= 0) {
					throw new Error("You do not have the sufficient funds.");
				}

				switch (transactionType) {
					case "withdrawal":
						balance -= amount;
						break;
					case "deposit":
						balance += amount;
						break;
					case "payment":
						balance -= amount;
						break;
					case "invoice":
						balance += amount;
						break;
				}

				try {
					await Transaction.insert({
						account,
						transactionType: transactionType,
						date: date,
						amount: amount.toString()
					});
					await Account.update(
						{
							id: account.id
						},
						{ balance: balance }
					);
				} catch (err) {
					console.log(err);
					return false;
				}
			}
		}
		return true;
	}
}
