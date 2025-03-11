import React, { useState } from "react";
import {Route, Link, useHistory} from 'react-router-dom';
import logoPath from '../images/logo.svg';
import '../blocks/header/header.css';
import * as auth from "../utils/auth";
import '../blocks/page/__section/page__section.css'
import { useCurrentUserContext } from "context/CurrentUserContext";

// В корневом компоненте App описаны обработчики: onRegister, onLogin и onSignOut. Эти обработчики переданы в соответствующие компоненты: Register.js, Login.js, Header.js
export default function Header({}) {
    const {setIsLoggedIn} = useCurrentUserContext();
    const history = useHistory();
    const [email, setEmail] = useState("");
    function onSignOut() {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        history.push("/signin");
    }

    function handleSignOut() {
        onSignOut();
    }

    React.useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            auth
                .checkToken(token)
                .then((res) => {
                    setEmail(res.data.email);
                    setIsLoggedIn(true);
                    history.push("/");
                })
                .catch((err) => {
                    localStorage.removeItem("jwt");
                    console.log(err);
                });
        }
    }, [history]);

    return (
        <header className="header page__section">
            <img src={logoPath} alt="Логотип проекта Mesto" className="logo header__logo"/>
            <Route exact path="/">
                <div className="header__wrapper">
                    <p className="header__user">{email}</p>
                    <button className="header__logout" onClick={handleSignOut}>Выйти</button>
                </div>
            </Route>
            <Route path="/signup">
                <Link className="header__auth-link" to="signin">Войти</Link>
            </Route>
            <Route path="/signin">
                <Link className="header__auth-link" to="signup">Регистрация</Link>
            </Route>
        </header>
    )
}
