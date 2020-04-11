import { createRandomBicCode } from "./../utils/createRandom";
import { isAuth } from "../middleware";
import {
	Query,
	Resolver,
	Mutation,
	Ctx,
	UseMiddleware,
	Arg,
	ObjectType,
	Field,
} from "type-graphql";
import { MyContext } from "../MyContext";
import { User } from "../entity/User";
import { Account } from "../entity/Account";
import { createRandomSortCode, createRandomIbanCode } from "../utils/createRandom";

@ObjectType()
class AccountResponse {
	@Field(() => Account)
	account: Account;
}

@ObjectType()
class ExchangeResponse {
	@Field(() => Account)
	account: Account | undefined;

	@Field(() => Boolean)
	success: boolean;
}

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
	async account(
		@Arg("currency") currency: string,
		@Ctx() { payload }: MyContext
	): Promise<Account | undefined> {
		if (!payload) {
			throw new Error("");
		}

		const owner: User | undefined = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			const account = Account.findOne({ where: { owner: owner, currency: currency } });

			if (account) {
				return account;
			}
		}

		return undefined;
	}

	@Mutation(() => AccountResponse)
	@UseMiddleware(isAuth)
	async addMoney(
		@Arg("amount") amount: number,
		@Arg("currency") currency: string,
		@Ctx() { payload }: MyContext
	): Promise<AccountResponse | null> {
		if (!payload) {
			return null;
		}

		const owner: User | undefined = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			const account: Account | undefined = await Account.findOne({
				where: { owner: owner, currency: currency },
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
			where: { owner: owner, currency: currency },
		});

		if (updatedAccount) {
			return {
				account: updatedAccount,
			};
		}

		return null;
	}

	@Mutation(() => ExchangeResponse)
	@UseMiddleware(isAuth)
	async exchange(
		@Arg("selectedAccountCurrency") selectedAccountCurrency: string,
		@Arg("toAccountCurrency") toAccountCurrency: string,
		@Arg("amount") amount: number,
		@Ctx() { payload }: MyContext
	): Promise<ExchangeResponse | null> {
		if (!payload) {
			return null;
		}

		const owner: User | undefined = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			const currentAccount: Account | undefined = await Account.findOne({
				where: { owner: owner, currency: selectedAccountCurrency },
			});

			if (currentAccount) {
				if (currentAccount.balance >= amount) {
					// Exchange the amount to the other account
					const toAccount: Account | undefined = await Account.findOne({
						where: {
							owner: owner,
							currency: toAccountCurrency,
						},
					});

					if (toAccount) {
						try {
							await Account.update({ id: toAccount.id }, { balance: toAccount.balance + amount });
							await Account.update(
								{ id: currentAccount.id },
								{ balance: currentAccount.balance - amount }
							);
						} catch (err) {
							console.log(err);
							return null;
						}
					}
				} else {
					throw new Error("You do not have the sufficient funds to make this exchange!");
				}
			}
		}

		const updatedAccount = await Account.findOne({
			where: { owner: owner, currency: selectedAccountCurrency },
		});

		if (updatedAccount) {
			return {
				account: updatedAccount,
				success: true,
			};
		}

		return {
			account: undefined,
			success: false,
		};
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
				where: { owner: owner, currency: currency },
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
						bic: createRandomBicCode(),
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
