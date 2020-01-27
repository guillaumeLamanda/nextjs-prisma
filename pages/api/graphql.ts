import { ApolloServer, makeExecutableSchema, gql } from "apollo-server-micro";
import { PrismaClient, User, Post } from "@prisma/client";

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
    posts: async (_: void, __: void, { prismaClient }: Context) =>
      prismaClient.posts({ where: { published: true } })
  }
};

type Context = {
  prismaClient: PrismaClient;
  user: Partial<User> | undefined;
};

const context = (): Context => ({
  prismaClient: new PrismaClient(),
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
