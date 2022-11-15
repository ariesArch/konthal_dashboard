export const state = () => ({
  paymentMethods: [],
  paymentMethod: []
})

export const mutations = {
  SET_PAYMENTMETHODS (state, paymentMethods) {
    state.paymentMethods = paymentMethods
  },
  SET_PAYMENTMETHOD (state, paymentMethod) {
    state.paymentMethod = paymentMethod
  }
}
export const actions = {
  async getPaymentMethods ({ commit }) {
    // const res = await this.$repositories.payment_method.all()
    // const { status, data } = res
    // if (status === 200 && data.status === 1 && data.data) {
    // //   const { paymentMethods } = data.data
    //   commit('SET_PAYMENTMETHODS', data.data)
    // } else {
    // // Handle error here
    // }
    await this.$baseRepository.all('payment_methods', (data) => {
      commit('SET_PAYMENTMETHODS', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },

  async getPaymentMethod ({ commit }, paymentMethod) {
    const res = await this.$repositories.payment_method.show(paymentMethod)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { paymentMethod } = data
      commit('SET_PAYMENTMETHOD', data.data)
    } else {
    // Handle error here
    }
  },

  async createPaymentMethod ({ commit }, payload) {
    await this.$baseRepository.create('payment_methods', payload, (data) => {
      commit('SET_PAYMENTMETHOD', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },

  async updatePaymentMethod ({ commit }, id, paymentMethod) {
    const res = await this.$repositories.payment_method.update(id, paymentMethod)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { paymentMethod } = data
      commit('SET_PAYMENTMETHOD', data.data)
    } else {
    // Handle error here
    }
  },

  async deletePaymentMethod ({ commit }, id) {
    const res = await this.$repositories.payment_method.delete(id)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    // Remove from store
    } else {
    // Handle error here
    }
  }
}
