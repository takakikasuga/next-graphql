const PortfoliosQuery = {
  portfoliosQuery: `
    query Portfolios {
      portfolios {
        _id,
       title,
       company,
       companyWebsite,
       location,
       jobTitle,
       description,
       startDate,
       endDate,
      }
    }`,
  portfolioQuery: `
    query Portfolio($id: ID) {
      portfolio(id :$id) {
        _id,
        title,
        company,
        companyWebsite,
        location,
        jobTitle,
        description,
        startDate,
        endDate,
      }
    }`,
  createPortfolioQuery: `
    mutation CreatePortfolio {
      createPortfolio(input: {
        title: "Work in USA",
        company: "WhoKnows",
        companyWebsite: "www.google.com",
        location: "USA, Montana",
        jobTitle: "Housekeeping",
        description: "So much responsibility....Overloaaaaaad",
        startDate: "01/01/2010",
        endDate: "01/01/2011",
      }) {
       _id,
        title,
        company,
        companyWebsite,
        location,
        jobTitle,
        description,
        startDate,
        endDate,
      }
    }
  `,
  updatePortfolioQuery: `
    mutation UpdatePortfolio($id: ID) {
      updatePortfolio(id: $id, input: {
        title: "Update in USA",
        company: "Update",
        companyWebsite: "www.google.com",
        location: "Update, Montana",
        jobTitle: "Update",
        description: "So much responsibility....Overloaaaaaad",
        startDate: "01/01/2010",
        endDate: "01/01/2011",
      }) {
        _id,
        title,
        company,
        companyWebsite,
        location,
        jobTitle,
        description,
        startDate,
        endDate,
      }
    }
  `,
  deletePortfolioQuery: `
    mutation DeletePortfolio($id: ID) {
      deletePortfolio(id: $id)
    }
  `
};

export default PortfoliosQuery;
