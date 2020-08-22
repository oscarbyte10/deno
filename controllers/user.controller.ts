import { db } from "../config/db.ts";

db.setCollection("users");

export const UserController = {
  Query: {
    getUsers: async (parent: any, { id }: any, context: any, info: any) => {
      let users: any[] = [];
      await db.getAll().then((element) => {
        element.map((user) => users.push(user));
      });
      return users;
    },
  },
  Mutation: {
    setUser: (
      parent: any,
      { input: { firstName, lastName } }: any,
      context: any,
      info: any,
    ) => {
      return {
        done: true,
      };
    },
  },
};
