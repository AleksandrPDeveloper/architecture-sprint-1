import React from 'react';
import SuccessIcon from '../images/success-icon.svg';
import ErrorIcon from '../images/error-icon.svg';
import { useCurrentUserContext } from "context/CurrentUserContext";
import '../blocks/popup/popup.css'

export default function InfoTooltip({onClose}) {
  const {setIsInfoToolTipOpen, tooltipStatus} = useCurrentUserContext();

  const icon = tooltipStatus === 'success' ? SuccessIcon : ErrorIcon
  const text = tooltipStatus === 'success' ? "Вы успешно зарегистрировались" :
     "Что-то пошло не так! Попробуйте ещё раз."
  return (
    <div className={`popup ${ {setIsInfoToolTipOpen} && 'popup_is-opened'}`}>
      <div className="popup__content">
        <form className="popup__form" noValidate>
          <button type="button" className="popup__close" onClick={onClose}></button>
            <div>
              <img className="popup__icon" src={icon} alt=""/>
              <p className="popup__status-message">{text}</p>
            </div>
        </form>
      </div>
    </div>
  );
}

 