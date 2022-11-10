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
  async get_townships ({ commit }) {
    const res = await this.$repositories.township.all()
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { townships } = data.data
      commit('SET_TOWNSHIPS', data.data)
    } else {
    // Handle error here
    }
  },

  async get_township ({ commit }, township) {
    const res = await this.$repositories.township.show(township)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { township } = data
      commit('SET_TOWNSHIP', data.data)
    } else {
    // Handle error here
    }
  },

  async create_township ({ commit }, township) {
    const res = await this.$repositories.township.create(township)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { township } = data
      commit('SET_TOWNSHIP', data.data)
    } else {
    // Handle error here
    }
  },

  async update_township ({ commit }, id, township) {
    const res = await this.$repositories.township.update(id, township)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { township } = data
      commit('SET_TOWNSHIP', data.data)
    } else {
    // Handle error here
    }
  },

  async delete_township ({ commit }, id) {
    const res = await this.$repositories.township.delete(id)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    // Remove from store
    } else {
    // Handle error here
    }
  }
}
