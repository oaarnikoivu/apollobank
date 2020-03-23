import { isAuth } from "./../isAuth";
import { Query, Resolver, Mutation, Ctx, UseMiddleware, Arg } from "type-graphql";
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

		const owner = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			return Account.find({ where: { owner: owner } });
		}

		return null;
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async addMoney(@Arg("amount") amount: number, @Ctx() { payload }: MyContext) {
		if (!payload) {
			return false;
		}

		const owner = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			const account = await Account.findOne({ where: { owner: owner } });

			if (account) {
				try {
					await Account.update({ id: account.id }, { balance: account.balance + amount });
				} catch (err) {
					console.log(err);
					return false;
				}
			}
		}
		return true;
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async createAccount(@Arg("currency") currency: string, @Ctx() { payload }: MyContext) {
		if (!payload) {
			return false;
		}

		const owner = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			const account = await Account.findOne({
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
						iban: createRandomIbanCode()
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
