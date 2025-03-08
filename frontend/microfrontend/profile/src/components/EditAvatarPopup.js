import React, {lazy, Suspense, useState, useEffect} from "react";
import PopupWithForm from './PopupWithForm';
import api from "../utils/api";
import {useCurrentUserContext } from 'context/CurrentUserContext';

export default function EditAvatarPopup() {
    const inputRef = React.useRef();
    const {setCurrentUser, isEditAvatarPopupOpen, setIsEditAvatarPopupOpen} = useCurrentUserContext();

    function handleSubmit(e) {
        e.preventDefault();

        handleUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }

    function onClose (){
        setIsEditAvatarPopupOpen(false);
    }

    function handleUpdateAvatar(avatarUpdate) {
        api
            .setUserAvatar(avatarUpdate)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                onClose();
            })
            .catch((err) => console.log(err));
    }

    return (<PopupWithForm
            isOpen={isEditAvatarPopupOpen} onSubmit={handleSubmit} onClose={onClose} title="Обновить аватар" name="edit-avatar">
            <label className="popup__label">
                <input type="url" name="avatar" id="owner-avatar"
                       className="popup__input popup__input_type_description" placeholder="Ссылка на изображение"
                       required ref={inputRef}/>
                <span className="popup__error" id="owner-avatar-error"></span>
            </label>
        </PopupWithForm>);
}
