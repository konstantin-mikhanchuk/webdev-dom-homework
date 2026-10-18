import { update } from './array.js'
import { renderComments } from './render.js'
export function fetchAndRenderComments(isInitial) {
    const commentsEl = document.querySelector('.comments')
    const addFormEl = document.querySelector('.add-form')
    const containerEl = document.querySelector('.container')
    const loadingEl = document.createElement('div')
    loadingEl.textContent = 'Пожалуйста подождите, загружаю комментарии...'
    if (isInitial) {
        commentsEl.style.display = 'none'
        addFormEl.style.display = 'none'
        containerEl.appendChild(loadingEl)
    }
    fetch('https://wedev-api.sky.pro/api/v1/konstantin-mikhanchuk/comments', {
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
                addFormEl.style.display = 'flex'
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
                addFormEl.style.display = 'flex'
            }
        })
}
export function postComment(name, comment) {
    return fetch(
        'https://wedev-api.sky.pro/api/v1/konstantin-mikhanchuk/comments',
        {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                text: comment,
                forceError: true,
            }),
        },
    ).then((response) => {
        if (response.status === 400) {
            throw new Error('BAD_REQUEST')
        }
        if (response.status === 500) {
            throw new Error('SERVER_ERROR')
        }
        return response.json()
    })
}
