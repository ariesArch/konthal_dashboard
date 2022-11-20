export const state = () => ({
  shopTypes: [],
  shopType: []
})

export const mutations = {
  SET_SHOPTYPES (state, shopTypes) {
    state.shopTypes = shopTypes
  },
  SET_SHOPTYPE (state, shopType) {
    state.shopType = shopType
  }
}
export const actions = {
  async getShopTypes ({ commit }) {
    // const res = await this.$repositories.shop.all('shopTypes')
    // const { status, data } = res
    // if (status === 200 && data.status === 1 && data.data) {
    //   commit('SET_SHOPS', data.data)
    // } else {
    //   // Handle error here
    // }
    await this.$baseRepository.all('shoptypes', (data) => {
      commit('SET_SHOPTYPES', data)
    }, ({ error }) => {
      commit('SET_ERROR', error, { root: true })
    })
  }
}
