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

const Posts: NextPage<Props> = ({ posts }) => (
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

export async function getStaticProps(ctx) {
  const { PrismaClient } = await import("@prisma/client");
  const client = new PrismaClient();
  const posts = await client.post.findMany({
    where: { published: true },
    select: { id: true, title: true, slug: true }
  });

  return {
    props: { posts }
  };
}

export default Posts;
