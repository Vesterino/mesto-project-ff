import './pages/index.css';
import { initialCards } from './scripts/cards';

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(card, deleteCard, likeCard, openPopupImage) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    cardElement.querySelector('.card__title').textContent = card.name;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardElement));

    const likeButton = cardElement.querySelector('.card__like-button')
    likeButton.addEventListener('click', likeCard);


    
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

// Popup

const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

// Button popup

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonNewCard = document.querySelector('.profile__add-button');
const buttonImage = document.querySelector('.card__image');
const buttonClosePopup = document.querySelectorAll('.popup__close');

function openPopupEdit() {
    popupEdit.style.display = 'flex';
}

function openPopupNewCard() {
    popupNewCard.style.display = 'flex';
}

function openPopupImage() {
    popupImage.style.display = 'flex';
}

buttonEditProfile.addEventListener('click', openPopupEdit);
buttonNewCard.addEventListener('click', openPopupNewCard);
buttonImage.addEventListener('click', openPopupImage);

function closePopup(popup) {
    popup.style.display = 'none';
}

buttonClosePopup.forEach(function(button) {
    button.addEventListener('click', () => {
        if(popupEdit.style.display === 'flex') {
            closePopup(popupEdit);
        } else if(popupNewCard.style.display === 'flex') {
            closePopup(popupNewCard);
        } else if(popupImage.style.display === 'flex') {
            closePopup(popupImage);
        }
    });
});


// Like

function likeCard(evt) {
        evt.target.classList.toggle('card__like-button_is-active')
    }

