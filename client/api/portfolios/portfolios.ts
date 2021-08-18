import axios from 'axios';
import { API_ADDRESS, LOCALHOST_ADDRESS } from '@/config/index';
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
  },
  createPortfolio: async () => {
    console.log('createPortfolio');
    const response = await axios.post(`${LOCALHOST_ADDRESS}/graphql`, {
      query: Query.createPortfolioQuery
    });
    console.log('portfolio', response.data);
    const portfolio = response.data.data.createPortfolio;
    return portfolio;
  },
  updatePortfolio: async (id: string) => {
    console.log('updatePortfolio');
    const variables = { id };
    const response = await axios.post(`${LOCALHOST_ADDRESS}/graphql`, {
      query: Query.updatePortfolioQuery,
      variables
    });
    const portfolio = response.data.data.updatePortfolio;
    return portfolio;
  },
  deletePortfolio: async (id: string) => {
    console.log('deletePortfolio');
    const variables = { id };
    const response = await axios.post(`${LOCALHOST_ADDRESS}/graphql`, {
      query: Query.deletePortfolioQuery,
      variables
    });
    const deletedId = response.data.data.deletePortfolio;
    return deletedId;
  }
};

export default PortfoliosAPI;
