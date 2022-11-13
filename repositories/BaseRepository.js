export default ($axios, store) => ({
  // async all (resource, mutation) {
  //   const { data, status } = await $axios.get(`${resource}`)
  //   console.log(status)
  //   if (status === 200 && data.status === 1 && data.data) {
  //     store.commit(mutation, data.data)
  //   } else {
  //   // Handle error here
  //   }
  // },
  // async all (resource, callback) {
  //   const { data, status } = await $axios.get(`${resource}`)
  //   console.log(status)
  //   if (status === 200 && data.status === 1 && data.data) {
  //     callback(data.data)
  //   } else {
  //     // Handle error here
  //   }
  // },
  // async all (resource, callback) {
  //   const res = await $axios.get(`${resource}`)
  //   callback(res)
  // },
  async all (resource, resolve, reject) {
    try {
      const { data, status, message } = (await $axios.get(`${resource}`)).data
      if (status === 1 && data) {
        resolve(data)
      } else {
        reject({ status, message })
      }
    } catch (error) {
      reject({ error })
    }
  },

  show (resource, id) {
    return $axios.get(`${resource}/${id}`)
  },

  async create (resource, payload, resolve, reject) {
    // return $axios.post(`${resource}`, payload)
    try {
      const { data, status, message } = (await $axios.post(`${resource}`, payload)).data
      if (status === 1 && data) {
        resolve(data)
      } else {
        reject({ status, message })
      }
    } catch (error) {
      reject(error)
    }
  },

  update (resource, id, payload) {
    return $axios.post(`${resource}/${id}`, payload)
  },

  delete (resource, id) {
    return $axios.delete(`${resource}/${id}`)
  }
})
