import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'node:querystring';
import { NextPage } from 'next';

import { initializeApollo, addApolloState } from '@/lib/apolloClient';
import { useQuery } from '@apollo/client';
import { GET_PORTFOLIO, GET_PORTFOLIOS } from '@/apollo/queries/index';
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
  // const { data, loading, error } = useQuery(GET_PORTFOLIO, {
  //   variables: { id: queryId }
  // });
  // console.log('data', data);
  // const portfolio = (data && data.portfolio) || {};

  return (
    <>
      <div>portfolio:{JSON.stringify(portfolio)}</div>
      {/* <div>data:{JSON.stringify(data)}</div> */}
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
    // console.log('response', response);
    if (portfolio) return Redirect.redirectHome;
    return {
      props: {
        portfolio,
        queryId: id
      },
      revalidate: 30
    };
  } catch (error) {
    console.error('error', error);
    return Redirect.redirectHome;
  }
};

export const getStaticPaths: GetStaticPaths<PortfolioDetailParams> =
  async () => {
    const portfolios = await API.fetchPortfolios();
    const pathsWithParams = portfolios.map((portfolio: any) => {
      return { params: { id: portfolio._id } };
    });
    console.log('pathsWithParams', pathsWithParams);
    return {
      paths: pathsWithParams,
      fallback: true
    };
  };

export default PortfolioDetail;
