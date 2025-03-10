import React, {lazy, Suspense, useState, useEffect} from "react";
import { useCurrentUserContext } from 'context/CurrentUserContext';
import api from "../utils/api";

const PopupWithForm = lazy(() => import('context/PopupWithForm').catch(() => {
  return { default: () => <div className='error'>Component PopupWithForm is not available!</div> };
}));

export default function AddPlacePopup() {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const { setCards, setIsAddPlacePopupOpen, setSelectedCard, cards, isAddPlacePopupOpen} = useCurrentUserContext();

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function onAddPlace(newCard) {
    api
        .addCard(newCard)
        .then((newCardFull) => {
          setCards([newCardFull, ...cards]);
          setIsAddPlacePopupOpen(false);
          setSelectedCard(null);
        })
        .catch((err) => console.log(err));
  }

  function onClose() {
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link
    });
  }

  return (
      <Suspense fallback={<div>Загрузка...</div>}>
        <PopupWithForm
            isOpen={isAddPlacePopupOpen} onSubmit={handleSubmit} onClose={onClose} title="Новое место" name="new-card"
        >
          <label className="popup__label">
            <input type="text" name="name" id="place-name"
                   className="popup__input popup__input_type_card-name" placeholder="Название"
                   required minLength="1" maxLength="30" value={name} onChange={handleNameChange}/>
            <span className="popup__error" id="place-name-error"></span>
          </label>
          <label className="popup__label">
            <input type="url" name="link" id="place-link"
                   className="popup__input popup__input_type_url" placeholder="Ссылка на картинку"
                   required value={link} onChange={handleLinkChange}/>
            <span className="popup__error" id="place-link-error"></span>
          </label>
        </PopupWithForm>
      </Suspense>
  );
}
