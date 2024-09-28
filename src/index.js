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

    cardImage.addEventListener('click', openPopupImage);

    return cardElement;
};

// @todo: Функция удаления карточки

function deleteCard(card) {
    card.remove()
};

// @todo: Вывести карточки на страницу

initialCards.forEach(function(card) {
    cardsList.append(createCard(card, deleteCard, likeCard));
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

document.addEventListener('click', evt => {
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

    const newElement = createCard(newCard, deleteCard, likeCard, openPopupImage);
    cardsList.prepend(newElement);
    closePopup(popupNewCard);
    formElementAddCard.reset();
}

formElementAddCard.addEventListener('submit', addCard);

// Функция лайка

function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

// Открытие попап картинки

popupImage.addEventListener('click', openPopupImage({
        src: popupImage.querySelector('.popup__image').src,
        alt: popupImage.querySelector('.popup_image').alt,
    }));

