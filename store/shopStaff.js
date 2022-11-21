export const state = () => ({
  shopStaffs: [],
  shopStaff: []
})

export const mutations = {
  SET_SHOPSTAFFS (state, shopStaffs) {
    state.shopStaffs = shopStaffs
  },
  SET_SHOPSTAFF (state, shopStaff) {
    state.shopStaff = shopStaff
  }
}
export const actions = {
  async getShopStaffs ({ commit }) {
    // const res = await this.$repositories.shopStaff.all()
    // const { status, data } = res
    // if (status === 200 && data.status === 1 && data.data) {
    // //   const { shopStaffs } = data.data
    //   commit('SET_shopStaffs', data.data)
    // } else {
    // // Handle error here
    // }
    await this.$baseRepository.all('shop_staffs', (data) => {
      commit('SET_SHOPSTAFFS', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },

  async createShopStaff ({ commit }, payload) {
    await this.$baseRepository.create('shop_staffs', payload, (data) => {
      commit('SET_SHOPSTAFF', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  },
  async updateShopStaff ({ commit }, [id, shopStaff]) {
    await this.$repositories.shop_staff.update(id, shopStaff, (data) => {
      commit('SET_SHOPSTAFF', data)
    }, (message) => {
      commit('SET_ERROR', { message }, { root: true })
    })
  }

}
