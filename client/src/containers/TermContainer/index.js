import React from 'react';

const LazyTermContainer = React.lazy(() => import('./TermContainer'))

export { LazyTermContainer as TermContainer };
