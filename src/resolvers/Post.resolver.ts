import { Arg, Ctx, Field, InputType, Int, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Context } from "../types";
import { Post } from "../entities/Post.entity";
import { User } from "../entities/User.entity";

@ObjectType()
@InputType()
class NewPost implements Partial<Post> {
    @Field()
    title: string;

    @Field()
    content: string;
}

@InputType({ description: 'Input for new post' })
class NewPostInput extends NewPost {
    @Field(type => Int)
    userId: number;
}

@ObjectType()
class NewPostOutput extends NewPost {
    @Field(type => User)
    user: User;
}

@ObjectType()
class ErrorObject {
    @Field(type => Int)
    code: number;

    @Field()
    message: string;
}

@ObjectType()
class PostResponse {
    @Field(type => NewPostOutput, { nullable: true })
    post?: NewPostOutput;

    @Field(type => ErrorObject, { nullable: true })
    error?: ErrorObject;
}

@Resolver(of => Post)
export class PostResolver {
    @Query(returns => [Post])
    posts(@Ctx() { em }: Context) {
        return em.find(Post, {}, ['user'])
    }

    @Mutation(returns => PostResponse)
    async addPost(@Arg('data') data: NewPostInput, @Ctx() { em }: Context): Promise<PostResponse> {
        const user = await em.findOne(User, data.userId)
        if (!user) return {
            error:
            {
                code: 404,
                message: 'User not found'
            }

        };
        const post = new Post(data.title, data.content)
        post.user = user
        em.persist(post).flush();
        return { post };

    }
}