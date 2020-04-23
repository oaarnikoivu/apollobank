import { createRefreshToken, createAccessToken } from "../utils/auth";
import {
	Resolver,
	Query,
	Mutation,
	Arg,
	Field,
	ObjectType,
	Ctx,
	UseMiddleware,
	Int,
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from "../entity/User";
import { MyContext } from "../MyContext";
import { isAuth } from "../middleware";
import { sendRefreshToken } from "../utils/sendRefreshToken";
import { getConnection } from "typeorm";
import { verify } from "jsonwebtoken";

@ObjectType()
class LoginResponse {
	@Field()
	accessToken: string;
	@Field(() => User)
	user: User;
}

@Resolver()
export class UserResolver {
	@Query(() => String)
	hello() {
		return "hi!";
	}

	@Query(() => String)
	@UseMiddleware(isAuth)
	bye(@Ctx() { payload }: MyContext) {
		console.log(payload);
		return `Your user id is: ${payload!.userId}`;
	}

	@Query(() => [User])
	users() {
		return User.find();
	}

	@Query(() => User, { nullable: true })
	me(@Ctx() context: MyContext) {
		const authorization: string | undefined = context.req.headers["authorization"];

		if (!authorization) {
			return null;
		}

		try {
			const token: string = authorization.split(" ")[1];
			const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
			context.payload = payload as any;
			return User.findOne(payload.userId);
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	@Mutation(() => Boolean)
	async logout(@Ctx() { res }: MyContext) {
		sendRefreshToken(res, "");
		return true;
	}

	@Mutation(() => Boolean)
	async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
		await getConnection().getRepository(User).increment({ id: userId }, "tokenVersion", 1);

		return true;
	}

	@Mutation(() => LoginResponse)
	async login(
		@Arg("email") email: string,
		@Arg("password") password: string,
		@Ctx() { res }: MyContext
	): Promise<LoginResponse> {
		const user: User | undefined = await User.findOne({ where: { email } });

		if (!user) {
			throw new Error("Invalid login");
		}

		const valid: boolean = await compare(password, user.password);

		if (!valid) {
			throw new Error("Invalid password");
		}

		// login successful

		sendRefreshToken(res, createRefreshToken(user));

		return {
			accessToken: createAccessToken(user),
			user,
		};
	}

	@Mutation(() => Boolean)
	async register(
		@Arg("email") email: string,
		@Arg("password") password: string,
		@Arg("firsName") firstName: string,
		@Arg("lastName") lastName: string,
		@Arg("dateOfBirth") dateOfBirth: string,
		@Arg("streetAddress") streetAddress: string,
		@Arg("postCode") postCode: string,
		@Arg("city") city: string,
		@Arg("country") country: string
	) {
		const hashedPassword: string = await hash(password, 12);

		try {
			await User.insert({
				email,
				password: hashedPassword,
				firstName,
				lastName,
				dateOfBirth,
				streetAddress,
				postCode,
				city,
				country,
			});
		} catch (err) {
			console.log(err);
			return false;
		}

		return true;
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async updatePassword(
		@Arg("oldPassword") oldPassword: string,
		@Arg("newPassword") newPassword: string,
		@Ctx() { payload }: MyContext
	) {
		if (!payload) {
			return false;
		}

		const owner: User | undefined = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			const valid = await compare(oldPassword, owner.password);

			if (valid) {
				const updatedPassword: string = await hash(newPassword, 12);

				try {
					await User.update(
						{
							id: owner.id,
						},
						{
							password: updatedPassword,
						}
					);
				} catch (err) {
					console.log(err);
					return false;
				}
			} else {
				throw new Error(
					"Could not change your password, are you sure you entered the correct password?"
				);
			}
		}
		return true;
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async deleteAccount(@Ctx() { payload }: MyContext) {
		if (!payload) {
			return false;
		}

		const owner: User | undefined = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			try {
				await User.delete({
					id: owner.id,
				});
			} catch (error) {
				console.log(error);
				return false;
			}
		}
		return true;
	}
}
