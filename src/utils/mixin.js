import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
//通过mapGetters可以实现通过this关键字直接访问state里面的数据，而不是每次使用this.$store.state.book.fileName
export const bookMixin = {
    computed: {
        ...mapGetters([
            "fileName",
            "menuVisible",
            "settingVisible",
            "defaultFontSize"
        ]),
    },
    methods: {
        ...mapActions([
            "setFileName",
            "setMenuVisible",
            "setSettingVisible",
            "setDefaultFontSize"
        ])
    },
}