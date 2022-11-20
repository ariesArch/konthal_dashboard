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
  async getCities ({ commit }) {
    // const res = await this.$baseRepository.all('cities')
    // const { status, data } = res
    // if (status === 200 && data.status === 1 && data.data) {
    //   commit('SET_CITIES', data.data)
    // } else {
    // // Handle error here
    // }
    // await this.$baseRepository.all('cities', 'city/SET_CITIES')
    // await this.$baseRepository.all('cities', (data) => {
    //   commit('SET_CITIES', data)
    // })
    // await this.$baseRepository.all('cities', (res) => {
    //   if (res.status === 200 && res.data.status === 1 && res.data.data) {
    //     commit('SET_CITIES', res.data.data)
    //   } else {
    //     alert('eRRor')
    //     // Handle error here
    //   }
    // })
    await this.$baseRepository.all('cities', (data) => {
      commit('SET_CITIES', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },
  // async getCity ({ commit }, city) {
  //   const res = await this.$repositories.city.show(city)
  //   const { status, data } = res
  //   if (status === 200 && data.status === 1 && data.data) {
  //     commit('SET_CITY', data.data)
  //   } else {
  //     // Handle error here
  //   }
  // },
  async createCity ({ commit }, payload) {
    await this.$baseRepository.create('cities', payload, (data) => {
      commit('SET_CITY', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },
  async updateCity ({ commit }, id, city) {
    await this.$repositories.city.update(`cities/${id}`, city, (data) => {
      commit('SET_CITY', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },
  async deleteCity ({ commit }, id) {
    const res = await this.$repositories.city.delete(id)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
      // remove from store
    } else {
      // Handle error here
    }
  }
}
