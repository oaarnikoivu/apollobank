import { ObjectType, Field, Int } from "type-graphql";
import { BaseEntity, PrimaryGeneratedColumn, Entity } from "typeorm";

@ObjectType()
@Entity("accounts")
export class Account extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;
}
