import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AppContainer } from './containers/AppContainer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  }
})

window.addEventListener('load', () => {
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </QueryClientProvider>,
    document.getElementById('app'),
  );
});
