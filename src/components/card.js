// Темплейт карточки

import { deleteCardServer, disLikeCardServer, likeCardServer } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки

function createCard(card, deleteCard, likeCard, previewCardImage, cardId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    cardElement.querySelector('.card__title').textContent = card.name;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');

    if(cardId !== card.owner._id) {
        deleteButton.style.display = 'none';
    } else {
        deleteButton.style.display = 'block';
    }
    
    deleteButton.addEventListener('click', () => deleteCard(card._id, cardElement));

    const likeButton = cardElement.querySelector('.card__like-button')
    likeButton.addEventListener('click', () => likeCard(card._id, likeButton));

    const likeCountElement = likeButton.querySelector('.card__like-count')
    likeCountElement.textContent = card.likes.length; 

    const isLiked = card.likes.some(user => user._id === cardId);
    if(isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }

    cardImage.addEventListener('click', () => {
        previewCardImage(cardImage.src, cardImage.alt);
    });

    return cardElement;
};

// Функция удаления карточки

function deleteCard(cardId, card) {
    deleteCardServer(cardId)
    .then(() => {
        card.remove()
    })
};

// Функция лайка карточки

function likeCard(cardId, likeButton) {
    const isLiked = checkLikeCard(likeButton);
    
    if(isLiked) {
        disLikeCardServer(cardId)
        .then((res) => {
            updateLike(likeButton, res.likes.length);
        })
        .catch((err) => {
            console.error = `Ошибка при снятии лайка: ${err}`;
        })
    } else {
        likeCardServer(cardId)
        .then((res) => {
            updateLike(likeButton, res.likes.length);
        })
        .catch((err) => {
            console.error = `Ошибка при постановке лайка: ${err}`;
        })
    }
}

function checkLikeCard(likeButton) {
    return likeButton.classList.contains('card__like-button_is-active');
}

function updateLike(likeButton, likeCount) {
    likeButton.classList.toggle('card__like-button_is-active');

    const likeCountElement = likeButton.querySelector('.card__like-count');

    likeCountElement.textContent = likeCount;
}

export { createCard, deleteCard, likeCard };