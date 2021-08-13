import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'node:querystring';
import type { NextPage } from 'next';

import API from '@/api/portfolios/portfolios';
import Redirect from '@/utils/preRender/preRenderRoute';
import { PortfolioType } from '@/types/portfolios/portfolios';

const PortfolioDetail: NextPage<PortfolioType> = ({ portfolio }) => {
  return (
    <>
      <div>{JSON.stringify(portfolio)}</div>
    </>
  );
};

interface PortfolioDetailStaticProps {
  portfolio: PortfolioType;
}

interface PortfolioDetailParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<
  PortfolioDetailStaticProps,
  PortfolioDetailParams
> = async (ctx) => {
  const id = ctx.params!.id;
  const portfolio = await API.fetchPortfolio(id);
  console.log('portfolio', portfolio);
  return {
    props: {
      portfolio
    },
    revalidate: 600
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
