const _price = {
    state: {
        _price: 5
    },
    mutations: {
        Set_Price: (state, newPrice) => {
            state._price = newPrice
        }
    },
    actions: {
        setPrice: ({ commit, state }, newPrice) => {
            console.log(`这是actions打印的：原来的价格是${state._price}，现在的价格是${newPrice}`)
            return commit('Set_Price', newPrice) //return的是一个promise

        }
    }
}
export default _price