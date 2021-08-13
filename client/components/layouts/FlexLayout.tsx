import React, { FC } from 'react';

interface FlexLayoutProps {
  children: React.ReactNode;
}

const FlexLayout: FC<FlexLayoutProps> = ({ children }) => {
  return (
    <div className='flex justify-evenly justify-items-center flex-wrap'>
      {children}
    </div>
  );
};

export default FlexLayout;
