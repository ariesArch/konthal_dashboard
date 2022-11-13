export const state = () => ({
  error: {
    errorStatus: '',
    errorMessage: '',
    hasError: false
  }
})
export const mutations = {
  SET_ERROR (state, payload) {
    state.error.errorStatus = payload.status ?? 404
    state.error.errorMessage = payload.message
    state.error.hasError = true
  },
  CLEAR_ERROR (state) {
    state.error = {
      errorStatus: '',
      errorMessage: '',
      hasError: false
    }
  }
}
export const getters = {
  error: ({ error }) => (error)
}
