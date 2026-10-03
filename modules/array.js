export const commentsArray = [
    {
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        comment: 'Это будет первый комментарий на этой странице',
        likesCount: 3,
        likesPresence: false,
    },
    {
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        comment: 'Мне нравится как оформлена эта страница! ❤',
        likesCount: 75,
        likesPresence: true,
    },
]
export function addComment(newObject) {
    commentsArray.push(newObject)
}
