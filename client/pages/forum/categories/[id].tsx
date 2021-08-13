import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'node:querystring';
import type { NextPage } from 'next';

interface CategoryProps {
  id: string;
}

const Category: NextPage<CategoryProps> = ({ id }) => {
  return <div>Specific Category{id}</div>;
};

interface CategoryStaticProps {
  id: string;
}

interface CategoryParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<
  CategoryStaticProps,
  CategoryParams
> = async (ctx) => {
  const id = ctx.params!.id;
  return {
    props: {
      id
    }
  };
};

export const getStaticPaths: GetStaticPaths<CategoryParams> = async () => {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: true
  };
};

export default Category;
