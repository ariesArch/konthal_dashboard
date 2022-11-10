export const state = () => ({
  paymentTypes: [],
  paymentType: []
})

export const mutations = {
  SET_PAYMENTTYPES (state, paymentTypes) {
    state.paymentTypes = paymentTypes
  },
  SET_PAYMENTTYPE (state, paymentType) {
    state.paymentType = paymentType
  }
}

export const actions = {
  async get_payment_types ({ commit }) {
    const res = await this.$repositories.payment_type.all()
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { paymentTypes } = data.data
      commit('SET_PAYMENTTYPES', data.data)
    } else {
    // Handle error here
    }
  },

  async get_payment_type ({ commit }, paymentType) {
    const res = await this.$repositories.payment_type.show(paymentType)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { paymentType } = data
      commit('SET_PAYMENTTYPE', data.data)
    } else {
    // Handle error here
    }
  },

  async create_payment_type ({ commit }, paymentType) {
    const res = await this.$repositories.payment_type.create(paymentType)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { paymentType } = data
      commit('SET_PAYMENTTYPE', data.data)
    } else {
    // Handle error here
    }
  },

  async update_payment_type ({ commit }, id, paymentType) {
    const res = await this.$repositories.payment_type.update(id, paymentType)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { paymentType } = data
      commit('SET_PAYMENTTYPE', data.data)
    } else {
    // Handle error here
    }
  },

  async delete_payment_type ({ commit }, id) {
    const res = await this.$repositories.payment_type.delete(id)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    // Remove from store
    } else {
    // Handle error here
    }
  }
}
