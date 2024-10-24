// Темплейт карточки

import { deleteCardServer, disLikeCardServer, likeCardServer } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки

function createCard(card, deleteCard, likeCard, previewCardImage, userId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    cardElement.querySelector('.card__title').textContent = card.name;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');

    if(userId !== card.owner._id) {
        deleteButton.style.display = 'none';
    } else {
        deleteButton.style.display = 'block';
    }
    
    deleteButton.addEventListener('click', () => deleteCard(card._id, cardElement));

    const likeButton = cardElement.querySelector('.card__like-button')
    likeButton.addEventListener('click', () => likeCard(card._id, likeButton));

    const likeCountElement = likeButton.querySelector('.card__like-count')
    likeCountElement.textContent = card.likes.length; 

    const isLiked = card.likes.some(user => user._id === userId);
    if(isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }

    cardImage.addEventListener('click', () => {
        previewCardImage(cardImage.src, cardImage.alt);
    });

    return cardElement;
};

// Функция удаления карточки

function deleteCard(userId, card) {
    deleteCardServer(userId)
    .then(() => {
        card.remove()
    })
    .catch((err) => {
        console.error(`Ошибка при удалении карточки: ${err}`)
    })
};

// Функция лайка карточки

function likeCard(userId, likeButton) {
    const isLiked = checkLikeCard(likeButton);
    
    const likeMethod = isLiked ? disLikeCardServer : likeCardServer;

    likeMethod(userId)
    .then((res) => {
        updateLike(likeButton, res.likes.length);
    })
    .catch((err) => {
        console.error(`Ошибка при ${isLiked? 'снятии' : 'постановке'} лайка`);
    })
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