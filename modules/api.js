import { update } from './array.js'
import { renderComments } from './render.js'
import { getToken } from './user.js'
const baseUrl = 'https://wedev-api.sky.pro/api/v2/konstantin-mikhanchuk'
export function fetchAndRenderComments(isInitial) {
    const commentsEl = document.querySelector('.comments')
    const addFormEl = document.querySelector('.add-form')
    const containerEl = document.querySelector('.container')
    const loadingEl = document.createElement('div')
    loadingEl.textContent = 'Пожалуйста подождите, загружаю комментарии...'
    if (isInitial) {
        commentsEl.style.display = 'none'
        if (addFormEl) {
            addFormEl.style.display = 'none';
        }
        containerEl.appendChild(loadingEl);
    }
    fetch(`${baseUrl}/comments`, {
        method: 'GET',
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('SERVER_ERROR')
            }
            return response.json()
        })
        .then((data) => {
            update(data.comments)
            if (isInitial) {
                loadingEl.remove()
                commentsEl.style.display = 'flex'
                if (addFormEl) {
                    addFormEl.style.display = 'flex';
                }
            }
            renderComments()
        })
        .catch((error) => {
            if (error.message === 'SERVER_ERROR') {
                alert('Сервер сломался, попробуй позже')
            } else {
                alert('Кажется, у вас сломался интернет, попробуйте позже')
            }
            if (isInitial && loadingEl) {
                loadingEl.remove()
                commentsEl.style.display = 'flex'
                if (addFormEl) {
                    addFormEl.style.display = 'flex';
                }
            }
        })
}
export function postComment(comment) {
    return fetch(`${baseUrl}/comments`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({
            text: comment,
        }),
    }).then((response) => {
        if (response.status === 401) {
            throw new Error('UNAUTHORIZED')
        }
        if (response.status === 400) {
            throw new Error('BAD_REQUEST')
        }
        if (response.status === 500) {
            throw new Error('SERVER_ERROR')
        }
        return response.json()
    })
}
export function loginUser(login, password) {
    return fetch('https://wedev-api.sky.pro/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            login: login,
            password: password
        }),       
    })   
    .then((response) => {
        if (response.status === 400) {
            throw new Error('INVALID_CREDENTIALS')
        }
        if (response.status === 500) {
            throw new Error('SERVER_ERROR')
        }
        return response.json()
    })
}




