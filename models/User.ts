import { gql } from "../config/deps.ts";

export const User = (gql as any)`
  type User {
    firstName: String
    lastName: String
  }

  input UserInput {
    firstName: String
    lastName: String
  }

  type ResolveType {
    done: Boolean
  }

  extend type Query {
    getUsers: [User] 
  }

  extend type Mutation {
    setUser(input: UserInput!): ResolveType!
  }
`;
