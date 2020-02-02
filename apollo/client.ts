import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SchemaLink } from "apollo-link-schema";
import { makeExecutableSchema } from "graphql-tools";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export const graphqlClient = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema })
});
