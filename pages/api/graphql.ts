import { ApolloServer, makeExecutableSchema } from "apollo-server-micro";
import { context, typeDefs, resolvers } from "../../apollo";

export const config = {
  api: {
    bodyParser: false
  }
};

export const server = new ApolloServer({
  context,
  schema: makeExecutableSchema({
    typeDefs,
    resolvers
  }),
  playground: true
});

export default server.createHandler({
  path: "/api/graphql"
});
