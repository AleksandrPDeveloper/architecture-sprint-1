import React from 'react';
import { createContext, useState, useContext } from 'react';

const CurrentUserContext = React.createContext({
    currentUser: {}
});

export const CurrentUserContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = React.useState({});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser, isEditProfilePopupOpen, setIsEditProfilePopupOpen, isEditAvatarPopupOpen, setIsEditAvatarPopupOpen}}>
            {children}
        </CurrentUserContext.Provider>
    );
};
export const useCurrentUserContext = () => useContext(CurrentUserContext);