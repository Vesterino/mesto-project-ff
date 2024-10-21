const PATH = ('https://nomoreparties.co/v1/wff-cohort-24')

function getProfileUser() {
    return fetch(PATH + '/users/me', {
        headers: {
            authorization: 'f1970c96-cfa2-4dab-8036-191ff0a1b9b3'
        }
    })
    .then(res => res.json())
    .then((result) => {
        console.log(result)
    });
};

function getInitialCard() {
    return fetch(PATH + '/cards', {
        headers: {
            authorization: 'f1970c96-cfa2-4dab-8036-191ff0a1b9b3'
        }
    })
    .then(res => res.json())
}

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
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    })
}

getProfileUser();

function addCardServer(cardName, cardLink) {
    return fetch (PATH + '/cards', {
        method: 'POST',
        headers: {
            authorization: 'f1970c96-cfa2-4dab-8036-191ff0a1b9b3',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
    .then(res => {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    })
}

export { getProfileUser, getInitialCard, editProfileServer, addCardServer }