import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { Post } from "@prisma/client";
import useSWR from "swr";
import Nav from "../../components/nav";
import { graphqlFetcher } from "../../lib";
import { IncomingMessage } from "http";

type Props = {
  posts: Post[];
};

const query = `
  query PostsPreview {
    posts {
      id
      title
      slug
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
          <li key={post.id}>
            <Link href={"/posts/[slug]"} as={`/posts/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const getHost = req => req?.headers.host || req?.headers.location;

const getUrl = (req: IncomingMessage) => {
  const protocol = req?.headers.referer.includes("https") ? "https" : "http";
  const host = getHost(req);
  return host ? `${protocol}://${getHost(req)}` : "";
};

/**
 * See SWR Server Render example
 * @see https://github.com/zeit/swr/tree/master/examples/server-render
 */
Posts.getInitialProps = async ({ req }) => {
  console.log(getUrl(req));
  const { request } = await import("graphql-request");
  const data = await request(`${getUrl(req)}/api/graphql`, query);
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
//   const posts = await client.post.findMany({ where: { published: true } });
//   return {
//     props: { posts }
//   };
// }

// export async function unsafe_getStaticProps(ctx) {
//   const { PrismaClient } = await import("@prisma/client");
//   const client = new PrismaClient();
//   const posts = await client.post.findMany({ where: { published: true } });
//   return {
//     props: { posts }
//   };
// }

export default Posts;
