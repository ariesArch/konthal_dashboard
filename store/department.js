export const state = () => ({
  department: [],
  departments: []
})

export const mutations = {
  SET_DEPARTMENTS (state, departments) {
    state.departments = departments
  },
  SET_DEPARTMENT (state, department) {
    state.department = department
  }
}

export const actions = {
  async getDepartments ({ commit }) {
    // const res = await this.$repositories.department.all()
    // const { status, data } = res
    // if (status === 200 && data.status === 1 && data.data) {
    //   commit('SET_DEPARTMENTS', data.data)
    // } else {
    // // Handle error here
    // }
    await this.$baseRepository.all('departments', (data) => {
      commit('SET_DEPARTMENTS', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },
  async getDepartment ({ commit }, payload) {
    await this.$baseRepository.create('departments', payload, (data) => {
      commit('SET_DEPARTMENT', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },
  async createDepartment ({ commit }, department) {
    const res = await this.$repositories.department.create(department)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
      commit('SET_DEPARTMENT', data.data)
    } else {
    // Handle error here
    }
  },
  async updateDepartment ({ commit }, id, department) {
    const res = await this.$repositories.department.update(id, department)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
      commit('SET_DEPARTMENT', data.data)
    } else {
    // Handle error here
    }
  },
  async deleteDepartment ({ commit }, id) {
    const res = await this.$repositories.department.delete(id)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    // remove from store
    } else {
    // Handle error here
    }
  }
}
