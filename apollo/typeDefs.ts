import gql from "graphql-tag";

export const typeDefs = gql`
  type Post {
    id: ID
    title: String
    slug: String
  }

  type Query {
    hello: String
    posts: [Post!]!
    post(slug: String!): Post!
  }
`;
