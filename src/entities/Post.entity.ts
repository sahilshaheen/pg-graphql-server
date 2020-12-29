import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User.entity";

@ObjectType()
@Entity()
export class Post {
    
    @Field(type => ID)
    @PrimaryKey()
    id!: number;
    
    @Field()
    @Property()
    title!: string;
    
    @Field()
    @Property()
    content!: string;
    
    @Field(type => User)
    @ManyToOne()
    user!: User;

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }
}