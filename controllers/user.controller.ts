export const UserController = {
  Query: {
    getUser: (parent: any, { id }: any, context: any, info: any) => {
      return {
        firstName: "wooseok",
        lastName: "lee",
      };
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
