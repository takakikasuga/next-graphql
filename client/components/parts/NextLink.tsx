import React, { FC } from 'react';
import Link from 'next/link';

interface NextLink {
  children: string | Element | React.ReactNode;
  href: string;
  className: string;
}

const NextLink: FC<NextLink> = ({ children, href, className }) => {
  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default NextLink;
