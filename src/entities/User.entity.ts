import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";
import { Post } from "./Post.entity";

@ObjectType()
@Entity()
export class User {

    @Field(type => ID)
    @PrimaryKey()
    id!: number
    
    @Field()
    @Property()
    username!: string;
    
    @Field()
    @Property()
    email!: string;
    
    @Field(type => [Post])
    @OneToMany(() => Post, post => post.user)
    posts = new Collection<Post>(this);
    
    constructor(username: string, email: string) {
        this.username = username;
        this.email = email;
    }
}