// pages/_app.js
import '../styles/globals.css';
import { LOCALHOST_ADDRESS } from '@/config/config';
import type { AppProps } from 'next/app';
import { Navbar, Footer } from '@/components/commons/index';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: `${LOCALHOST_ADDRESS}/graphql`,
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Navbar>
        <Footer>
          <Component {...pageProps} />
        </Footer>
      </Navbar>
    </ApolloProvider>
  );
}
export default MyApp;
