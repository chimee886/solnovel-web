const store = {
    state: {
        hotSearchOffsetY: '',
        flapCardVisible: false,
        bookCardVisible: false,
        loadingCardVisible: false,
    },
    mutations: {
        //修改state里面的数据
        'SET_HOT_SEARCH_OFFSETY': (state, offsetY) => {
            state.hotSearchOffsetY = offsetY
        },
        'SET_FLAP_CARD_VISIBLE': (state, visible) => {
            state.flapCardVisible = visible
        },
        'SET_BOOK_CARD_VISIBLE': (state, visible) => {
            state.bookCardVisible = visible
        },
        'SET_LOADING_CARD_VISIBLE': (state, visible) => {
            state.loadingCardVisible = visible
        }
    }
}
export default store