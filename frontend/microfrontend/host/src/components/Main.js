import React, {lazy, Suspense} from 'react';
import Card from './Card';

const ProfileInfo = lazy(() => import('profile/ProfileInfo').catch(() => {
    return { default: () => <div className='error'>Component ProfileInfo is not available!</div> };
}));

function Main({ cards, onAddPlace, onCardClick, onCardLike, onCardDelete }) {

  return (
      <main className="content">
          <Suspense fallback={<div>Loading ProfileInfo...</div>}>
              <ProfileInfo onAddPlace = {onAddPlace} />
          </Suspense>
          <section className="places page__section">
              <ul className="places__list">
                  {cards.map((card) => (
                      <Card
                          key={card._id}
                          card={card}
                          onCardClick={onCardClick}
                          onCardLike={onCardLike}
                          onCardDelete={onCardDelete}
                      />
                  ))}
              </ul>
          </section>
      </main>
  );
}

export default Main;
