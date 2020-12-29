import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import key from "../firebaseKey.json";

admin.initializeApp({
  credential: admin.credential.cert(key as ServiceAccount),
});

const auth = admin.auth();

const createUser = async (email: string, password: string, name: string) => {
  return auth
    .createUser({
      displayName: name,
      email,
      password,
    })
    .then(user => console.log(`Created account for ${user.displayName}`));
};

async function main() {
  process.exit(0);
}

main();
