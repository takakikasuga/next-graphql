import React, { FC } from 'react';
import Image from 'next/image';

import { PortfolioType } from '@/types/portfolios/portfolios';

interface PortfolioCardProps {
  portfolio: PortfolioType;
}

const PortfolioCard: FC<PortfolioCardProps> = ({ portfolio }) => {
  return (
    <div className='max-w-xs rounded overflow-hidden shadow-lg my-2 mx-auto'>
      {/* <Image
        className='w-full'
        src='https://tailwindcss.com/img/card-top.jpg'
        alt='Sunset in the mountains'
      /> */}
      <div className='px-6 py-4'>
        <h5 className='font-bold text-xl mb-2'>{portfolio.title}</h5>
        <h6 className='font-bold text-xl mb-2'>{portfolio.jobTitle}</h6>
        <p className='text-grey-darker text-base'>{portfolio.description}</p>
      </div>
      <div className='px-6 py-4'>
        <span className='inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2'>
          {portfolio.startDate} - {portfolio.endDate}
        </span>
        <span className='inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2'></span>
        <span className='inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker'>
          #winter
        </span>
      </div>
    </div>
  );
};

export default PortfolioCard;
