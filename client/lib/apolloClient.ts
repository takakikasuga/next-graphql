import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { API_ADDRESS, LOCALHOST_ADDRESS } from '@/config/config';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: any;

function createApolloClient(endpoint: string = `${LOCALHOST_ADDRESS}/graphql`) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: endpoint, // Server URL (must be absolute)
      credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination()
          }
        }
      }
    })
  });
}

export function initializeApollo(initialState = null) {
  // console.log('initializeApollo', process.browser);
  // console.log('createApolloClient()', createApolloClient());
  // console.log(
  //   'createApolloClient(`${API_ADDRESS}/graphql',
  //   createApolloClient(`${API_ADDRESS}/graphql`)
  // );
  console.log('apolloClient', apolloClient);
  const _apolloClient =
    apolloClient ?? process.browser
      ? createApolloClient()
      : createApolloClient(`${API_ADDRESS}/graphql`);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // console.log('existingCache', existingCache);
    // console.log('initialState', initialState);
    console.log('existingCache', existingCache);
    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        )
      ]
    });
    // console.log('data', data);
    // Restore the cache with the merged data
    // console.log('_apolloClient.cache（before）', _apolloClient.cache);
    _apolloClient.cache.restore(data);
    // console.log('_apolloClient.cache（after）', _apolloClient.cache);
  }
  // For SSG and SSR always create a new Apollo Client
  console.log('_apolloClient', _apolloClient);
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  // console.log('apolloClient', apolloClient);
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client: any, pageProps: any) {
  console.log('addApolloState（client）before', client);
  console.log('addApolloState（pageProps）before', pageProps);

  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }
  console.log('addApolloState（client）after', client);
  console.log('addApolloState（pageProps）after', pageProps);
  return pageProps;
}

export function useApollo(pageProps: any) {
  // 「useApollo（pageProps）」にはportfoliosと__APOLLO_STATE__のオブジェクトが格納されている
  // console.log('useApollo（pageProps）', pageProps);
  // pagePropsのAPOLLO_STATE_PROP_NAME（__APOLLO_STATE__）のキーにアクセス;
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  // console.log('useApollo（state）', state);
  const store = useMemo(() => initializeApollo(state), [state]);
  // console.log('useApollo（store）', store);
  return store;
}
