const PortfoliosQuery = {
  portfoliosQuery: `
    query Portfolios {
      portfolios {
        _id, title, company, companyWebsite, location, jobTitle, description, startDate, endDate
      }
    }`,
  portfolioQuery: `
    query Portfolio($id: ID) {
      portfolio(id :$id) {
        _id, title, company, companyWebsite, location, jobTitle, description, startDate, endDate
      }
    }`
};

export default PortfoliosQuery;
