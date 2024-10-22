const PATH = ('https://nomoreparties.co/v1/wff-cohort-24')

// Запрос получения профиля пользователя

function getProfileUser() {
    return fetch(PATH + '/users/me', {
        headers: {
            authorization: 'f1970c96-cfa2-4dab-8036-191ff0a1b9b3'
        }
    })
    .then(res => res.json())
};

// Запрос получения карточек

function getInitialCard() {
    return fetch(PATH + '/cards', {
        headers: {
            authorization: 'f1970c96-cfa2-4dab-8036-191ff0a1b9b3'
        }
    })
    .then(res => res.json())
}

// Запрос на изменения данных профиля

function editProfileServer(userName, userDescription) {
    return fetch (PATH + '/users/me', {
        method: 'PATCH',
        headers: {
            authorization: 'f1970c96-cfa2-4dab-8036-191ff0a1b9b3',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userName,
            about: userDescription
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

// Запрос на добавление карточек

function addCardServer(cardName, cardLink) {
    return fetch (PATH + '/cards', {
        method: 'POST',
        headers: {
            authorization: 'f1970c96-cfa2-4dab-8036-191ff0a1b9b3',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardName,
            link: cardLink,
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

// Запрос на удаление карточки

function deleteCardServer(cardId) {
    return fetch (PATH + '/cards/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: 'f1970c96-cfa2-4dab-8036-191ff0a1b9b3',
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

// Запрос на добавление лайка карточке

function likeCardServer(cardId) {
    return fetch (PATH + '/cards/likes/' + cardId, {
        method: 'PUT',
        headers: {
            authorization: 'f1970c96-cfa2-4dab-8036-191ff0a1b9b3',
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    })
}

// Запрос на удаление лайка карточке

function disLikeCardServer(cardId) {
    return fetch(PATH + '/cards/likes/' + cardId , {
        method: 'DELETE',
        headers: {
            authorization: 'f1970c96-cfa2-4dab-8036-191ff0a1b9b3',
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    })
}

export { getProfileUser, getInitialCard, editProfileServer, addCardServer, deleteCardServer, likeCardServer, disLikeCardServer }