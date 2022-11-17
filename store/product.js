export const state = () => ({
  products: [],
  product: []
})

export const mutations = {
  SET_PRODUCTS (state, products) {
    state.products = products
  },
  SET_PRODUCT (state, product) {
    state.product = product
  }
}
export const actions = {
  async getProducts ({ commit }) {
    // const res = await this.$repositories.product.all()
    // const { status, data } = res
    // if (status === 200 && data.status === 1 && data.data) {
    // //   const { products } = data.data
    //   commit('SET_PRODUCTS', data.data)
    // } else {
    // // Handle error here
    // }
    await this.$baseRepository.all('products', (data) => {
      commit('SET_PRODUCTS', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },

  async getProduct ({ commit }, product) {
    const res = await this.$repositories.product.show(product)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { product } = data
      commit('SET_PRODUCT', data.data)
    } else {
    // Handle error here
    }
  },

  async createProduct ({ commit }, payload) {
    await this.$baseRepository.create('products', payload, (data) => {
      commit('SET_PRODUCT', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },

  async updateProduct ({ commit }, id, product) {
    await this.$repositories.product.update(`${id}`, product, (data) => {
      commit('SET_PRODUCT', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },

  async deleteProduct ({ commit }, id) {
    const res = await this.$repositories.product.delete(id)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    // Remove from store
    } else {
    // Handle error here
    }
  }
}
