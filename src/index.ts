import 'dotenv/config';
import "reflect-metadata";
import path from 'path';
import { AuthChecker, buildSchema } from "type-graphql";
import config from './mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';
import { UserResolver } from './resolvers/User.resolver';
import { Context } from './types';
import { PostResolver } from './resolvers/Post.resolver';
import express from "express";
import { ApolloServer } from 'apollo-server-express';
import * as admin from 'firebase-admin';
import key from '../firebaseKey.json';
import { ServiceAccount } from 'firebase-admin';

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert(key as ServiceAccount),
  });
  const auth = admin.auth();

  const orm = await MikroORM.init(config);

  const customAuthChecker: AuthChecker<Context> = ({ context }) => {
    return !!context.uid
  }
  const schema = await buildSchema({
    resolvers: [UserResolver, PostResolver],
    // creates gql schema file
    emitSchemaFile: path.resolve(__dirname, "../schema.gql"),
    // to use decorators like min, max, etc validate has to be set to true
    validate: false,
    authChecker: customAuthChecker
  });

  const server = new ApolloServer({
    schema,
    context: async ({ req }): Promise<Context> => {
      let context: Context = {
        em: orm.em.fork(),
      }
      const token = req.headers.authorization || ''
      if (token) {
        try {
          const { uid, } = await auth.verifyIdToken(token)
          context.uid = uid
        } catch (err) {
          console.log(err)
        }
      }
      console.log(context);
      return context;
    },
    // default behaviour without below option: playground is disabled when NODE_ENV = production
    // playground: true 
  });

  const app = express();
  server.applyMiddleware({ app })

  const port = process.env.PORT
  app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  })
}

bootstrap();
