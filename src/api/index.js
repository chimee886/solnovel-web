import axios from "axios"

export function home() {
    return axios({
        type: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/book/home`
    })
}

export function list() {
    return axios({
        type: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/book/list`
    })
}
export function detail(book) {
    return axios({
        type: 'get',
        url: `${process.env.VUE_APP_BOOK_URL}/book/detail`,
        params: {
            fileName: book.fileName
        }
    })
}