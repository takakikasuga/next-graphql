export interface PortfoliosType {
  portfolios: {
    _id: string;
    title: string;
    company: string;
    companyWebsite: string;
    location: string;
    jobTitle: string;
    description: string;
    startDate: string;
    endDate: string;
  }[];
}

export interface PortfolioType {
  portfolio: {
    _id: string;
    title: string;
    company: string;
    companyWebsite: string;
    location: string;
    jobTitle: string;
    description: string;
    startDate: string;
    endDate: string;
  };
}
