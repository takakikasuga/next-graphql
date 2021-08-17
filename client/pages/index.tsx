import { Fragment } from 'react';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  console.log('typeof window === undefined', typeof window === 'undefined');
  console.log('typeof window', typeof window);
  return (
    <Fragment>
      <h1>Hello world!!</h1>
    </Fragment>
  );
};

export default Home;
