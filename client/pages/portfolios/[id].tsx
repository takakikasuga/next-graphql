import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'node:querystring';
import type { NextPage } from 'next';

interface PortfolioDetailProps {
  id: string;
}

const PortfolioDetail: NextPage<PortfolioDetailProps> = ({ id }) => {
  return <div>Categories ID: {id}</div>;
};

interface PortfolioDetailStaticProps {
  id: string;
}

interface PortfolioDetailParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<
  PortfolioDetailStaticProps,
  PortfolioDetailParams
> = async (ctx) => {
  const id = ctx.params!.id;
  return {
    props: {
      id
    }
  };
};

export const getStaticPaths: GetStaticPaths<PortfolioDetailParams> =
  async () => {
    return {
      paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
      fallback: true
    };
  };

export default PortfolioDetail;
