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
  async get_departments ({ commit }) {
    const res = await this.$repositories.department.all()
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
      commit('SET_DEPARTMENTS', data.data)
    } else {
    // Handle error here
    }
  },
  async get_department ({ commit }, department) {
    const res = await this.$repositories.department.show(department)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
      commit('SET_DEPARTMENT', data.data)
    } else {
    // Handle error here
    }
  },
  async create_department ({ commit }, department) {
    const res = await this.$repositories.department.create(department)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
      commit('SET_DEPARTMENT', data.data)
    } else {
    // Handle error here
    }
  },
  async update_department ({ commit }, id, department) {
    const res = await this.$repositories.department.update(id, department)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
      commit('SET_DEPARTMENT', data.data)
    } else {
    // Handle error here
    }
  },
  async delete_department ({ commit }, id) {
    const res = await this.$repositories.department.delete(id)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    // remove from store
    } else {
    // Handle error here
    }
  }
}
