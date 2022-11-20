export const state = () => ({
  categories: [],
  category: []
})

export const mutations = {
  SET_CATEGORIES (state, categories) {
    state.categories = categories
  },
  SET_CATEGORY (state, category) {
    state.category = category
  }
}

export const actions = {
  async getCategories ({ commit }) {
    await this.$baseRepository.all('categories', (data) => {
      commit('SET_CATEGORIES', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  }
}
