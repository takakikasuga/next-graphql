import React, { FC } from 'react';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return <div className='container mx-auto px-4'>{children}</div>;
};

export default Wrapper;
