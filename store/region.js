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
  async get_regions ({ commit }) {
    const res = await this.$repositories.region.all()
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { regions } = data.data
      commit('SET_REGIONS', data.data)
    } else {
    // Handle error here
    }
  },

  async get_region ({ commit }, region) {
    const res = await this.$repositories.region.show(region)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { region } = data
      commit('SET_REGION', data.data)
    } else {
    // Handle error here
    }
  },

  async create_region ({ commit }, region) {
    const res = await this.$repositories.region.create(region)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { region } = data
      commit('SET_REGION', data.data)
    } else {
    // Handle error here
    }
  },

  async update_region ({ commit }, id, region) {
    const res = await this.$repositories.region.update(id, region)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { region } = data
      commit('SET_REGION', data.data)
    } else {
    // Handle error here
    }
  },

  async delete_region ({ commit }, id) {
    const res = await this.$repositories.region.delete(id)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    // Remove from store
    } else {
    // Handle error here
    }
  }
}
