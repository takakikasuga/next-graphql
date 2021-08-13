const PortfoliosQuery = {
  portfoliosQuery: `
    query Portfolios {
      portfolios {
        _id, title, company, companyWebsite, location, jobTitle, description, startDate, endDate
      }
    }`
};

export default PortfoliosQuery;
