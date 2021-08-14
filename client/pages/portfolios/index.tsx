import { Fragment, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { GET_PORTFOLIOS, CREATE_PORTFOLIO } from '@/apollo/queries/index';

import { PortfolioCard } from '@/components/portfolios/index';
import { FlexLayout } from '@/components/layouts/index';
import API from '@/api/portfolios/portfolios';
import Redirect from '@/utils/preRender/preRenderRoute';
import { NextLink } from '@/components/parts/index';
import { PortfolioType } from '@/types/portfolios/portfolios';

const findIndexNum = (portfolioArray: PortfolioType[], id: string): number => {
  return portfolioArray.findIndex((portfolio) => portfolio._id === id);
};

// interface PortfoliosProps {
//   portfolios: PortfolioType[];
// }

const Portfolios: NextPage = () => {
  const [portfoliosState, setPortfoliosState] = useState<PortfolioType[]>([]);
  const [getPortfolio, { loading, data }] = useLazyQuery(GET_PORTFOLIOS);
  const [createPortfolio] = useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
      const data = cache.readQuery({
        query: GET_PORTFOLIOS
      }) as unknown as { portfolios: PortfolioType[] };
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: [...data.portfolios, createPortfolio] }
      });
    }
  });
  //  const onPortfolioCreated = (data: any) => {
  //   setPortfoliosState([...portfoliosState, data.createPortfolio]);
  // };
  // const [createPortfolio, { data: createData }] = useMutation(
  //   CREATE_PORTFOLIO,
  //   { onCompleted: onPortfolioCreated },
  // );

  useEffect(() => {
    getPortfolio();
  }, [getPortfolio]);

  if (
    data &&
    data.portfolios.length > 0 &&
    (portfoliosState.length === 0 ||
      portfoliosState.length !== data.portfolios.length)
  ) {
    setPortfoliosState(data.portfolios);
  }
  if (loading) return <h1>Loading...</h1>;

  // const createPortfolio = async () => {
  //   const createPortfolio: PortfolioType = await API.createPortfolio();
  //   setPortfoliosState([...portfoliosState, createPortfolio]);
  // };
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
      {JSON.stringify(portfoliosState)}
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

// export const getStaticProps = async () => {
//   try {
//     const portfolios: PortfolioType[] = await API.fetchPortfolios();
//     if (!portfolios) return Redirect.redirectHome;
//     return {
//       props: {
//         portfolios
//       },
//       revalidate: 600
//     };
//   } catch (error) {
//     console.error('error', error);
//     return Redirect.redirectHome;
//   }
// };

export default Portfolios;
