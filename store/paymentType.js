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
  async getPaymentTypes ({ commit }) {
    // const res = await this.$repositories.payment_type.all()
    // const { status, data } = res
    // if (status === 200 && data.status === 1 && data.data) {
    // //   const { paymentTypes } = data.data
    //   commit('SET_PAYMENTTYPES', data.data)
    // } else {
    // // Handle error here
    // }
    await this.$baseRepository.all('payment_types', (data) => {
      commit('SET_PAYMENTTYPES', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },

  async getPaymentType ({ commit }, paymentType) {
    const res = await this.$repositories.payment_type.show(paymentType)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { paymentType } = data
      commit('SET_PAYMENTTYPE', data.data)
    } else {
    // Handle error here
    }
  },

  async createPaymentType ({ commit }, payload) {
    await this.$baseRepository.create('payment_types', payload, (data) => {
      commit('SET_PAYMENTTYPE', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },

  async updatePaymentType ({ commit }, id, paymentType) {
    await this.$repositories.payment_type.update(`payment_types/${id}`, paymentType, (data) => {
      commit('SET_PAYMENTTYPE', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },

  async deletePaymentType ({ commit }, id) {
    const res = await this.$repositories.payment_type.delete(id)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    // Remove from store
    } else {
    // Handle error here
    }
  }
}
