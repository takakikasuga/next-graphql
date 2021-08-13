import axios from 'axios';
import { API_ADDRESS } from '@/config/config';
import Query from '@/graphql/query/portfolios';

const PortfoliosAPI = {
  fetchPortfolios: async () => {
    console.log(`${API_ADDRESS}/graphql`);
    console.log('Query.portfoliosQuery', Query.portfoliosQuery);
    return axios
      .post(`${API_ADDRESS}/graphql`, { query: Query.portfoliosQuery })
      .then((res) => {
        return res.data.data;
      })
      .then((data) => {
        return data.portfolios;
      })
      .then((portfolios) => {
        return portfolios;
      });
  }
};

export default PortfoliosAPI;
