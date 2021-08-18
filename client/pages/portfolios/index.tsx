import { Fragment } from 'react';
import { NextPage } from 'next';

import {
  useCreatePortfolio,
  useGetPortfolio,
  useUpdatePortfolio,
  useDeletePortfolio
} from '@/apollo/actions/index';

import { PortfolioCard } from '@/components/portfolios/index';
import { FlexLayout } from '@/components/layouts/index';
import API from '@/api/portfolios/portfolios';
import Redirect from '@/utils/preRender/preRenderRoute';
import { NextLink } from '@/components/parts/index';
import { PortfolioType } from '@/types/portfolios/portfolios';

const findIndexNum = (portfolioArray: PortfolioType[], id: string): number => {
  return portfolioArray.findIndex((portfolio) => portfolio._id === id);
};

interface PortfoliosProps {
  portfolios: PortfolioType[];
}

const Portfolios: NextPage<PortfoliosProps> = ({ portfolios }) => {
  console.log('process.browser', process.browser);
  console.log('portfolios', portfolios);
  const { loading, error, data } = useGetPortfolio();
  console.log('loading', loading);
  console.log('error', error);
  console.log('data', data);
  console.log('useQueryのレンダリング');
  const [updatePortfolio] = useUpdatePortfolio();
  const [createPortfolio] = useCreatePortfolio();
  const [deletePortfolio] = useDeletePortfolio();
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR</h1>;
  const apolloPortfolios = data.portfolios as PortfolioType[];
  return (
    <Fragment>
      <h1>Portfolios</h1>
      {JSON.stringify(apolloPortfolios)}
      <button
        onClick={() => {
          createPortfolio();
        }}
        className='primary-btn block'>
        ポートフォリオ新規作成
      </button>
      <FlexLayout>
        {apolloPortfolios.map((portfolio) => (
          <div key={portfolio._id}>
            <NextLink className='' href={`/portfolios/${portfolio._id}`}>
              <PortfolioCard portfolio={portfolio} />
            </NextLink>
            <button
              onClick={() => {
                updatePortfolio({ variables: { id: portfolio._id } });
              }}
              className='primary-btn block'>
              ポートフォリオ更新
            </button>
            <button
              onClick={() => {
                deletePortfolio({ variables: { id: portfolio._id } });
              }}
              className='danger-btn block'>
              ポートフォリオ削除
            </button>
          </div>
        ))}
      </FlexLayout>
    </Fragment>
  );
};

export const getStaticProps = async () => {
  console.log('portfolios/getStaticProps');
  console.log('process.browser', process.browser);
  try {
    const portfolios = await API.fetchPortfolios();
    console.log('portfolios', portfolios);
    // const portfolios: PortfolioType[] = await API.fetchPortfolios();
    if (!portfolios) return Redirect.redirectHome;
    return {
      props: {
        portfolios
      },
      revalidate: 30
    };
  } catch (error) {
    console.error('error', error);
    return Redirect.redirectHome;
  }
};

export default Portfolios;
