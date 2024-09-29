// Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки

function createCard(card, deleteCard, likeCard, previewCardImage) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    cardElement.querySelector('.card__title').textContent = card.name;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardElement));

    const likeButton = cardElement.querySelector('.card__like-button')
    likeButton.addEventListener('click', likeCard);

    cardImage.addEventListener('click', () => {
        previewCardImage(cardImage.src, cardImage.alt);
    });

    return cardElement;
};

// Функция удаления карточки

function deleteCard(card) {
    card.remove()
};

// Функция лайка карточки

function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard };