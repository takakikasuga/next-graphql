import { PortfolioType } from '@/types/portfolios/portfolios';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_PORTFOLIOS,
  CREATE_PORTFOLIO,
  UPDATE_PORTFOLIO,
  DELETE_PORTFOLIO
} from '@/apollo/queries/index';

export const useGetPortfolio = () => useQuery(GET_PORTFOLIOS);
export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);
export const useCreatePortfolio = () =>
  useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
      console.log(cache);
      const { portfolios } = cache.readQuery({
        query: GET_PORTFOLIOS
      }) as unknown as { portfolios: PortfolioType[] };
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: [...portfolios, createPortfolio] }
      });
    }
  });
export const useDeletePortfolio = () =>
  useMutation(DELETE_PORTFOLIO, {
    update(cache, { data: { deletePortfolio } }) {
      const { portfolios } = cache.readQuery({
        query: GET_PORTFOLIOS
      }) as unknown as { portfolios: PortfolioType[] };
      const newPortfolios = portfolios.filter(
        (portfolio) => portfolio._id !== deletePortfolio
      );
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: newPortfolios }
      });
    }
  });
