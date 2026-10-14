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
}
export function postComment(name, comment) {
    return fetch(
        'https://wedev-api.sky.pro/api/v1/konstantin-mikhanchuk/comments',
        {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                text: comment,
            }),
        },
    ).then((response) => {
        return response.json()
    })
}
