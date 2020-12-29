import { Arg, Authorized, Ctx, Field, Query, Resolver } from "type-graphql";
import { User } from "../entities/User.entity";
import { Context } from "../types";

@Resolver(of => User)
export class UserResolver {
    @Query(returns => User, { nullable: true })
    user(@Arg('userId') userId: number, @Ctx() { em }: Context) {
        return em.findOne(User, userId);
    }

    @Authorized()
    @Query(returns => [User])
    users(@Ctx() { em }: Context) {
        return em.find(User, {}, ['posts']);
    }
}