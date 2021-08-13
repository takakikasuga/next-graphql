import axios from 'axios';
import { API_ADDRESS } from '@/config/config';
import Query from '@/graphql/query/portfolios';

const PortfoliosAPI = {
  fetchPortfolios: async () => {
    const response = await axios.post(`${API_ADDRESS}/graphql`, {
      query: Query.portfoliosQuery
    });
    const portfolios = response.data.data.portfolios;
    return portfolios;
  },

  fetchPortfolio: async (id: string) => {
    const variables = { id };
    const response = await axios.post(`${API_ADDRESS}/graphql`, {
      query: Query.portfolioQuery,
      variables
    });
    const portfolio = response.data.data.portfolio;
    return portfolio;
  }
};

export default PortfoliosAPI;
