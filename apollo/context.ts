import { PrismaClient, User } from "@prisma/client";
import { graphqlClient } from "./client";
import ApolloClient from "apollo-client";
import { NormalizedCacheObject } from "apollo-cache-inmemory";

export type Context = {
  prismaClient: PrismaClient;
  graphqlClient: ApolloClient<NormalizedCacheObject>;
  user: Partial<User> | undefined;
};

export const context = (): Context => ({
  graphqlClient,
  prismaClient: new PrismaClient(),
  user: undefined
});
