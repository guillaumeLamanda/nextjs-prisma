import { ApolloServer, makeExecutableSchema, gql } from "apollo-server-micro";
import { Photon, User } from "@prisma/photon";

export const config = {
  api: {
    bodyParser: false
  }
};

const typeDefs = gql`
  type Post {
    id: ID
    title: String
  }

  type Query {
    hello: String
    posts: [Post]
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello",
    posts: async (_: void, __: void, { photon }: Context) =>
      photon.posts({ where: { published: true } })
  }
};

type Context = {
  photon: Photon;
  user: Partial<User> | undefined;
};

const context = (): Context => ({
  photon: new Photon(),
  user: undefined
});

const server = new ApolloServer({
  context,
  schema: makeExecutableSchema({
    typeDefs,
    resolvers
  })
});

export default server.createHandler({
  path: "/api/graphql"
});
