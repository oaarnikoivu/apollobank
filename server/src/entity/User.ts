import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Account } from "./Account";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Field()
	@Column()
	firstName: string;

	@Field()
	@Column()
	lastName: string;

	@Column()
	dateOfBirth: string;

	@Column()
	phone: string;

	@Column()
	streetAddress: string;

	@Column()
	postCode: string;

	@Column()
	city: string;

	@Column()
	country: string;

	@OneToMany(
		() => Account,
		account => account.owner
	)
	accounts: Account[];

	@Column("int", { default: 0 })
	tokenVersion: number;
}
