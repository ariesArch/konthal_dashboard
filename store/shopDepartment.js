export const state = () => ({
  shopDepartments: [],
  shopDepartment: []
})

export const mutations = {
  SET_SHOPDEPARTMENTS (state, shopDepartments) {
    state.shopDepartments = shopDepartments
  },
  SET_SHOPDEPARTMENT (state, shopDepartment) {
    state.shopDepartment = shopDepartment
  }
}
export const actions = {
  async getShopDepartments ({ commit }) {
    await this.$baseRepository.all('shop_departments', (data) => {
      commit('SET_SHOPDEPARTMENTS', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  }
}
