const express = require('express');
const morgan = require('morgan');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
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

const data = {
  portfolios: [
    {
      _id: 'sad87daasdhjdjsb',
      title: 'Job in Netcentric',
      company: 'Netcentric',
      companyWebsite: 'www.google.com',
      location: 'Spain, Barcelona',
      jobTitle: 'Engineer',
      description: 'Doing something, programing....',
      startDate: '01/01/2014',
      endDate: '01/01/2016'
    },
    {
      _id: 'da789ad1',
      title: 'Job in Siemens',
      company: 'Siemens',
      companyWebsite: 'www.google.com',
      location: 'Slovakia, Kosice',
      jobTitle: 'Software Engineer',
      description: 'Responsoble for parsing framework for JSON medical data.',
      startDate: '01/01/2011',
      endDate: '01/01/2013'
    },
    {
      _id: 'sadcxv9',
      title: 'Work in USA',
      company: 'WhoKnows',
      companyWebsite: 'www.google.com',
      location: 'USA, Montana',
      jobTitle: 'Housekeeping',
      description: 'So much responsibility....Overloaaaaaad',
      startDate: '01/01/2010',
      endDate: '01/01/2011'
    }
  ]
};

const schema = buildSchema(`
  type Portfolio {
    _id: ID,
    title: String,
    company: String,
    companyWebsite: String,
    location: String,
    jobTitle: String,
    description: String,
    startDate: String,
    endDate: String
  }
  type Query {
    hello: String
    portfolio(id: ID): Portfolio
    portfolios: [Portfolio]
  }
`);
const root = {
  hello: () => {
    return 'Hello World!';
  },
  portfolio: ({ id }) => {
    const portfolio = data.portfolios.find((portfolio) => portfolio._id === id);
    return portfolio;
  },
  portfolios: () => {
    return data.portfolios;
  }
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
