import React from 'react';
import { createContext, useState, useContext } from 'react';

const CurrentUserContext = React.createContext({
    currentUser: {},
    // setCurrentUser: () => {},
    // cards: [],
    // setCards: () => {},
});

export const CurrentUserContextProvider = ({ children }) => {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
    const [tooltipStatus, setTooltipStatus] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <CurrentUserContext.Provider value={{
            currentUser,
            setCurrentUser,
            isEditProfilePopupOpen,
            setIsEditProfilePopupOpen,
            isEditAvatarPopupOpen,
            setIsEditAvatarPopupOpen,
            isAddPlacePopupOpen,
            setIsAddPlacePopupOpen,
            selectedCard,
            setSelectedCard,
            cards,
            setCards,
            isInfoToolTipOpen,
            setIsInfoToolTipOpen,
            tooltipStatus,
            setTooltipStatus,
            isLoggedIn,
            setIsLoggedIn
        }}>
            {children}
        </CurrentUserContext.Provider>
    );
};
export const useCurrentUserContext = () => useContext(CurrentUserContext);