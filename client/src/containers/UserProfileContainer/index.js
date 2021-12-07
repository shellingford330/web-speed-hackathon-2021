import React from 'react';

const LazyUserProfileContainer = React.lazy(() => import('./UserProfileContainer'))

export { LazyUserProfileContainer as UserProfileContainer };
