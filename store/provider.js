export const state = () => ({
  providers: [],
  provider: []
})

export const mutations = {
  SET_PROVIDERS (state, providers) {
    state.providers = providers
  },
  SET_PROVIDER (state, provider) {
    state.provider = provider
  }
}

export const actions = {
  async get_providers ({ commit }) {
    const res = await this.$repositories.provider.all()
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
      //   const { providers } = data.data
      commit('SET_PROVIDERS', data.data)
    } else {
      // Handle error here
    }
  },

  async get_provider ({ commit }, provider) {
    const res = await this.$repositories.provider.show(provider)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { provider } = data
      commit('SET_PROVIDER', data.data)
    } else {
      // Handle error here
    }
  },

  async create_provider ({ commit }, provider) {
    const res = await this.$repositories.provider.create(provider)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { provider } = data
      commit('SET_PROVIDER', data.data)
    } else {
      // Handle error here
    }
  },

  async update_provider ({ commit }, id, provider) {
    const res = await this.$repositories.provider.update(id, provider)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { provider } = data
      commit('SET_PROVIDER', data.data)
    } else {
      // Handle error here
    }
  },

  async delete_provider ({ commit }, id) {
    const res = await this.$repositories.provider.delete(id)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
      // Remove from store
    } else {
      // Handle error here
    }
  }
}
