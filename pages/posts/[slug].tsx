import React from "react";
import { Post } from "@prisma/client";
import { NextPage } from "next";
import Nav from "../../components/nav";

type Props = {
  post: Post;
};

const PostPage: NextPage<Props> = ({ post }) => (
  <div>
    <Nav />
    <h1>{post.title}</h1>
    <p>{post.content}</p>
  </div>
);

export async function getStaticProps({ params: { slug } }) {
  const { PrismaClient } = await import("@prisma/client");
  const client = new PrismaClient();
  const post = await client.post.findOne({
    where: { slug },
    include: { author: true }
  });

  return {
    props: {
      post: {
        ...post,
        createdAt: post.createdAt.toDateString(),
        updatedAt: post.updatedAt.toDateString()
      }
    }
  };
}

export async function getStaticPaths(ctx) {
  const { PrismaClient } = await import("@prisma/client");
  const client = new PrismaClient();
  const posts = await client.post.findMany({
    where: { published: true },
    select: { slug: true }
  });
  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: false
  };
}

export default PostPage;
