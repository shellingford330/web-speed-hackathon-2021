import React from 'react';
import { Helmet } from 'react-helmet';
import { useQueryClient } from 'react-query';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { AuthModalContainer } from '../AuthModalContainer';
import { NewPostModalContainer } from '../NewPostModalContainer';
import { NotFoundContainer } from '../NotFoundContainer';
import { PostContainer } from '../PostContainer';
import { TermContainer } from '../TermContainer';
import { TimelineContainer } from '../TimelineContainer';
import { UserProfileContainer } from '../UserProfileContainer';

/** @type {React.VFC} */
const AppContainer = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { data: activeUser, isLoading } = useFetch('/api/v1/me', fetchJSON);
  const queryClient = useQueryClient()
  const handleUpdateActiveUser = React.useCallback(() => {
    queryClient.invalidateQueries('/api/v1/me');
  }, [queryClient]);

  const [modalType, setModalType] = React.useState('none');
  const handleRequestOpenAuthModal = React.useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = React.useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = React.useCallback(() => setModalType('none'), []);

  if (isLoading) {
    return (
      <Helmet>
        <title>読込中 - CAwitter</title>
      </Helmet>
    );
  }

  return (
    <>
      <AppPage
        activeUser={activeUser}
        onRequestOpenAuthModal={handleRequestOpenAuthModal}
        onRequestOpenPostModal={handleRequestOpenPostModal}
      >
        <Routes>
          <Route element={<React.Suspense fallback={null}><TimelineContainer /></React.Suspense>} path="/" />
          <Route element={<React.Suspense fallback={null}><UserProfileContainer /></React.Suspense>} path="/users/:username" />
          <Route element={<React.Suspense fallback={null}><PostContainer /></React.Suspense>} path="/posts/:postId" />
          <Route element={<React.Suspense fallback={null}><TermContainer /></React.Suspense>} path="/terms" />
          <Route element={<React.Suspense fallback={null}><NotFoundContainer /></React.Suspense>} path="*" />
        </Routes>
      </AppPage>

      {modalType === 'auth' ? (
        <React.Suspense fallback={null}><AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={handleUpdateActiveUser} /></React.Suspense>
      ) : null}
      {modalType === 'post' ? <React.Suspense fallback={null}><NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} /></React.Suspense> : null}
    </>
  );
};

export { AppContainer };
