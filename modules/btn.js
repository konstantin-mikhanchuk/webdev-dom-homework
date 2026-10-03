import { renderComments } from './render.js'
import { addComment } from './array.js'
export function btnFunc() {
    const btnEl = document.querySelector('.add-form-button')
    btnEl.addEventListener('click', () => {
        const inputEl = document.querySelector('.add-form-name')
        const newcomEl = document.querySelector('.add-form-text')
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
            name: inputEl.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
            date: currentDate,
            comment: newcomEl.value
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;'),
            likesCount: 0,
            likesPresence: false,
        }
        addComment(newObject)
        renderComments()
        inputEl.value = ''
        newcomEl.value = ''
    })
}
