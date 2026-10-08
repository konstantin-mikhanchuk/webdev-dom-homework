import { escapeHtml } from './utils.js'
export function btnFunc(fetchAndRenderComments) {
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
            name: escapeHtml(inputEl.value),
            date: currentDate,
            comment: escapeHtml(newcomEl.value),
            likesCount: 0,
            likesPresence: false,
        }

        fetch(
            'https://wedev-api.sky.pro/api/v1/konstantin-mikhanchuk/comments',
            {
                method: 'POST',
                body: JSON.stringify({
                    name: newObject.name,
                    text: newObject.comment,
                }),
            },
        )
            .then((response) => {
                return response.json()
            })
            .then(() => {
                fetchAndRenderComments()
                inputEl.value = ''
                newcomEl.value = ''
            })
    })
}
