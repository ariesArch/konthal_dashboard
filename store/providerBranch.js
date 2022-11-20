export const state = () => ({
  providerBranches: [],
  providerBranch: []
})

export const mutations = {
  SET_PROVIDERBRANCHES (state, providerBranches) {
    state.providerBranches = providerBranches
  },
  SET_PROVIDERBRANCH (state, provider) {
    state.provider = provider
  }
}

export const actions = {
  async getProviderBranches ({ commit }) {
    // const res = await this.$repositories.provider.all()
    // const { status, data } = res
    // if (status === 200 && data.status === 1 && data.data) {
    //   //   const { providerBranches } = data.data
    //   commit('SET_PROVIDERBRANCHES', data.data)
    // } else {
    //   // Handle error here
    // }
    await this.$baseRepository.all('provider_branches', (data) => {
      commit('SET_PROVIDERBRANCHES', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },
  async createProviderBranch ({ commit }, payload) {
    await this.$baseRepository.create('provider_branches', payload, (data) => {
      commit('SET_PROVIDERBRANCH', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  }

}
