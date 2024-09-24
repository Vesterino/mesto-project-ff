import './pages/index.css';

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(card, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    cardElement.querySelector('.card__title').textContent = card.name;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    
    return cardElement;
};

// @todo: Функция удаления карточки

function deleteCard(card) {
    card.remove()
};

// @todo: Вывести карточки на страницу

initialCards.forEach(function(card) {
    cardsList.append(createCard(card, deleteCard));
});