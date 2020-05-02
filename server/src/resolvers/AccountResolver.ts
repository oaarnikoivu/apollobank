import { ErrorMessages } from "./../utils/messages";
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
import { SuccessMessages } from "../utils/messages";

@ObjectType()
class AccountResponse {
	@Field(() => Account)
	account: Account;

	@Field(() => String)
	message: String;
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
					throw new Error(ErrorMessages.ADD_MONEY);
				}
			}
		}

		try {
			const updatedAccount: Account | undefined = await Account.findOne({
				where: { owner: owner, currency: currency },
			});

			if (updatedAccount) {
				return {
					account: updatedAccount,
					message: SuccessMessages.ADD_MONEY,
				};
			}
		} catch (error) {
			throw new Error(ErrorMessages.ADD_MONEY);
		}
		return null;
	}

	@Mutation(() => AccountResponse)
	@UseMiddleware(isAuth)
	async exchange(
		@Arg("selectedAccountCurrency") selectedAccountCurrency: string,
		@Arg("toAccountCurrency") toAccountCurrency: string,
		@Arg("amount") amount: number,
		@Ctx() { payload }: MyContext
	): Promise<AccountResponse | null> {
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
							let amountWithConversion: number = 0;

							// Apply conversion rates for each currency
							if (selectedAccountCurrency === "EUR" && toAccountCurrency === "USD") {
								amountWithConversion = amount * 1.11;
							} else if (selectedAccountCurrency === "EUR" && toAccountCurrency === "GBP") {
								amountWithConversion = amount * 0.89;
							} else if (selectedAccountCurrency === "USD" && toAccountCurrency === "EUR") {
								amountWithConversion = amount * 0.9;
							} else if (selectedAccountCurrency === "USD" && toAccountCurrency === "GBP") {
								amountWithConversion = amount * 0.8;
							} else if (selectedAccountCurrency === "GBP" && toAccountCurrency === "USD") {
								amountWithConversion = amount * 1.25;
							} else if (selectedAccountCurrency === "GBP" && toAccountCurrency === "EUR") {
								amountWithConversion = amount * 1.13;
							}

							await Account.update(
								{ id: toAccount.id },
								{ balance: toAccount.balance + Math.round(amountWithConversion) }
							);
							await Account.update(
								{ id: currentAccount.id },
								{ balance: currentAccount.balance - Math.round(amountWithConversion) }
							);
						} catch (err) {
							console.log(err);
							return null;
						}
					}
				} else {
					throw new Error(ErrorMessages.EXCHANGE);
				}
			}
		}

		try {
			const updatedAccount = await Account.findOne({
				where: { owner: owner, currency: selectedAccountCurrency },
			});

			if (updatedAccount) {
				return {
					account: updatedAccount,
					message: SuccessMessages.EXCHANGE,
				};
			}
		} catch (error) {
			throw new Error(ErrorMessages.EXCHANGE);
		}

		return null;
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

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async deleteAccount(@Arg("currency") currency: string, @Ctx() { payload }: MyContext) {
		if (!payload) {
			return false;
		}

		const owner: User | undefined = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			const account: Account | undefined = await Account.findOne({
				where: { owner: owner, currency: currency },
			});

			if (account) {
				if (account.balance == 0) {
					try {
						await Account.delete({
							id: account.id,
						});
					} catch (error) {
						console.log(error);
						return false;
					}
				} else if (account.balance < 0) {
					throw new Error(
						"Your account balance has fallen below 0. Please top up before deleting."
					);
				} else if (account.balance > 0) {
					throw new Error(
						"Your account balance is greater than 0. Please exchange your funds before deleting."
					);
				}
			}
		}
		return true;
	}
}
