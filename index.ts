import {
  Application,
  Router,
  RouterContext,
} from "https://deno.land/x/oak@v6.0.2/mod.ts";

import {
  applyGraphQL,
  gql,
  GQLError,
} from "https://deno.land/x/oak_graphql@0.6.1/mod.ts";

const app = new Application();
const port = 8080;

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

const types = (gql as any)`
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
  
  type Query {
    getUser(id: String): User 
  }
  
  type Mutation {
    setUser(input: UserInput!): ResolveType!
  }
  `;

const resolvers = {
  Query: {
    getUser: (parent: any, { id }: any, context: any, info: any) => {
      console.log("id", id, context);
      if (context.user === "Aaron") {
        throw new GQLError({ type: "auth error in context" });
      }
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
      console.log("input:", firstName, lastName);
      return {
        done: true,
      };
    },
  },
};

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  context: (ctx: RouterContext) => {
    return { user: "Aaron" };
  },
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log(`Server running on http://localhost:${port}`);
await app.listen({ port });
