import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, deleteCard, likeCard } from './components/card';
import { openPopup, closePopup, handleOverlay, handleEscape } from './components/modal';
import { clearValidation, enableValidation } from './components/validation';
import { getProfileUser, getInitialCard, editProfileServer, addCardServer, deleteCardServer, likeCardServer, disLikeCardServer } from './components/api';


// DOM узлы

const cardsList = document.querySelector('.places__list');


// Выведение карточек на страницу

function renderCards(cards, cardId) {
    cards.forEach((card) => {
        cardsList.append(createCard(card, deleteCard, likeCard, previewCardImage, cardId));
    })
    console.log(cards)
};

// Промисы получения данных с сервера

let cardId;

Promise.all([getProfileUser(), getInitialCard()])
.then(([profileUser, cards]) => {
    cardId = profileUser._id;

    renderCards(cards, cardId);
})

// Попапы

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

// Кнопки попапов

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonNewCard = document.querySelector('.profile__add-button');

// Анимация попапов

const popups = [popupEdit, popupNewCard, popupImage];

popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
})

// Слушатели попапов

buttonEditProfile.addEventListener('click', () => {
    inputNameProfile.value = titleProfile.textContent;
    inputDescriptionProfile.value = descriptionProfile.textContent;
    clearValidation(formElementEditProfile, validationSettings);
    openPopup(popupEdit);
});

buttonNewCard.addEventListener('click', () => {
    inputCardName.value = '';
    inputCardLink.value = '';
    clearValidation(formElementAddCard, validationSettings);
    openPopup(popupNewCard);
});

// Перебор закрытия попапов

const allPopups = document.querySelectorAll('.popup');

allPopups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    })
});


// Редактирование профиля

const formElementEditProfile = document.forms.editProfile;
const inputNameProfile = formElementEditProfile.name;
const inputDescriptionProfile = formElementEditProfile.description;
const titleProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

function editProfile(evt) {
    evt.preventDefault();

    const userName = inputNameProfile.value;
    const userDescription = inputDescriptionProfile.value;

    titleProfile.textContent = userName;
    descriptionProfile.textContent = userDescription;

    editProfileServer(userName, userDescription)
    .then((user) => {
        titleProfile.textContent = user.name;
        descriptionProfile.textContent = user.about;
        closePopup(popupEdit);
        formElementEditProfile.reset();
    })
    .catch((err) => {
        console.error(`Ошибка при обновлении профиля:`, err)
    })
}

formElementEditProfile.addEventListener('submit', editProfile);

function completeProfile(user) {
    titleProfile.textContent = user.name;
    descriptionProfile.textContent = user.about;
}

// Добавление карточки

const formElementAddCard = document.forms.newPlace;
const inputCardName = formElementAddCard.placeName;
const inputCardLink = formElementAddCard.link;

function addCard(evt) {
    evt.preventDefault();

    const cardName = inputCardName.value;
    const cardLink = inputCardLink.value; 

    addCardServer(cardName, cardLink)
    .then((newCard) => {
        const newElement = createCard(newCard, deleteCard, likeCard, previewCardImage, cardId);
        cardsList.prepend(newElement);

        closePopup(popupNewCard);
        formElementAddCard.reset();
    })
    .catch((error) => {
        console.error(`Ошибка при добавлении карточки: ${error}`)
    })
}

formElementAddCard.addEventListener('submit', addCard);

// Открытие попап картинки

const popupCardImage = document.querySelector('.popup__image');
const popupCardCaption = document.querySelector('.popup__caption');

function previewCardImage(linkValue, nameValue) {
    popupCardImage.src = linkValue;
    popupCardImage.alt = nameValue;
    popupCardCaption.textContent = nameValue;
    openPopup(popupImage);
}

// Валидация форм

const validationSettings = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});
