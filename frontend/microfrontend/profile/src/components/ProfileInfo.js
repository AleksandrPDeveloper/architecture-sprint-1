import React, {useEffect, useState} from "react";
import '../blocks/profile/profile.css'
import api from "../utils/api";
import {useCurrentUserContext } from 'context/CurrentUserContext';

export default function ProfileInfo() {

    const {
        currentUser,
        setCurrentUser,
        setIsEditProfilePopupOpen,
        setIsEditAvatarPopupOpen,
        setIsAddPlacePopupOpen} = useCurrentUserContext();
    const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    useEffect(() => {
        api
            .getUserInfo()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <section className="profile page__section">
            <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
            <div className="profile__info">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
                <p className="profile__description">{currentUser.about}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
        </section>);
}