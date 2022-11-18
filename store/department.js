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
  async getDepartment ({ commit }, department) {
    const res = await this.$repositories.department.show(department)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { department } = data
      commit('SET_DEPARTMENT', data.data)
    } else {
    // Handle error here
    }
  },
  async createDepartment ({ commit }, department) {
    await this.$baseRepository.create('departments', department, (data) => {
      commit('SET_DEPARTMENT', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },
  async updateDepartment ({ commit }, id, department) {
    await this.$repositories.department.update(`departments/${id}`, department, (data) => {
      commit('SET_DEPARTMENT', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
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
