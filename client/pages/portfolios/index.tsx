import { Fragment } from 'react';
import { NextPage } from 'next';

import { PortfolioCard } from '@/components/portfolios/index';
import { FlexLayout } from '@/components/layouts/index';
import API from '@/api/portfolios/portfolios';
import Redirect from '@/utils/preRender/preRenderRoute';
import { PortfoliosType } from '@/types/portfolios/portfolios';

const Portfolios: NextPage<PortfoliosType> = ({ portfolios }) => {
  return (
    <Fragment>
      <h1>Portfolios</h1>
      <FlexLayout>
        {portfolios.map((portfolio) => (
          <PortfolioCard key={portfolio._id} portfolio={portfolio} />
        ))}
      </FlexLayout>
      <p>{JSON.stringify(portfolios)}</p>
      <button className='primary-btn block'>データの取得</button>
    </Fragment>
  );
};

export const getStaticProps = async () => {
  try {
    const portfolios = await API.fetchPortfolios();
    if (!portfolios) return Redirect.redirectHome;
    return {
      props: {
        portfolios
      },
      revalidate: 600
    };
  } catch (error) {
    return Redirect.redirectHome;
  }
};

export default Portfolios;
