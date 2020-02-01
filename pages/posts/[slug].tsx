import React from "react";
import { Post } from "@prisma/client";
import { NextPage, NextPageContext } from "next";
import Nav from "../../components/nav";

type Props = {
  post: Post;
};

const query = `
  query PostPage($slug: String!) {
    post(slug: $slug) {
      id
      title
    }
  }
`;

const PostPage: NextPage<Props> = ({ post }) => {
  console.log(post);
  return (
    <div>
      <Nav />
      <h1>{post.title}</h1>
    </div>
  );
};

PostPage.getInitialProps = async ({ query: slug }) => {
  const { request } = await import("graphql-request");
  const data = await request(`http://localhost:3000/api/graphql`, query, slug);
  return { post: await data.post } as Props;
};

export default PostPage;
