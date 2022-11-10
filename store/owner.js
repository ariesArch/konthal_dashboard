export const state = () => ({
  owners: [],
  owner: []
})

export const mutations = {
  SET_OWNERS (state, owners) {
    state.owners = owners
  },
  SET_OWNER (state, owner) {
    state.owner = owner
  }
}

export const actions = {
  async get_owners ({ commit }) {
    const res = await this.$repositories.owner.all()
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
      //   const { owners } = data.data
      commit('SET_OWNERS', data.data)
    } else {
      // Handle error here
    }
  },

  async get_shop ({ commit }, owner) {
    const res = await this.$repositories.owner.show(owner)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { owner } = data
      commit('SET_OWNER', data.data)
    } else {
      // Handle error here
    }
  },

  async create_owner ({ commit }, owner) {
    const res = await this.$repositories.owner.create(owner)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { owner } = data
      commit('SET_OWNER', data.data)
    } else {
      // Handle error here
    }
  },

  async update_owner ({ commit }, id, owner) {
    const res = await this.$repositories.owner.update(id, owner)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { owner } = data
      commit('SET_OWNER', data.data)
    } else {
      // Handle error here
    }
  },

  async delete_owner ({ commit }, id) {
    const res = await this.$repositories.owner.delete(id)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
      // Remove from store
    } else {
      // Handle error here
    }
  }
}
