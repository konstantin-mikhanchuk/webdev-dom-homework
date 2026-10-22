import { commentsArray } from './array.js'
import { getToken, getUserName } from './user.js'
import { renderLogin } from './loginComponent.js'
import { postComment, fetchAndRenderComments } from './api.js'
export const renderComments = () => {
    const commentsEl = document.querySelector('.comments')
    const commentsHtml = commentsArray
        .map((comment, index) => {
            const createDate = new Date(comment.date)
                .toLocaleString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                })
                .replace(',', '')
            return `
         <li data-index="${index}" class="comment">
          <div class="comment-header">
            <div>${comment.author.name}</div>
            <div>${createDate}</div>
          </div>
          <div class="comment-body">
            <div data-index="${index}" class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index="${index}" class="like-button ${comment.isLiked ? ' -active-like' : ''}"></button>
            </div>
          </div> 
         </li>
        `
        })
        .join('')
    commentsEl.innerHTML = commentsHtml
    const likesElements = document.querySelectorAll('.like-button')
    for (const likesElement of likesElements) {
        likesElement.addEventListener('click', (e) => {
            const index = likesElement.dataset.index
            const comment = commentsArray[index]
            e.stopPropagation()
            if (!getToken()) {
                alert('Лайкать могут только авторизированные пользователи')
                return
            }

            if (comment.isLiked === true) {
                comment.isLiked = false
                comment.likes--
            } else {
                comment.isLiked = true
                comment.likes++
            }
            renderComments()
        })
    }
    const rendcommentsEl = document.querySelectorAll('.comment')
    for (const rendcommentEl of rendcommentsEl) {
        rendcommentEl.addEventListener('click', () => {
            if (!getToken()) {
                alert('Авторизуйтесь, чтобы ответить!')
                return
            }
            const newcomEl = document.getElementById('comment-text-input')
            const index = rendcommentEl.dataset.index
            const strangCom = commentsArray[index]
            newcomEl.value = `
          Ответ на комментарий:
             ↪️${strangCom.author.name}
             ↪️${strangCom.text}
          Текст ответа:
                    
          `
        })
    }

    const formContainer = document.querySelector('.add-form-container')
    if (!formContainer) return
    if (!getToken()) {
        formContainer.innerHTML = `
            <p class="comment-text">
                Чтобы добавить 
                комментарий, 
                <a href="#" 
                   id="go-to-login">
                    авторизуйтесь
                </a>
            </p>
        `
        document
            .getElementById('go-to-login')
            .addEventListener('click', (e) => {
                e.preventDefault()
                renderLogin()
            })
    } else {
        formContainer.innerHTML = `
            <div class="add-form">
                <input
                  type="text"
                  class="add-form-name"
                  id="author-name-input"
                  value="${getUserName()}"
                  readonly
                />
                <textarea
                  class="add-form-text"
                  id="comment-text-input"
                  placeholder="Введите ваш коментарий"
                  rows="4"
                ></textarea>
                <div class="add-form-row">
                  <button 
                    class="add-form-button" 
                    id="submit-btn"
                  >
                     Написать
                  </button>
                </div>
            </div>
        `
        initFormSubmitLogic()
    }
}
function initFormSubmitLogic() {
    const btnEl = document.getElementById('submit-btn')
    const newcomEl = document.getElementById('comment-text-input')
    const addFormEl = document.querySelector('.add-form')
    btnEl.addEventListener('click', () => {
        if (newcomEl.value.trim() === '') {
            alert('Текст комментария не может быть пустым')
            return
        }
        const loadingEl = document.createElement('div')
        loadingEl.textContent = 'Комментарий загружается'
        addFormEl.style.display = 'none'
        addFormEl.parentElement.appendChild(loadingEl)
        postComment(newcomEl.value)
            .then(() => {
                fetchAndRenderComments(false)
                loadingEl.remove()
                addFormEl.style.display = 'flex'
                newcomEl.value = ''
            })
            .catch((error) => {
                loadingEl.remove()
                addFormEl.style.display = 'flex'
                if (error.message === 'BAD_REQUEST') {
                    alert('Комментарий должен быть не короче 3 символов')
                } else if (error.message === 'SERVER_ERROR') {
                    alert('Сервер сломался, попробуй позже')
                } else {
                    alert('Кажется, у вас сломался интернет')
                }
            })
    })
}
