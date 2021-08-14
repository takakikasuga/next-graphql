import React, { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'node:querystring';
import { NextPage } from 'next';

import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_PORTFOLIO } from '@/apollo/queries/index';
import API from '@/api/portfolios/portfolios';
import Redirect from '@/utils/preRender/preRenderRoute';
import { PortfolioType } from '@/types/portfolios/portfolios';

interface PortfolioDetailProps {
  portfolio: PortfolioType;
  queryId: string;
}

const PortfolioDetail: NextPage<PortfolioDetailProps> = ({
  portfolio,
  queryId
}: PortfolioDetailProps) => {
  const [portfolioState, setPortfolioState] = useState<PortfolioType | null>(
    null
  );
  const [getPortfolio, { loading, data }] = useLazyQuery(GET_PORTFOLIO);
  useEffect(() => {
    getPortfolio({ variables: { id: queryId } });
  }, [getPortfolio, queryId]);

  console.log('data', data);
  if (data && data.portfolio && !portfolioState) {
    console.log('data', data);
    console.log('portfolioState', portfolioState);
    console.log('Re rendering');
    setPortfolioState(data.portfolio);
  }
  if (loading || !portfolioState) return <h1>Loading...</h1>;

  return (
    <>
      <div>portfolio:{JSON.stringify(portfolio)}</div>
      <div>data:{JSON.stringify(data)}</div>
    </>
  );
};

interface PortfolioDetailStaticProps {
  portfolio: PortfolioType;
  queryId: string;
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
        portfolio,
        queryId: id
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
