const express = require('express');
const morgan = require('morgan');
// const { graphqlHTTP } = require('express-graphql');
// const { buildSchema } = require('graphql');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const { portfolioTypes } = require('./graphql/types/index');
const {
  portfolioQueries,
  portfolioMutations
} = require('./graphql/resolvers/index');
const CORS_PORT = process.env.CORS_PORT || 3000;
const CORS_ADDRESS = `http://localhost:${CORS_PORT}`;
const app = express();

// リクエストの種類をログで出力する
app.use(morgan('dev'));

// リクエスト本体のデータを受け取る
app.use(express.json({ extended: false }));
const corsOption = {
  origin: CORS_ADDRESS
};

app.use(cors({ corsOption }));

const typeDefs = gql`
  ${portfolioTypes}

  type Query {
    hello: String
    portfolio(id: ID): Portfolio
    portfolios: [Portfolio]
  }

  type Mutation {
    createPortfolio(input: PortfolioInput): Portfolio
  }
`;
const resolvers = {
  Query: {
    ...portfolioQueries
  },
  Mutation: {
    ...portfolioMutations
  }
};

const startServer = async () => {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
};
startServer();

// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema,
//     rootValue: root,
//     graphiql: true
//   })
// );

console.log('process.env.API_PORT', process.env.API_PORT);
const PORT = process.env.API_PORT || 8000;

app.get('*', (req, res) => {
  res.send('接続確認テスト');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
