const express = require('express');
const morgan = require('morgan');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const { portfolioTypes } = require('./graphql/types/index');
const { portfolioResolvers } = require('./graphql/resolvers/index');
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

const schema = buildSchema(`
 ${portfolioTypes}

  type Query {
    hello: String
    portfolio(id: ID): Portfolio
    portfolios: [Portfolio]
  }
`);
const root = {
  ...portfolioResolvers
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

console.log('process.env.API_PORT', process.env.API_PORT);
const PORT = process.env.API_PORT || 8000;

app.get('*', (req, res) => {
  res.send('接続確認テスト');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
