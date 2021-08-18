// pages/_app.js
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar, Footer } from '@/components/commons/index';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
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
