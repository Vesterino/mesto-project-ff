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

// Попапы

const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

// Кнопки попапов

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonNewCard = document.querySelector('.profile__add-button');
const buttonImage = document.querySelector('.card__image');
const buttonClosePopup = document.querySelectorAll('.popup__close');

// Анимация попапов

popupEdit.classList.add('popup_is-animated');
popupNewCard.classList.add('popup_is-animated');
popupImage.classList.add('popup_is-animated');

// Функции открытия каждого попапа

function openPopupEdit() {
    popupEdit.classList.add('popup_is-opened');
}

function openPopupNewCard() {
    popupNewCard.classList.add('popup_is-opened');
}

function openPopupImage() {
    popupImage.classList.add('popup_is-opened');
}

// Слушатели каждого попапа

buttonEditProfile.addEventListener('click', () => {
    inputNameProfile.value = titleProfile.textContent;
    inputDescriptionProfile.value = descriptionProfile.textContent;
    openPopupEdit();
});

buttonNewCard.addEventListener('click', openPopupNewCard);
buttonImage.addEventListener('click', openPopupImage);

// Функция закрытия попапа

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

buttonClosePopup.forEach(function(button) {
    button.addEventListener('click', () => {
        if(popupEdit.classList.contains('popup_is-opened')) {
            closePopup(popupEdit);
        } else if(popupNewCard.classList.contains('popup_is-opened')) {
            closePopup(popupNewCard);
        } else if(popupImage.classList.contains('popup_is-opened')) {
            closePopup(popupImage);
        }
    });
});

popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target.closest('.popup'));
    }
});

document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
});

// Редактирование профиля

const formElement = document.forms.editProfile;
const inputNameProfile = formElement.name;
const inputDescriptionProfile = formElement.description;
const titleProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

function editProfile(evt) {
    evt.preventDefault();
    titleProfile.textContent = inputNameProfile.value;
    descriptionProfile.textContent = inputDescriptionProfile.value;
    closePopup(popupEdit);
}

formElement.addEventListener('submit', editProfile);



// Like

function likeCard(evt) {
        evt.target.classList.toggle('card__like-button_is-active')
    }

