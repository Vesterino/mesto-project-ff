// Функции открытия попапа

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleOverlay);
}

// Функция закрытия попапа

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

// Закрытие попапа через оверлей

function handleOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target.closest('.popup'));
    }
}

// Закрытие попапа через клавишу "Escape"

function handleEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('click', handleOverlay);
    }
};

export { openPopup, closePopup, handleOverlay, handleEscape };