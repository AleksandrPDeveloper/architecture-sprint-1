import React, {lazy, Suspense} from 'react';

const ProfileInfo = lazy(() => import('profile/ProfileInfo').catch(() => {
    return { default: () => <div className='error'>Component ProfileInfo is not available!</div> };
}));

const Places = lazy(() => import('places/Places').catch(() => {
    return { default: () => <div className='error'>Component Places is not available!</div> };
}));

function Main() {
  return (
      <main className="content">
          <Suspense fallback={<div>Loading ProfileInfo...</div>}>
              <ProfileInfo/>
          </Suspense>
          <Suspense fallback={<div>Loading ProfileInfo...</div>}>
              <Places/>
          </Suspense>
      </main>
  );
}

export default Main;
