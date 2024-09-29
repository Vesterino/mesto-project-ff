// Функции открытия попапа

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
}

// Функция закрытия попапа

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

export { openPopup, closePopup };