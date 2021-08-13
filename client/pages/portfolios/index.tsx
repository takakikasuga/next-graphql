import { Fragment } from 'react';
import { NextPage } from 'next';

import { PortfolioCard } from '@/components/portfolios/index';
import { FlexLayout } from '@/components/layouts/index';
import API from '@/api/portfolios/portfolios';
import Redirect from '@/utils/preRender/preRenderRoute';
import { NextLink } from '@/components/parts/index';
import { PortfoliosType } from '@/types/portfolios/portfolios';

const Portfolios: NextPage<PortfoliosType> = ({ portfolios }) => {
  return (
    <Fragment>
      <h1>Portfolios</h1>
      {JSON.stringify(portfolios)}
      <FlexLayout>
        {portfolios.map((portfolio) => (
          <NextLink
            key={portfolio._id}
            className=''
            href={`/portfolios/${portfolio._id}`}>
            <PortfolioCard portfolio={portfolio} />
          </NextLink>
        ))}
      </FlexLayout>
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
