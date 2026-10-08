import { update } from './modules/array.js'
import { renderComments } from './modules/render.js'
import { initValidation } from './modules/validation.js'
import { btnFunc } from './modules/btn.js'

function fetchAndRenderComments() {
    fetch('https://wedev-api.sky.pro/api/v1/konstantin-mikhanchuk/comments', {
        method: 'GET',
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            update(data.comments)
            renderComments()
        })
}
fetchAndRenderComments();
initValidation()
btnFunc(fetchAndRenderComments)
