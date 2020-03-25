import { ObjectType, Field, Int } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Account } from "./Account";
import { Card } from "./Card";

@ObjectType()
@Entity("transactions")
export class Transaction extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(
		() => Account,
		account => account.transactions
	)
	account: Account;

	@ManyToOne(
		() => Card,
		card => card.transactions
	)
	card: Card;

	@Field()
	@Column()
	transactionType: string;

	@Field()
	@Column({ unique: true })
	date: Date;

	@Field()
	@Column()
	amount: string;
}
