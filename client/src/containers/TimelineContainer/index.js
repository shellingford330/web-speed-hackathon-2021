import React from 'react';

const LazyTimelineContainer = React.lazy(() => import('./TimelineContainer'))

export { LazyTimelineContainer as TimelineContainer };
