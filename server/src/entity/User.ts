import { Field, ID, ObjectType } from "type-graphql";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";

import { Post } from "./Post";
import type Lazy from "../Lazy";

@ObjectType()
@Entity()
export class User {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    email: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    nickname?: string;

    @Column()
    password: string;

    @OneToMany(type => Post, post => post.author, { lazy: true })
    @Field(type => [Post])
    posts: Lazy<Post[]>;
}