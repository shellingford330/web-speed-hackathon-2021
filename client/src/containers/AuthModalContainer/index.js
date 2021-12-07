import React from 'react';

const LazyAuthModalContainer = React.lazy(() => import('./AuthModalContainer'))

export { LazyAuthModalContainer as AuthModalContainer };
