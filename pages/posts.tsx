import React from "react";
import { NextPage } from "next";
import { Post } from "@prisma/client";
import Nav from "../components/nav";
import useSWR from "swr";
import { graphqlFetcher } from "../lib";

type Props = {
  posts: Post[];
};

const query = `
  query PostsPreview {
    posts {
      id
      title
    }
  }
`;

const Posts: NextPage<Props> = ({ posts: initialPosts }) => {
  const { data: { posts = [] } = {} } = useSWR<{ posts: Post[] }>(
    query,
    graphqlFetcher,
    {
      initialData: { posts: initialPosts }
    }
  );
  return (
    <div>
      <Nav />
      <h1>Posts list</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

/**
 * See SWR Server Render example
 * @see https://github.com/zeit/swr/tree/master/examples/server-render
 */
Posts.getInitialProps = async ({ req }) => {
  const { request } = await import("graphql-request");
  const data = await request(`http://localhost:3000/api/graphql`, query);
  console.log(data);

  return { posts: await data.posts };
};

/**
 * This should work, but does not cause of
 * `child_process` not found error.
 * `getServerProps` method is not finished yet, so we need
 * wait before making database calls from here
 */
// export async function unsafe_getServerProps(ctx) {
//   const { PrismaClient } = await import("@prisma/client");
//   const client = new PrismaClient();
//   return { props: { posts: await client.posts() } };
// }

// export async function unsafe_getStaticProps(ctx) {
//   const { PrismaClient } = await import("@prisma/client");
//   const client = new PrismaClient();
//   return { props: { posts: await client.posts() } };
// }

export default Posts;
