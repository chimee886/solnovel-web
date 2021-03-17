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
    }
}
export default actions