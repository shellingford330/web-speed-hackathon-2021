import React from 'react';

const LazyNewPostModalContainer = React.lazy(() => import('./NewPostModalContainer'))

export { LazyNewPostModalContainer as NewPostModalContainer };
