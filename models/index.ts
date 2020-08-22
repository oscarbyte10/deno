import { gql } from "../config/deps.ts";
import { User } from "./User.ts";

export const Schema = (gql as any)`
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }

    ${User}
`;
