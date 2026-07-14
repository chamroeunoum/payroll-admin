import crud from '../../api/crud'

const state = () => ({
  biData: null,
  loading: false,
})

const getters = {
  getBiData: (state) => state.biData,
  isLoading: (state) => state.loading,
}

const actions = {
  async fetchBi({ commit }, params = {}) {
    commit('setLoading', true)
    try {
      const { year, month } = params
      const query = new URLSearchParams()
      if (year) query.append('year', year)
      if (month) query.append('month', month)
      const qs = query.toString()
      const url = import.meta.env.VITE_API_SERVER + '/dashboard/bi' + (qs ? '?' + qs : '')
      const res = await crud.list(url)
      commit('setBiData', res.data.data || null)
      return res.data
    } catch (err) {
      console.error('Dashboard BI fetch error:', err)
      commit('setBiData', null)
      throw err
    } finally {
      commit('setLoading', false)
    }
  },
}

const mutations = {
  setBiData(state, data) {
    state.biData = data
  },
  setLoading(state, val) {
    state.loading = val
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
