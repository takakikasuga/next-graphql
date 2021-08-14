import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'node:querystring';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useQuery } from '@apollo/client';
import { GET_PORTFOLIO } from '@/apollo/queries/index';
import API from '@/api/portfolios/portfolios';
import Redirect from '@/utils/preRender/preRenderRoute';
import { PortfolioType } from '@/types/portfolios/portfolios';

interface PortfolioDetailProps {
  portfolio: PortfolioType;
}

const PortfolioDetail = ({ portfolio }: PortfolioDetailProps) => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_PORTFOLIO, {
    variables: { id }
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log('data', data);
  return (
    <>
      <div>portfolio:{JSON.stringify(portfolio)}</div>
      <div>data:{JSON.stringify(data)}</div>
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
  try {
    const portfolio = await API.fetchPortfolio(id);
    console.log('portfolio', portfolio);
    return {
      props: {
        portfolio
      },
      revalidate: 600
    };
  } catch (error) {
    return Redirect.redirectHome;
  }
};

export const getStaticPaths: GetStaticPaths<PortfolioDetailParams> =
  async () => {
    return {
      paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
      fallback: true
    };
  };

export default PortfolioDetail;
