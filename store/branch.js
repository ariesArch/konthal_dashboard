export const state = () => ({
  branches: [],
  branch: []
})

export const mutations = {
  SET_BRANCHES (state, branches) {
    state.branches = branches
  },
  SET_BRANCH (state, branch) {
    state.branch = branch
  }
}

export const actions = {
  async getBranches ({ commit }) {
    // const res = await this.$repositories.branch.all()
    // const { status, data } = res
    // if (status === 200 && data.status === 1 && data.data) {
    //   //   const { branches } = data.data
    //   commit('SET_BRANCHES', data.data)
    // } else {
    //   // Handle error here
    // }
    await this.$baseRepository.all('branches', (data) => {
      commit('SET_BRANCHES', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },

  // async getBranch ({ commit }, branch) {
  //   const res = await this.$repositories.branch.show(branch)
  //   const { status, data } = res
  //   if (status === 200 && data.status === 1 && data.data) {
  //   //   const { branch } = data
  //     commit('SET_BRANCH', data.data)
  //   } else {
  //     // Handle error here
  //   }
  // },

  // async createBranch ({ commit }, branch) {
  //   const res = await this.$repositories.branch.create(branch)
  //   const { status, data } = res
  //   if (status === 200 && data.status === 1 && data.data) {
  //   //   const { branch } = data
  //     commit('SET_BRANCH', data.data)
  //   } else {
  //     // Handle error here
  //   }
  // }
  async createBranch ({ commit }, payload) {
    await this.$baseRepository.create('branches', payload, (data) => {
      commit('SET_BRANCH', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },

  // async updateBranch ({ commit }, id, branch) {
  //   const res = await this.$repositories.branch.update(id, branch)
  //   const { status, data } = res
  //   if (status === 200 && data.status === 1 && data.data) {
  //   //   const { branch } = data
  //     commit('SET_BRANCH', data.data)
  //   } else {
  //     // Handle error here
  //   }
  // },

  // async deleteBranch ({ commit }, id) {
  //   const res = await this.$repositories.branch.delete(id)
  //   const { status, data } = res
  //   if (status === 200 && data.status === 1 && data.data) {
  //     // Remove from store
  //   } else {
  //     // Handle error here
  //   }
  // }
  async updateBranch ({ commit }, id, branch) {
    await this.$repositories.branch.update(id, branch, (data) => {
      commit('SET_BRANCH', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  }
}
