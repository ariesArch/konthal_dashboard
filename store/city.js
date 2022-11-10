export const state = () => ({
  city: [],
  cities: []
})

export const mutations = {
  SET_CITIES (state, cities) {
    state.cities = cities
  },
  SET_CITY (state, city) {
    state.city = city
  }
}

export const actions = {
  async get_cities ({ commit }) {
    const res = await this.$repositories.city.all()
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
      commit('SET_CITIES', data.data)
    } else {
    // Handle error here
    }
  },
  async get_city ({ commit }, city) {
    const res = await this.$repositories.city.show(city)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
      commit('SET_CITY', data.data)
    } else {
      // Handle error here
    }
  },
  async create_city ({ commit }, city) {
    const res = await this.$repositories.city.create(city)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
      commit('SET_CITY', data.data)
    } else {
      // Handle error here
    }
  },
  async update_city ({ commit }, id, city) {
    const res = await this.$repositories.city.update(id, city)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
      commit('SET_CITY', data.data)
    } else {
      // Handle error here
    }
  },
  async delete_city ({ commit }, id) {
    const res = await this.$repositories.city.delete(id)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
      // remove from store
    } else {
      // Handle error here
    }
  }
}
