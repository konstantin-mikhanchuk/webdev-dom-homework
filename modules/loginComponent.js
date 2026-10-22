import { loginUser, fetchAndRenderComments } from './api.js'
import { setToken, setUserName } from './user.js'
export function renderLogin() {
    const containerEl = document.querySelector('.container')
    const loginHtml = `
        <div class="add-form">
            <input
                type="text"
                id="login-input"
                class="add-form-name"
                placeholder="Введите ваш логин"
                style="margin-bottom: 12px;"
            />
            <input
                type="password"
                id="password-input"
                class="add-form-name"
                placeholder="Введите ваш пароль"
            />
            <div class="add-form-row">
                <button 
                    id="login-button" 
                    class="add-form-button"
                >
                    Войти
                </button>
            </div>
        </div>
    `
    containerEl.innerHTML = loginHtml
    const loginButton = document.getElementById('login-button')
    const loginInput = document.getElementById('login-input')
    const passwordInput = document.getElementById('password-input')
    loginButton.addEventListener('click', () => {
        if (!loginInput.value.trim() || !passwordInput.value.trim()) {
            alert('Введите данные')
            return
        }
        loginButton.disabled = true
        loginButton.textContent = 'Вход...'
        loginUser(loginInput.value, passwordInput.value)
            .then((data) => {
                setToken(data.user.token)
                setUserName(data.user.name)
                containerEl.innerHTML = `
                        <ul class="comments">
                        </ul>
                        <div class="add-form-container">
                        </div>
                    `
                fetchAndRenderComments(true)
            })
            .catch((error) => {
                loginButton.disabled = false
                loginButton.textContent = 'Войти'
                if (error.message === 'INVALID_CREDENTIALS') {
                    alert('Неверный логин или пароль!')
                } else {
                    alert('Сервер сломался, попробуй позже')
                }
            })
    })
}
