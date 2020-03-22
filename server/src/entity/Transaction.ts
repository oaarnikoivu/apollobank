import { ObjectType, Field, Int } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Account } from "./Account";

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
