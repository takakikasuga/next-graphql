const crypto = require('crypto');
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

exports.portfolioQueries = {
  hello: () => {
    return 'Hello World!';
  },
  portfolio: (root, { id }, context, info) => {
    console.log('context', context);
    // console.log('info', info);
    console.log('root', root);
    const portfolio = data.portfolios.find((portfolio) => portfolio._id === id);

    return portfolio;
  },
  portfolios: () => {
    console.log('typeof window === undefined', typeof window === 'undefined');
    console.log('typeof window', typeof window);
    return data.portfolios;
  }
};

exports.portfolioMutations = {
  createPortfolio: (root, { input }) => {
    console.log('root', root);
    const _id = crypto.randomBytes(10).toString('hex');
    const newPortfolio = { ...input };
    newPortfolio._id = _id;
    data.portfolios.push(newPortfolio);
    return newPortfolio;
  },
  updatePortfolio: (root, { id, input }) => {
    console.log('root', root);
    const index = data.portfolios.findIndex(
      (portfolio) => portfolio._id === id
    );
    const oldPortfolio = data.portfolios[index];
    const newPortfolio = { ...oldPortfolio, ...input };
    data.portfolios[index] = newPortfolio;
    return newPortfolio;
  },
  deletePortfolio: (root, { id }) => {
    console.log('root', root);
    console.log('id', id);
    const index = data.portfolios.findIndex(
      (portfolio) => portfolio._id === id
    );
    data.portfolios.splice(index, 1);
    return id;
  }
};
