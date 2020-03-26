import { createRandomBicCode } from "./../utils/createRandom";
import { isAuth } from "../middleware";
import { Query, Resolver, Mutation, Ctx, UseMiddleware, Arg, Float } from "type-graphql";
import { MyContext } from "../MyContext";
import { User } from "../entity/User";
import { Account } from "../entity/Account";
import { createRandomSortCode, createRandomIbanCode } from "../utils/createRandom";

@Resolver()
export class AccountResolver {
	@Query(() => [Account])
	@UseMiddleware(isAuth)
	async accounts(@Ctx() { payload }: MyContext) {
		if (!payload) {
			return null;
		}

		const owner: User | undefined = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			return Account.find({ where: { owner: owner } });
		}

		return null;
	}

	@Query(() => Account)
	@UseMiddleware(isAuth)
	async account(@Arg("transactionId") transactionId: number, @Ctx() { payload }: MyContext) {
		if (!payload) {
			return null;
		}

		const owner: User | undefined = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			return Account.findOne({ where: { owner: owner, transactions: [{ id: transactionId }] } });
		}

		return null;
	}

	@Mutation(() => Float)
	@UseMiddleware(isAuth)
	async addMoney(
		@Arg("amount") amount: number,
		@Arg("currency") currency: string,
		@Ctx() { payload }: MyContext
	) {
		if (!payload) {
			return false;
		}

		const owner: User | undefined = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			const account: Account | undefined = await Account.findOne({
				where: { owner: owner, currency: currency }
			});

			if (account) {
				try {
					await Account.update({ id: account.id }, { balance: account.balance + amount });
				} catch (err) {
					console.log(err);
					throw new Error("Something went wrong");
				}
			}
		}

		const updatedAccount: Account | undefined = await Account.findOne({
			where: { owner: owner, currency: currency }
		});

		if (updatedAccount) {
			return [updatedAccount.balance];
		}

		return 0;
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async createAccount(@Arg("currency") currency: string, @Ctx() { payload }: MyContext) {
		if (!payload) {
			return false;
		}

		const owner: User | undefined = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			const account: Account | undefined = await Account.findOne({
				where: { owner: owner, currency: currency }
			});

			if (account) {
				throw new Error(`You already have a ${currency} account`);
			} else {
				try {
					await Account.insert({
						owner,
						currency,
						sortCode: currency === "GBP" ? createRandomSortCode() : "00-00-00",
						iban: createRandomIbanCode(),
						bic: createRandomBicCode()
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
