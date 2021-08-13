import React, { FC } from 'react';

interface FooterProps {
  children: React.ReactNode;
}

const Footer: FC<FooterProps> = ({ children }) => {
  return (
    <>
      {children}
      <div>Footerです。</div>
    </>
  );
};

export default Footer;
