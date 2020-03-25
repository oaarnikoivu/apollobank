import { ObjectType, Field, Int } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from "typeorm";
import { Transaction } from "./Transaction";
import { Account } from "./Account";

@ObjectType()
@Entity("cards")
export class Card extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(
		() => Account,
		account => account.cards
	)
	account: Account;

	@OneToMany(
		() => Transaction,
		transaction => transaction.card
	)
	transactions: Transaction[];

	@Field()
	@Column()
	cardNumber: string;

	@Field()
	@Column()
	pin: number;

	@Field()
	@Column()
	expiresIn: Date;

	@Field()
	@Column()
	cvv: number;

	@Field()
	@Column()
	monthlySpendingLimit: number;
}
