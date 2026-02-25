import crud from '../../api/crud'

// initial state
const state = () => ({
  model: {
    name: "salaries" ,
    title: "ប្រាក់បៀរវដ្ត" 
  },
  records: [] ,
  record: null ,

})

// getters
const getters = {
  getRecords (state, getters, rootState) {
    return state.records
  },
  getRecord (state, getters, rootState) {
    return state.record
  }
}

// actions
const actions = {
  async list ({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name + "?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page ,
        positions: Array.isArray( params.positions ) && params.positions.length > 0 ? params.positions : [] ,
        organizations: Array.isArray( params.organizations ) && params.organizations.length > 0 ? params.organizations : [] ,
        officerids: Array.isArray( params.officerids ) && params.officerids.length > 0 ? params.officerids : [] ,
        year : params.year != undefined && params.year > 0 ? params.year : '' ,
        month : params.month != undefined && params.month > 0 ? params.month : ''
      }).toString()
    )
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id+'/read')
  },
  async generateSalaries ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/generatesalaries",params)
  },
  async upload({ state, commit, rootState },formData) {    
    return await crud.upload(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/upload",formData)
  },
}

// mutations
const mutations = {
  // increment (state) {
  //   // `state` is the local module state
  //   state.count++
  // }
  setRecords (state, records) {
    state.records = records
  },
  setRecord (state, record) {
    state.record = record
  },

  // decrementProductInventory (state, { id }) {
  //   const product = state.all.find(product => product.id === id)
  //   product.inventory--
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}