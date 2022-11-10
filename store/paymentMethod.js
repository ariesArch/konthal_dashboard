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
  async get_payment_methods ({ commit }) {
    const res = await this.$repositories.payment_method.all()
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { paymentMethods } = data.data
      commit('SET_PAYMENTMETHODS', data.data)
    } else {
    // Handle error here
    }
  },

  async get_payment_method ({ commit }, paymentMethod) {
    const res = await this.$repositories.payment_method.show(paymentMethod)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { paymentMethod } = data
      commit('SET_PAYMENTMETHOD', data.data)
    } else {
    // Handle error here
    }
  },

  async create_payment_method ({ commit }, paymentMethod) {
    const res = await this.$repositories.payment_method.create(paymentMethod)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { paymentMethod } = data
      commit('SET_PAYMENTMETHOD', data.data)
    } else {
    // Handle error here
    }
  },

  async update_payment_method ({ commit }, id, paymentMethod) {
    const res = await this.$repositories.payment_method.update(id, paymentMethod)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { paymentMethod } = data
      commit('SET_PAYMENTMETHOD', data.data)
    } else {
    // Handle error here
    }
  },

  async delete_payment_method ({ commit }, id) {
    const res = await this.$repositories.payment_method.delete(id)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    // Remove from store
    } else {
    // Handle error here
    }
  }
}
