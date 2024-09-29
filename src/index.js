import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, deleteCard, likeCard } from './components/card';
import { openPopup, closePopup } from './components/modal';


// DOM узлы

const cardsList = document.querySelector('.places__list');


// Выведение карточек на страницу

initialCards.forEach(function(card) {
    cardsList.append(createCard(card, deleteCard, likeCard, previewCardImage));
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

const popups = [popupEdit, popupNewCard, popupImage];

popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
})

// Слушатели попапов

buttonEditProfile.addEventListener('click', () => {
    inputNameProfile.value = titleProfile.textContent;
    inputDescriptionProfile.value = descriptionProfile.textContent;
    openPopup(popupEdit);
});

buttonNewCard.addEventListener('click', () => {
    openPopup(popupNewCard);
});
buttonImage.addEventListener('click', () => {
    openPopup(popupImage);
});

// Перебор закрытия попапов

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

// Закрытие попапа через оверлей

document.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target.closest('.popup'));
    }
});

// Закрытие попапа через клавишу "Escape"

document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
});

// Редактирование профиля

const formElementEditProfile = document.forms.editProfile;
const inputNameProfile = formElementEditProfile.name;
const inputDescriptionProfile = formElementEditProfile.description;
const titleProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

function editProfile(evt) {
    evt.preventDefault();
    titleProfile.textContent = inputNameProfile.value;
    descriptionProfile.textContent = inputDescriptionProfile.value;
    closePopup(popupEdit);
    formElementEditProfile.reset();
}

formElementEditProfile.addEventListener('submit', editProfile);

// Добавление карточки

const formElementAddCard = document.forms.newPlace;
const inputCardName = formElementAddCard.placeName;
const inputCardLink = formElementAddCard.link;

function addCard(evt) {
    evt.preventDefault();

    const cardName = inputCardName.value;
    const cardLink = inputCardLink.value;

    const newCard = {
        name: cardName,
        link: cardLink,
    }

    const newElement = createCard(newCard, deleteCard, likeCard, previewCardImage);
    cardsList.prepend(newElement);
    closePopup(popupNewCard);
    formElementAddCard.reset();
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