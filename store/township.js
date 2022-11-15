export const state = () => ({
  townships: [],
  township: []
})

export const mutations = {
  SET_TOWNSHIPS (state, townships) {
    state.townships = townships
  },
  SET_TOWNSHIP (state, township) {
    state.township = township
  }
}
export const actions = {
  async getTownships ({ commit }) {
    // const res = await this.$repositories.township.all()
    // const { status, data } = res
    // if (status === 200 && data.status === 1 && data.data) {
    // //   const { townships } = data.data
    //   commit('SET_TOWNSHIPS', data.data)
    // } else {
    // // Handle error here
    // }
    await this.$baseRepository.all('townships', (data) => {
      commit('SET_TOWNSHIPS', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },

  async getTownship ({ commit }, township) {
    const res = await this.$repositories.township.show(township)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { township } = data
      commit('SET_TOWNSHIP', data.data)
    } else {
    // Handle error here
    }
  },

  async createTownship ({ commit }, payload) {
    await this.$baseRepository.create('townships', payload, (data) => {
      commit('SET_TOWNSHIP', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },

  async updateTownship ({ commit }, id, township) {
    const res = await this.$repositories.township.update(id, township)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { township } = data
      commit('SET_TOWNSHIP', data.data)
    } else {
    // Handle error here
    }
  },

  async deleteTownship ({ commit }, id) {
    const res = await this.$repositories.township.delete(id)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    // Remove from store
    } else {
    // Handle error here
    }
  }
}
