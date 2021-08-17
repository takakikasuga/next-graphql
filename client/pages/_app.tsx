// pages/_app.js
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar, Footer } from '@/components/commons/index';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/lib/apolloClient';

function MyApp({ Component, pageProps }: AppProps) {
  console.log('Component', Component);
  console.log('pageProps', pageProps);
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Navbar>
        <Footer>
          <Component {...pageProps} />
        </Footer>
      </Navbar>
    </ApolloProvider>
  );
}
export default MyApp;
