import { Context } from "./context";

export const resolvers = {
  Query: {
    hello: () => "Hello",
    posts: async (_: void, __: void, { prismaClient }: Context) =>
      prismaClient.post.findMany({ where: { published: true } }),
    post: async (_: void, { slug }, { prismaClient }: Context) =>
      prismaClient.post.findOne({ where: { slug } })
  }
};
