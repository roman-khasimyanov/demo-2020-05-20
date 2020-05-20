import React from 'react';
import { Network, Environment, RecordSource, Store, graphql } from 'relay-runtime';
import Router from './components/Router';
import { RelayEnvironmentProvider, preloadQuery } from 'react-relay/hooks';
import getFetch from './fetch';
import { AppQuery } from './__generated__/AppQuery.graphql';

const source = new RecordSource();
const store = new Store(source);
const environment = new Environment({
  network: Network.create(getFetch('http://localhost:4000/')),
  store,
});

export const query = graphql`
query AppQuery{
  posts {
    id
    title
    description
    ratings {
      user {
        id
        nickname
      }
    value
    }
  }
}
`

export const result = preloadQuery<AppQuery>(
  environment,
  query,
  {},
  { fetchPolicy: 'store-or-network' },
);

const App = () => {
  return (
    <div style={{ width: '800px', margin: '0 auto' }}>
      <RelayEnvironmentProvider environment={environment}>
        <Router />
      </RelayEnvironmentProvider>
    </div>
  );
}

export default App;
