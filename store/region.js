export const state = () => ({
  regions: [],
  region: []
})

export const mutations = {
  SET_REGIONS (state, regions) {
    state.regions = regions
  },
  SET_REGION (state, region) {
    state.region = region
  }
}
export const actions = {
  async getRegions ({ commit }) {
    // const res = await this.$repositories.region.all()
    // const { status, data } = res
    // if (status === 200 && data.status === 1 && data.data) {
    // //   const { regions } = data.data
    //   commit('SET_REGIONS', data.data)
    // } else {
    // // Handle error here
    // }
    await this.$baseRepository.all('regions', (data) => {
      commit('SET_REGIONS', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },

  async getRegion ({ commit }, region) {
    const res = await this.$repositories.region.show(region)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { region } = data
      commit('SET_REGION', data.data)
    } else {
    // Handle error here
    }
  },

  async createRegion ({ commit }, payload) {
    await this.$baseRepository.create('regions', payload, (data) => {
      commit('SET_REGION', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },

  async updateRegion ({ commit }, id, region) {
    await this.$repositories.region.update(`regions/${id}`, region, (data) => {
      commit('SET_REGION', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },

  async deleteRegion ({ commit }, id) {
    const res = await this.$repositories.region.delete(id)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    // Remove from store
    } else {
    // Handle error here
    }
  }
}
