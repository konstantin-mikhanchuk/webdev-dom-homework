import { commentsArray } from './array.js';
export const renderComments = () => {
    const btnEl = document.querySelector('.add-form-button');
    const inputEl = document.querySelector('.add-form-name');
    const commentsEl = document.querySelector('.comments');
    const newcomEl = document.querySelector('.add-form-text');
    const commentsHtml = commentsArray
        .map((comment, index) => {
            return `
         <li data-index="${index}" class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div data-index="${index}" class="comment-text">
              ${comment.comment}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likesCount}</span>
              <button data-index="${index}" class="like-button ${comment.likesPresence ? ' -active-like' : ''}"></button>
            </div>
          </div> 
         </li>
        `
        })
        .join('')
    commentsEl.innerHTML = commentsHtml
    const rendcommentsEl = document.querySelectorAll('.comment')
    const likesElements = document.querySelectorAll('.like-button')
    for (const likesElement of likesElements) {
        likesElement.addEventListener('click', (e) => {
            const index = likesElement.dataset.index
            const comment = commentsArray[index]
            e.stopPropagation()
            if (comment.likesPresence === true) {
                comment.likesPresence = false
                comment.likesCount--
            } else {
                comment.likesPresence = true
                comment.likesCount++
            }
            renderComments()
        })
    }
    for (const rendcommentEl of rendcommentsEl) {
        rendcommentEl.addEventListener('click', () => {
            const index = rendcommentEl.dataset.index
            const strangCom = commentsArray[index]
            newcomEl.value = `
          Ответ на комментарий:
             ↪️${strangCom.name}
             ↪️${strangCom.comment}
          Текст ответа:
                    
          `
            if (inputEl.value.trim() !== '') {
                btnEl.disabled = false
            } else {
                btnEl.disabled = true
            }
        })
    }
}
