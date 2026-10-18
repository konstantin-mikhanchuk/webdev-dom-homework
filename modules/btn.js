import { escapeHtml } from './utils.js'
import { postComment } from './api.js'
export function btnFunc(fetchAndRenderComments) {
    const btnEl = document.querySelector('.add-form-button')
    btnEl.addEventListener('click', () => {
        const inputEl = document.querySelector('.add-form-name')
        const newcomEl = document.querySelector('.add-form-text')
        const addFormEl = document.querySelector('.add-form')
        if (inputEl.value.trim() === '' || newcomEl.value.trim() === '') {
            return false
        }
        let currentDate = new Date()
            .toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            })
            .replace(',', '')
        const newObject = {
            name: escapeHtml(inputEl.value),
            date: currentDate,
            comment: escapeHtml(newcomEl.value),
            likesCount: 0,
            likesPresence: false,
        }
        const loadingEl = document.createElement('div')
        loadingEl.textContent = 'Комментарий загружается...'
        addFormEl.style.display = 'none'
        addFormEl.parentElement.appendChild(loadingEl)
        postComment(newObject.name, newObject.comment)
            .then(() => {
                fetchAndRenderComments()
                loadingEl.remove()
                addFormEl.style.display = 'flex'
                inputEl.value = ''
                newcomEl.value = ''
            })
            .catch((error) => {
                if (error.message === 'BAD_REQUEST') {
                    alert('Имя и комментарий должны быть не короче 3 символов')
                } else if (error.message === 'SERVER_ERROR') {
                    alert('Сервер сломался, попробуй позже')
                } else {
                    alert('Кажется, у вас сломался интернет, попробуйте позже')
                }
                loadingEl.remove()
                addFormEl.style.display = 'flex'
            })
    })
}
