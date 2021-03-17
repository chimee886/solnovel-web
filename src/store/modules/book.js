const book = {
    state: {
        fileName: '',
        menuVisible: true,
        settingVisible: -1, //-1不显示，0字号设置，1主题，2进度，3目录
        defaultFontSize: 20
    },
    mutations: {
        //修改state里面的数据
        SET_FILENAME: (state, fileName) => {
            state.fileName = fileName
        },
        SET_MENU_VISIBLE: (state, menuVisible) => {
            state.menuVisible = menuVisible
        },
        SET_SETTING_VISIBLE: (state, settingVisible) => {
            state.settingVisible = settingVisible
        },
        SET_DEFAULT_FONTSIZE: (state, defaultFontSize) => {
            state.defaultFontSize = defaultFontSize
        }
    }
}
export default book