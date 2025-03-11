import React, {useEffect, useState} from "react";
import api from "../utils/api";
import { useCurrentUserContext } from 'context/CurrentUserContext';
import Card from "./Card";
import '../blocks/places/places.css'
import '../blocks/page/__section/page__section.css'

export default function Places() {
  const { cards, setCards } = useCurrentUserContext();
    // Fetch app info on mount
    useEffect(() => {
        api
            .getCardList()
            .then((cardData) => {
                setCards(cardData);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <section className="places page__section">
            <ul className="places__list">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                    />
                ))}
            </ul>
        </section>
    );
}