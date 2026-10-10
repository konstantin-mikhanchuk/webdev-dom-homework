import { update } from './modules/array.js'
import { renderComments } from './modules/render.js'
import { initValidation } from './modules/validation.js'
import { btnFunc } from './modules/btn.js'

function fetchAndRenderComments() {
    const commentsEl = document.querySelector('.comments')
    const addFormEl = document.querySelector('.add-form')
    const containerEl = document.querySelector('.container')
    const loadingEl = document.createElement('div')
    loadingEl.textContent = 'Пожалуйста подождите, загружаю комментарии...'
    commentsEl.style.display = 'none'
    addFormEl.style.display = 'none'
    containerEl.appendChild(loadingEl)
    fetch('https://wedev-api.sky.pro/api/v1/konstantin-mikhanchuk/comments', {
        method: 'GET',
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            update(data.comments)
            loadingEl.remove()
            commentsEl.style.display = 'flex'
            addFormEl.style.display = 'flex'
            renderComments()
        })
}
fetchAndRenderComments()
initValidation()
btnFunc(fetchAndRenderComments)
