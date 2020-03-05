import { ObjectType, Field, Int } from "type-graphql";
import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity("accounts")
export class Account extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(
		() => User,
		owner => owner.accounts
	)
	owner: User;

	@Field()
	@Column()
	currency: string;

	@Field()
	@Column({ default: 0 })
	balance: number;
}
