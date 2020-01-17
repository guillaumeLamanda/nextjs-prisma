import React from "react";
import { NextPage } from "next";
import { Post } from "@prisma/photon";
import Nav from "../components/nav";

type Props = {
  posts: Post[];
};

const Posts: NextPage<Props> = ({ posts = [] }) => {
  console.log(posts);
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

export async function unsafe_getServerProps(ctx) {
  return { props: { posts: [] } };
}

export async function unsafe_getStaticProps(ctx) {
  return { props: { posts: [] } };
}

export default Posts;
