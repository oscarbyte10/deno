import {
  Application,
  Router,
} from "./config/deps.ts";

import { applyGraphQL } from "./config/deps.ts";

import { Schema } from "./models/index.ts";

import { resolvers } from "./controllers/index.ts";

import { db } from "./config/db.ts";

const app = new Application();
const port = 8080;

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: Schema,
  resolvers,
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

db.connect("deno");

console.log(`Server running on http://localhost:${port}`);
await app.listen({ port });
