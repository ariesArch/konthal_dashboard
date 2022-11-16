export const state = () => ({
  brands: [],
  brand: []
})

export const mutations = {
  SET_BRANDS (state, brands) {
    state.brands = brands
  },
  SET_BRAND (state, brand) {
    state.brand = brand
  }
}

export const actions = {
  async getBrands ({ commit }) {
    await this.$baseRepository.all('brands', (data) => {
      commit('SET_BRANDS', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  }
}
