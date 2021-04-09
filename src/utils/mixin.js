import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import { saveLocation } from '../utils/localStorage'
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
        ]),
        refreshProgress() {
            const currentLocation = this.currentBook.rendition.currentLocation();
            if (currentLocation && currentLocation.start) {
                const startCfi = currentLocation.start.cfi;
                const progress = this.currentBook.locations.percentageFromCfi(startCfi);
                this.setProgress(Math.floor(progress * 100));
                this.setSection(currentLocation.start.index)
                saveLocation(this.fileName, startCfi)
            }
        },
        display(target, cb) {
            if (target) {
                return this.currentBook.rendition.display(target).then(() => {
                    this.refreshProgress()
                    cb && cb()
                })
            } else {
                return this.currentBook.rendition.display().then(() => {
                    this.refreshProgress()
                    cb && cb()
                })
            }
        }
    }

}
export const storeHomeMixin = {
    computed: {
        ...mapGetters([
            'offsetY',
            'hotSearchOffsetY',
            'flapCardVisible',
            'loadingCardVisible',
            'bookCardVisible'
        ])
    },
    methods: {
        ...mapActions([
            'setOffsetY',
            'setHotSearchOffsetY',
            'setFlapCardVisible',
            'setLoadingCardVisible',
            'setBookCardVisible'
        ]),
        showBookDetail(book) {
            this.$router.push({
                path: '/store/detail',
                query: {
                    fileName: book.fileName,
                    category: book.categoryText
                }
            })
        }
    }
}