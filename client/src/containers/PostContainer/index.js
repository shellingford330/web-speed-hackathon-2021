import React from 'react';

const LazyPostContainer = React.lazy(() => import('./PostContainer'));

export { LazyPostContainer as PostContainer };
