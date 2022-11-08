export const state = () => ({
  shops: [],
  shop: []
})

export const mutations = {
  SET_SHOPS (state, shops) {
    state.shops = shops
  },
  SET_SHOP (state, shop) {
    state.shop = shop
  }
}

export const actions = {
  async get_shops ({ commit }) {
    const res = await this.$repositories.shop.all()
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
      //   const { shops } = data.data
      commit('SET_SHOPS', data.data)
    } else {
      // Handle error here
    }
  },

  async get_shop ({ commit }, shop) {
    const res = await this.$repositories.shop.show(shop)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { shop } = data
      commit('SET_SHOP', data.data)
    } else {
      // Handle error here
    }
  },

  async create_shop ({ commit }, shop) {
    const res = await this.$repositories.shop.create(shop)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { shop } = data
      commit('SET_SHOP', data.data)
    } else {
      // Handle error here
    }
  },

  async update_shop ({ commit }, id, shop) {
    const res = await this.$repositories.shop.update(id, shop)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
    //   const { shop } = data
      commit('SET_SHOP', data.data)
    } else {
      // Handle error here
    }
  },

  async delete_shop ({ commit }, id) {
    const res = await this.$repositories.shop.delete(id)
    const { status, data } = res
    if (status === 200 && data.status === 1 && data.data) {
      // Remove from store
    } else {
      // Handle error here
    }
  }
}
