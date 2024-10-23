const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-24',
    headers: {
        authorization: 'f1970c96-cfa2-4dab-8036-191ff0a1b9b3',
        'Content-Type': 'application/json'
    }
}
// Запрос получения профиля пользователя

export const getProfileUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
}

// Запрос получения карточек

export const getInitialCard = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
}

// Запрос на изменения данных профиля

export const editProfileServer = (userName, userDescription) => {
    return fetch (`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
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

export const addCardServer = (cardName, cardLink) => {
    return fetch (`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
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

export const deleteCardServer = (cardId) => {
    return fetch (`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

// Запрос на добавление лайка карточке

export const likeCardServer = (cardId) => {
    return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    })
}

// Запрос на удаление лайка карточке

export const disLikeCardServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}` , {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    })
}

// Запрос на загрузку аватара профиля

export const profileAvatarServer = (userAvatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: userAvatar
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    })
}