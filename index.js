import { initValidation } from './modules/validation.js'
import { btnFunc } from './modules/btn.js'
import { fetchAndRenderComments } from './modules/api.js'

fetchAndRenderComments(true)
initValidation()
btnFunc(fetchAndRenderComments)
