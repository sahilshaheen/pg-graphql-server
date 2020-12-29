import { Post } from "./entities/Post.entity";
import { User } from "./entities/User.entity";

export default {
    type: 'postgresql' as 'postgresql',
    clientUrl: process.env.DB_URL,
    entities: [Post, User],
    driverOptions: {
      connection: {
        ssl: {
          ca: process.env.CA
        }
      }
    }
  }