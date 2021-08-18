import { gql } from '@apollo/client';

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID) {
    portfolio(id: $id) {
      _id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const GET_PORTFOLIOS = gql`
  query Portfolios {
    portfolios {
      _id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;
export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio {
    createPortfolio(
      input: {
        title: "Work in USA(キャッシュ検証)"
        company: "WhoKnows"
        companyWebsite: "www.google.com"
        location: "USA, Montana"
        jobTitle: "Housekeeping"
        description: "So much responsibility....Overloaaaaaad"
        startDate: "01/01/2010"
        endDate: "01/01/2011"
      }
    ) {
      _id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio($id: ID) {
    updatePortfolio(
      id: $id
      input: {
        title: "Update in USA（キャッシュ更新の確認）"
        company: "Update"
        companyWebsite: "www.google.com"
        location: "Update, Montana"
        jobTitle: "Update"
        description: "So much responsibility....Overloaaaaaad"
        startDate: "01/01/2010"
        endDate: "01/01/2011"
      }
    ) {
      _id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const DELETE_PORTFOLIO = gql`
  mutation DeletePortfolio($id: ID) {
    deletePortfolio(id: $id)
  }
`;
