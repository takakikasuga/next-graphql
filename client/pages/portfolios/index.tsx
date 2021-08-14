import { Fragment, useState } from 'react';
import { NextPage } from 'next';

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
  const [portfoliosState, setPortfoliosState] = useState(portfolios);
  const createPortfolio = async () => {
    const createPortfolio: PortfolioType = await API.createPortfolio();
    setPortfoliosState([...portfoliosState, createPortfolio]);
  };
  const updatePortfolio = async (id: string) => {
    const updatePortfolio: PortfolioType = await API.updatePortfolio(id);
    let newPortfolios = [...portfoliosState];
    const index = findIndexNum(newPortfolios, id);
    newPortfolios.splice(index, 1, updatePortfolio);
    setPortfoliosState([...newPortfolios]);
  };
  const deletePortfolio = async (id: string) => {
    const deletedId: string = await API.deletePortfolio(id);
    let newPortfolios = [...portfoliosState];
    const index = findIndexNum(newPortfolios, deletedId);
    newPortfolios.splice(index, 1);
    setPortfoliosState([...newPortfolios]);
  };
  return (
    <Fragment>
      <h1>Portfolios</h1>
      {JSON.stringify(portfolios)}
      <button onClick={createPortfolio} className='primary-btn block'>
        ポートフォリオ新規作成
      </button>
      <FlexLayout>
        {portfoliosState.map((portfolio) => (
          <div key={portfolio._id}>
            <NextLink className='' href={`/portfolios/${portfolio._id}`}>
              <PortfolioCard portfolio={portfolio} />
            </NextLink>
            <button
              onClick={() => {
                updatePortfolio(portfolio._id);
              }}
              className='primary-btn block'>
              ポートフォリオ更新
            </button>
            <button
              onClick={() => {
                deletePortfolio(portfolio._id);
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
  try {
    const portfolios: PortfolioType[] = await API.fetchPortfolios();
    if (!portfolios) return Redirect.redirectHome;
    return {
      props: {
        portfolios
      },
      revalidate: 600
    };
  } catch (error) {
    console.error('error', error);
    return Redirect.redirectHome;
  }
};

export default Portfolios;
