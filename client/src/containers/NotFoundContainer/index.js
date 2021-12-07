import React from 'react';

const LazyNotFoundContainer = React.lazy(() => import('./NotFoundContainer'))

export { LazyNotFoundContainer as NotFoundContainer };
