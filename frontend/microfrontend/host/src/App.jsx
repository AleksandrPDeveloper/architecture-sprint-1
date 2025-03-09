import React, { lazy, Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './index.css';
import { Route, Switch, useHistory } from "react-router-dom"; // Add useHistory
import api from "./utils/api";
import { CurrentUserContextProvider } from "context/CurrentUserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./components/Main";
import Footer from "./components/Footer";

import AddPlacePopup from "./components/AddPlacePopup";


import ImagePopup from "./components/ImagePopup";
// import InfoTooltip from "./components/InfoTooltip";
import { BrowserRouter } from "react-router-dom";
// import PopupWithForm from "./components/PopupWithForm";


const Header = lazy(() => import('auth/Header').catch(() => {
    return { default: () => <div className='error'>Component Header is not available!</div> };
}));
const Login = lazy(() => import('auth/Login').catch(() => {
    return { default: () => <div className='error'>Component Login is not available!</div> };
}));
const Register = lazy(() => import('auth/Register').catch(() => {
    return { default: () => <div className='error'>Component Register is not available!</div> };
}));
const EditAvatarPopup = lazy(() => import('profile/EditAvatarPopup').catch(() => {
    return { default: () => <div className='error'>Component EditAvatarPopup is not available!</div> };
}));
const EditProfilePopup = lazy(() => import('profile/EditProfilePopup').catch(() => {
    return { default: () => <div className='error'>Component EditProfilePopup is not available!</div> };
}));
// const InfoTooltip = lazy(() => import('auth/InfoTooltip').catch(() => {
//     return { default: () => <div className='error'>Component InfoTooltip is not available!</div> };
// }));

const App = () => {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
    const [tooltipStatus, setTooltipStatus] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Fetch app info on mount
    useEffect(() => {
        api
            .getAppInfo()
            .then(([cardData, userData]) => {
                setCurrentUser(userData);
                setCards(cardData);
            })
            .catch((err) => console.log(err));
    }, []);

    // Event handlers
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoToolTipOpen(false);
        setSelectedCard(null);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(userUpdate) {
        api
            .setUserInfo(userUpdate)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(avatarUpdate) {
        api
            .setUserAvatar(avatarUpdate)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((cards) =>
                    cards.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
        api
            .removeCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(newCard) {
        api
            .addCard(newCard)
            .then((newCardFull) => {
                setCards([newCardFull, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    return (
        // <div className="container">

            <CurrentUserContextProvider>
                <div className="page__content">
                    <Suspense fallback={<div>Loading Header...</div>}>
                        <Header setIsLoggedIn={setIsLoggedIn}
                        />
                    </Suspense>
                    <Switch>
                        <ProtectedRoute
                            exact
                            path="/"
                            component={Main}
                            cards={cards}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            loggedIn={isLoggedIn}
                        />
                        <Route path="/signup">
                            <Suspense fallback={<div>Loading Register...</div>}>
                                <Register setTooltipStatus={setTooltipStatus}
                                          setIsInfoToolTipOpen={setIsInfoToolTipOpen}/>
                            </Suspense>
                        </Route>
                        <Route path="/signin">
                            <Suspense fallback={<div>Loading Login...</div>}>
                                <Login setIsLoggedIn={setIsLoggedIn}
                                       setTooltipStatus={setTooltipStatus}
                                       setIsInfoToolTipOpen={setIsInfoToolTipOpen}/>
                            </Suspense>
                        </Route>
                    </Switch>
                    <Footer />
                    <Suspense fallback={<div>Loading EditProfilePopup...</div>}>
                        <EditProfilePopup
                            isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                        />
                    </Suspense>
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onAddPlace={handleAddPlaceSubmit}
                        onClose={closeAllPopups}
                    />
                    {/*<PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да"/>*/}
                    <Suspense fallback={<div>Loading EditAvatarPopup...</div>}>
                        <EditAvatarPopup
                            isOpen={isEditAvatarPopupOpen}
                            onClose={closeAllPopups}
                        />
                    </Suspense>
                    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
                    {/*<Suspense fallback={<div>Loading InfoTooltip...</div>}>*/}
                    {/*    <InfoTooltip*/}
                    {/*        isOpen={isInfoToolTipOpen}*/}
                    {/*        onClose={closeAllPopups}*/}
                    {/*        status={tooltipStatus}*/}
                    {/*    />*/}
                    {/*</Suspense>*/}
                </div>
            </CurrentUserContextProvider>
        // </div>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('app')
);