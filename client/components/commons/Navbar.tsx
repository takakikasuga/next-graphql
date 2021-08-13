import React, { FC, Fragment } from 'react';

import { Container } from './index';
import { NextLink } from '../parts/index';

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar: FC<NavbarProps> = ({ children }) => {
  return (
    <Fragment>
      <header>
        <Container>
          <ul className='flex'>
            <li className='mr-6'>
              <NextLink href='/' className='primary-btn block'>
                ポートフォリオ
              </NextLink>
            </li>
            <li className='mr-6'>
              <NextLink href='/forum/categories' className='primary-btn block'>
                フォーラム
              </NextLink>
            </li>
            <li className='mr-6'>
              <NextLink href='/contact' className='primary-btn block'>
                お問い合わせ
              </NextLink>
            </li>
            <li className='mr-6'>
              <NextLink href='/register' className='primary-btn block'>
                新規登録
              </NextLink>
            </li>
            <li className='mr-6'>
              <NextLink href='/login' className='primary-btn block'>
                ログイン
              </NextLink>
            </li>
          </ul>
        </Container>
      </header>
      {children}
    </Fragment>
  );
};

export default Navbar;
