import { ObjectType, Field, Int } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Account } from "./Account";

@ObjectType()
@Entity("transactions")
export class Transaction extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column()
	date: string;

	@Field()
	@Column()
	income: number;

	@Field()
	@Column()
	expenses: number;

	@ManyToOne(
		() => Account,
		account => account.transactions
	)
	account: Account;
}
