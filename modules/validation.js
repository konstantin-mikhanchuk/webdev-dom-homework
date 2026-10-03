export function initValidation() {
    const btnEl = document.querySelector('.add-form-button')
    const inputEl = document.querySelector('.add-form-name')
    const newcomEl = document.querySelector('.add-form-text')
    inputEl.addEventListener('input', () => {
        if (inputEl.value.trim() === '' || newcomEl.value.trim() === '') {
            btnEl.disabled = true
        } else {
            btnEl.disabled = false
        }
    })
    newcomEl.addEventListener('input', () => {
        if (newcomEl.value.trim() === '' || inputEl.value.trim() === '') {
            btnEl.disabled = true
        } else {
            btnEl.disabled = false
        }
    })
}
