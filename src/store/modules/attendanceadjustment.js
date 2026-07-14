import crud from '../../api/crud'

const state = () => ({
  model: {
    name: "attendanceadjustments" ,
    title: "ការកែតម្រូវវត្តមាន" 
  },
  records: [] ,
  record: null ,
})

const getters = {
  getRecords (state) { return state.records },
  getRecord (state) { return state.record }
}

const actions = {
  async list ({ state },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name + "?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  async create ({ state },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/create",params)
  },
  async update ({ state },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/update",params)
  },
  async delete ({ state },params) {
    return await crud.delete(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id+"/delete")
  }
}

const mutations = {
  setRecords (state, records) { state.records = records },
  setRecord (state, record) { state.record = record }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
