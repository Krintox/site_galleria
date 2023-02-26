import { ApolloClient, InMemoryCache } from '@apollo/client';

const GITHUB_API_ENDPOINT = 'https://api.github.com/graphql';
const GITHUB_PERSONAL_ACCESS_TOKEN = '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';

const client = new ApolloClient({
  uri: GITHUB_API_ENDPOINT,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

export default client;