import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
//通过mapGetters可以实现通过this关键字直接访问state里面的数据，而不是每次使用this.$store.state.book.fileName
export const bookMixin = {
    computed: {
        ...mapGetters([
            "fileName",
            "menuVisible",
            "settingVisible",
            "defaultFontSize",
            'defaultFontFamily',
            'fontFamilyVisible',
            'defaultTheme',
            'bookAvailable',
            'progress',
            'section',
            'isPaginating',
            'currentBook',
            'navigation',
            'cover',
            'metadata',
            'paginate',
            'pagelist',
            'offsetY',
            'isBookmark',
            'speakingIconBottom'
        ]),
    },
    methods: {
        ...mapActions([
            "setFileName", //生成电子书的url地址
            "setMenuVisible", //控制菜单栏是否显示
            "setSettingVisible", //控制设置选项展示的内容
            "setDefaultFontSize", //设置默认字体大小
            'setDefaultFontFamily',
            'setFontFamilyVisible',
            'setDefaultTheme',
            'setBookAvailable',
            'setProgress',
            'setSection',
            'setIsPaginating',
            'setCurrentBook', //设置当前的电子书对象
            'setNavigation',
            'setCover',
            'setMetadata',
            'setPaginate',
            'setPagelist',
            'setOffsetY',
            'setIsBookmark',
            'setSpeakingIconBottom'
        ])
    },
}