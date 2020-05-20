import { ObjectType, Field, Int } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

import { User } from "./User";
import { Post } from "./Post";
import type Lazy from "../Lazy";

@Entity()
@ObjectType()
export class Rate {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field(type => Int)
  @Column({ type: "int" })
  value: number;

  @Field(type => User)
  @ManyToOne(type => User, { lazy: true })
  user: Lazy<User>;

  @Field()
  @CreateDateColumn()
  date: Date;

  @ManyToOne(type => Post, { lazy: true })
  post: Lazy<Post>;
}