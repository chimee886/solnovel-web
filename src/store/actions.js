const actions = {
    //调用mutations修改state里面的数据
    setFileName: ({ commit, state }, fileName) => {
        console.log(`原来名字是${state.fileName}，现在的名字是${fileName}`)
        return commit('SET_FILENAME', fileName) //return的是一个promise
    },
    setMenuVisible: ({ commit }, menuVisible) => {
        console.log(`menu可见变为${menuVisible}`)
        return commit('SET_MENU_VISIBLE', menuVisible) //return的是一个promise
    },
    setSettingVisible: ({ commit }, settingVisible) => {
        console.log(`settingVisible变为${settingVisible}`)
        return commit('SET_SETTING_VISIBLE', settingVisible) //return的是一个promise
    },
    setDefaultFontSize: ({ commit }, defaultFontSize) => {
        console.log(`defaultFontSize变为${defaultFontSize}`)
        return commit('SET_DEFAULT_FONTSIZE', defaultFontSize) //return的是一个promise
    },
    setFontFamilyVisible: ({ commit }, visible) => {
        return commit('SET_FONT_FAMILY_VISIBLE', visible)
    },
    setDefaultFontFamily: ({ commit }, font) => {
        return commit('SET_DEFAULT_FONT_FAMILY', font)
    },
    setDefaultTheme: ({ commit }, theme) => {
        return commit('SET_DEFAULT_THEME', theme)
    },
    setBookAvailable: ({ commit }, bookAvailable) => {
        return commit('SET_BOOK_AVAILABLE', bookAvailable)
    },
    setProgress: ({ commit }, progress) => {
        return commit('SET_PROGRESS', progress)
    },
    setSection: ({ commit }, section) => {
        return commit('SET_SECTION', section)
    },
    setIsPaginating: ({ commit }, isPaginating) => {
        return commit('SET_IS_PAGINATING', isPaginating)
    },
    setCurrentBook: ({ commit }, book) => {
        return commit('SET_CURRENT_BOOK', book)
    },
    setNavigation: ({ commit }, navigation) => {
        return commit('SET_NAVIGATION', navigation)
    },
    setCover: ({ commit }, cover) => {
        return commit('SET_COVER', cover)
    },
    setMetadata: ({ commit }, metadata) => {
        return commit('SET_METADATA', metadata)
    },
    setPaginate: ({ commit }, paginate) => {
        return commit('SET_PAGINATE', paginate)
    },
    setPagelist: ({ commit }, pagelist) => {
        return commit('SET_PAGELIST', pagelist)
    },
    setIsBookmark({ commit }, isBookmark) {
        return commit('SET_IS_BOOKMARK', isBookmark)
    },
    setOffsetY({ commit }, offsetY) {
        return commit('SET_OFFSETY', offsetY)
    },
    setSpeakingIconBottom({ commit }, speakingIconBottom) {
        commit('SET_SPEAKING_ICON_BOTTOM', speakingIconBottom)
    },
    setHotSearchOffsetY({ commit }, offsetY) {
        return commit('SET_HOT_SEARCH_OFFSETY', offsetY)
    },
    setFlapCardVisible({ commit }, visible) {
        return commit('SET_FLAP_CARD_VISIBLE', visible)
    },
    setBookCardVisible({ commit }, visible) {
        return commit('SET_BOOK_CARD_VISIBLE', visible)
    },
    setLoadingCardVisible({ commit }, visible) {
        return commit('SET_LOADING_CARD_VISIBLE', visible)
    }
}
export default actions