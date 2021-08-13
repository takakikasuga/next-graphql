import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'node:querystring';
import type { NextPage } from 'next';

interface TopicPostProps {
  id: string;
}

const TopicPost: NextPage<TopicPostProps> = ({ id }) => {
  return <div>Topic Post{id}</div>;
};

interface TopicPostStaticProps {
  id: string;
}

interface TopicPostParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<
  TopicPostStaticProps,
  TopicPostParams
> = async (ctx) => {
  const id = ctx.params!.id;
  return {
    props: {
      id
    }
  };
};

export const getStaticPaths: GetStaticPaths<TopicPostParams> = async () => {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: true
  };
};

export default TopicPost;
