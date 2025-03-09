import React, { lazy, Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './index.css';
import { Route, Switch, useHistory } from "react-router-dom"; // Add useHistory
import { CurrentUserContextProvider } from "context/CurrentUserContext";
import { useCurrentUserContext } from "context/CurrentUserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./components/Main";
import Footer from "./components/Footer";



import { BrowserRouter } from "react-router-dom";



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
const InfoTooltip = lazy(() => import('auth/InfoTooltip').catch(() => {
    return { default: () => <div className='error'>Component InfoTooltip is not available!</div> };
}));
const ImagePopup = lazy(() => import('places/ImagePopup').catch(() => {
    return { default: () => <div className='error'>Component ImagePopup is not available!</div> };
}));
const PopupWithForm = lazy(() => import('context/PopupWithForm').catch(() => {
    return { default: () => <div className='error'>Component PopupWithForm is not available!</div> };
}));
const AddPlacePopup = lazy(() => import('places/AddPlacePopup').catch(() => {
    return { default: () => <div className='error'>Component AddPlacePopup is not available!</div> };
}));

const App = () => {

    const { isLoggedIn } = useCurrentUserContext();

    return (
        // <div className="container">
            <CurrentUserContextProvider>
                <div className="page__content">
                    <Suspense fallback={<div>Loading Header...</div>}>
                        <Header/>
                    </Suspense>
                    <Switch>
                        <ProtectedRoute
                            exact
                            path="/"
                            component={Main}
                            loggedIn={() =>isLoggedIn}
                        />
                        <Route path="/signup">
                            <Suspense fallback={<div>Loading Register...</div>}>
                                <Register/>
                            </Suspense>
                        </Route>
                        <Route path="/signin">
                            <Suspense fallback={<div>Loading Login...</div>}>
                                <Login />
                            </Suspense>
                        </Route>
                    </Switch>
                    <Footer />
                    <Suspense fallback={<div>Loading EditProfilePopup...</div>}>
                        <EditProfilePopup/>
                    </Suspense>
                    <Suspense fallback={<div>Loading AddPlacePopup...</div>}>
                        <AddPlacePopup/>
                    </Suspense>
                    <Suspense fallback={<div>Loading PopupWithForm...</div>}>
                        <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да"/>
                    </Suspense>
                    <Suspense fallback={<div>Loading EditAvatarPopup...</div>}>
                        <EditAvatarPopup/>
                    </Suspense>
                    <Suspense fallback={<div>Loading ImagePopup...</div>}>
                        <ImagePopup/>
                    </Suspense>
                    <Suspense fallback={<div>Loading InfoTooltip...</div>}>
                        <InfoTooltip/>
                    </Suspense>
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