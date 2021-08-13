// pages/_app.js
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar, Footer } from '@/components/commons/index';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Navbar>
      <Footer>
        <Component {...pageProps} />
      </Footer>
    </Navbar>
  );
}
export default MyApp;
