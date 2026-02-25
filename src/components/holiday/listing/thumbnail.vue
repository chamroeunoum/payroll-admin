<template>
  <div class="relative" >
  <!-- Top action panel of crud -->
    <div class="flex title-bar border-b border-gray-200">
      <!-- Title of crud -->
      <div class="flex w-64 h-10 py-1 title " >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 384 512"><path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM64 72c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8V72zm0 64c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16zm192.81 248H304c8.84 0 16 7.16 16 16s-7.16 16-16 16h-47.19c-16.45 0-31.27-9.14-38.64-23.86c-2.95-5.92-8.09-6.52-10.17-6.52s-7.22.59-10.02 6.19l-7.67 15.34a15.986 15.986 0 0 1-14.31 8.84c-.38 0-.75-.02-1.14-.05c-6.45-.45-12-4.75-14.03-10.89L144 354.59l-10.61 31.88c-5.89 17.66-22.38 29.53-41 29.53H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h12.39c4.83 0 9.11-3.08 10.64-7.66l18.19-54.64c3.3-9.81 12.44-16.41 22.78-16.41s19.48 6.59 22.77 16.41l13.88 41.64c19.77-16.19 54.05-9.7 66 14.16c2.02 4.06 5.96 6.5 10.16 6.5zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z" fill="currentColor"></path></svg>
        <div class="font-moul ml-2 leading-9" v-html="model.title" ></div>
      </div>
      <!-- Actions button of the crud -->
      <div class="flex-grow action-buttons flex-row-reverse flex">
        <!-- New Button -->
        <div class="mt-1 ml-2 flex flex-wrap">
          <n-tooltip trigger="hover">
            <template #trigger>
              <svg class="w-8 h-8 cursor-pointer hover:text-green-500 duration-300" @click="showCreateModal()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9 12h6"></path><path d="M12 9v6"></path></g></svg>
            </template>
            បន្ថែមទិន្នន័យថ្មី
          </n-tooltip>
        </div>
        <div class="w-3/5 md:w-2/5 relative" >
          <n-tooltip trigger="hover">
            <template #trigger>
              <div class="w-full relative" >
                <input type="text" @keypress.enter="filterRecords(false)" v-model="table.search" class="bg-gray-100 px-2 h-8 my-1 w-full rounded border border-gray-200 focus:border-blue-600 hover:border-blue-600 duration-300" placeholder="ស្វែងរក" />
                <svg class="absolute right-1 top-2 w-6 h-6 text-gray-400  cursor-pointer" @click="filterRecords(false)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z" fill="currentColor"></path></g></svg>
              </div>
            </template>
            សូមបញ្ចូលពាក្យគន្លឹះដើម្បីស្វែងរក
          </n-tooltip>
        </div>
        <div class="mt-1 mr-2 flex flex-wrap">
          <n-tooltip trigger="hover">
            <template #trigger>
              <svg class="w-7 h-7 p-1 bg-white rounded-full border border-gray-300 cursor-pointer hover:text-green-500 duration-300" @click="toggleFilter()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M18 28h-4a2 2 0 0 1-2-2v-7.59L4.59 11A2 2 0 0 1 4 9.59V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v3.59a2 2 0 0 1-.59 1.41L20 18.41V26a2 2 0 0 1-2 2zM6 6v3.59l8 8V26h4v-8.41l8-8V6z" fill="currentColor"></path></svg>
            </template>
            សម្រង់ទិន្នន័យ
          </n-tooltip>
        </div>
      </div>
    </div>
    <!-- Table of crud -->
    <div class="vcb-table-panel relative ">
      <Transition name="fade" >
        <div v-if="Array.isArray( table.records.matched ) && table.records.matched.length > 0 " class="vcb-thumbnail mb-12" >
          <div v-for="(record, index) in table.records.matched" :key='index' class="item " >
            <div class="content " >
              <div v-if="record.image != false && record.image != null && record.image != undefined " class="image bg-80% bg-cover bg-center bg-no-repeat " :style=" 'background-image: url(' + record.image +');' " ></div>
              <div v-if="record.image == false || record.image == null || record.image == undefined " class="image bg-contain bg-center bg-no-repeat " :style=" 'background-image: url('+ orgLogoUrl +');' " ></div>
              <div class="flex flex-wrap " >
                <div class="w-full py-2" >
                  <div class="w-full text-center font-moul leading-6 tracking-wider" >{{ record.tenant.lastname + " " + record.tenant.firstname }} - {{ record.room.name }}</div>
                </div>
                <div class="w-full relative flex flex-wrap" >
                  <div class="w-1/2 text-left text-xs text-gray-500 leading-5 tracking-wider" >ថ្ងៃឈ្នួល<br/>{{ new Intl.NumberFormat().format(record.price) }} $</div>
                  <div class="w-1/2 text-right text-xs text-gray-500 leading-5 tracking-wide" >ថ្ងៃចាប់ផ្ដើម<br/>{{ dateFormat( record.start , 'dd-mm-yyyy' ) }}</div>
                </div>
                <div class="w-full relative flex flex-wrap" >
                  <div class="w-1/2 text-left text-xs text-gray-500 leading-5 tracking-wider" >ប្រាក់កក់<br/>{{ new Intl.NumberFormat().format(record.deposit) }} $</div>
                  <div class="w-1/2 text-right text-xs text-gray-500 leading-5 tracking-wide" >ថ្ងៃបញ្ចប់<br/>{{ dateFormat( record.end , 'dd-mm-yyyy' ) }}</div>
                </div>
                <div class="w-full relative flex flex-wrap" >
                  <div class="w-1/2 text-left text-xs text-gray-500 leading-5 tracking-wider" >ប្រាក់សោហ៊ុយ<br/>{{ new Intl.NumberFormat().format(record.commission) }} $</div>
                  <div class="w-1/2 text-right text-xs text-gray-500 leading-5 tracking-wide" >ចំនួនថ្ងៃនៅសល់<br/>{{ record.left_days }}</div>
                </div>
              </div>
              <thumbnail-actions-form v-bind:model="model" v-bind:record="record" :onClose="closeActions" />
              <!-- Status of the account -->
              <!-- <n-tooltip v-if="record.roles != undefined && record.roles.find( (role) => role.id >= 2 ) != undefined " trigger="hover">
                <template #trigger>
                  <div :class="'action w-6 h-6 rounded-full absolute left-2 top-2 font-bold text-lg leading-6 ' + ( parseInt( record.active ) == 1 ? ' text-blue-500 ' : ' text-gray-500 ') "  >{{ record.roles.map( ( r ) => r.name.substring(0,1).toUpperCase() ).join( ', ') }}</div>
                </template>
                {{ record.active == 1 ? 'គណនីនេះកំពុងបើកតំណើរការ' : 'គណនីនេះកំពុងត្រូវបានបិទមិនអាចប្រើប្រាស់បាន' }}
              </n-tooltip> -->
            </div>
          </div>
        </div>
      </Transition>
      <!-- Loading -->
      <Transition name="slide-fade" >
        <div v-if="table.loading" class="table-loading fixed flex h-screen left-0 top-10 right-0 bottom-0 bg-white bg-opacity-90 ">
          <div class="flex mx-auto items-center">
            <div class="spinner">
              <svg class="animate-spin w-16 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48s48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.491-48-48-48z" fill="currentColor"></path></svg>
              <br/><br/>កំពុងអាន...
            </div>
          </div>
          <div class="absolute top-2 right-2 cursor-pointer bg-white rounded-full " @click="closeTableLoading" >
            <svg class="w-10 mx-auto text-red-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 320l128-128"></path></svg>
          </div>
        </div>
      </Transition>
      <!-- Pagination of crud -->
      <Transition name="slide-fade" >
        <div v-if="table.pagination.totalPages > 1 " class="fixed left-0 right-0 bottom-1 flex flex-wrap" >
          <div class="vcb-table-pagination bg-blue-300 mx-auto">
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-popselect 
                  trigger="click"
                  v-model:value="table.pagination.perPage"
                  :options="[
                    { label: 5 , value: 5 } ,
                    { label: 10 , value: 10 } ,
                    { label: 20 , value: 20 } ,
                    { label: 30 , value: 30 } ,
                    { label: 40 , value: 40 } ,
                    { label: 50 , value: 50 } ,
                    { label: 100 , value: 100 } ,
                    { label: 200 , value: 200 } ,
                    { label: 500 , value: 500 } ,
                  ]"
                  size="small"
                  scrollable
                  @update:value="goTo(1)"
                >
                  <div class="cursor-pointer font-pvh rounded-full p-2 px-4 border border-gray-200 text-blue-600" >{{ $toKhmer( table.pagination.perPage ) }}</div>
                </n-popselect>
              </template>
              ចំនួនព័ត៌មានបង្ហាញម្ដង
            </n-tooltip>
            <!-- <n-tooltip trigger="hover">
              <template #trigger>
                <div class="vcb-table-pagination-info font-pvh " >{{ table.pagination.totalRecords > 0 ? $toKhmer( table.pagination.totalRecords ) + " ព័ត៌មាន" : "" }}</div>
              </template>
              ចំនួនព័ត៌មានសរុប
            </n-tooltip> -->
            <n-tooltip trigger="hover">
              <template #trigger>
                <div class="vcb-table-pagination-info font-pvh " >{{ table.pagination.totalPages > 0 ? $toKhmer( table.pagination.totalPages ) + " ទំព័រ" : "" }}</div>
              </template>
              ចំនួនទំព័រសរុប
            </n-tooltip>
            <div v-for="(page, index) in table.pagination.buttons" :key="index" :class=" (table.pagination.page == page ? ' vcb-pagination-page-active ' : ' vcb-pagination-page ' )" @click="table.pagination.page == page ? false : goTo(page) " >
              <n-tooltip trigger="hover">
                <template #trigger>
                  <div class="leading-8 text-md font-pvh " >{{ $toKhmer( page ) }} </div>
                </template>
                ទំព័រទី {{ $toKhmer( page ) }}
              </n-tooltip>
            </div>
            <Transition name="slide-fade" >
              <div v-if="table.pagination.page > 1 " class="vcb-pagination-page " v-html='"<"' @click="previous()" ></div>
            </Transition>
            <Transition name="slide-fade" >
              <div v-if="table.pagination.page < table.pagination.totalPages " class="vcb-pagination-page " v-html='">"' @click="next()" ></div>
            </Transition>
          </div>
        </div>
      </Transition>
    </div>
    <!-- Form create account -->
    <create-form v-bind:model="model" v-bind:show="createModal.show" :onClose="closeCreateModal"/>
    <!-- Filter panel of crud -->
    <Transition name="slide-fade" >
      <div v-if="filter" class="vcb-filters-panel">
        <svg @click="toggleFilter()" class="absolute bg-white rounded-full shadow p-2 right-2 top-2 w-10 h-10 border border-gray-200 cursor-pointer hover:text-green-500 duration-300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M18 28h-4a2 2 0 0 1-2-2v-7.59L4.59 11A2 2 0 0 1 4 9.59V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v3.59a2 2 0 0 1-.59 1.41L20 18.41V26a2 2 0 0 1-2 2zM6 6v3.59l8 8V26h4v-8.41l8-8V6z" fill="currentColor"></path></svg>
        <div class="filter-title font-moul" >សូមជ្រើសរើសលក្ខណ សម្រង់ទិន្នន័យ៖</div>
        <div class="filter-actions" >
          <div class="filter-action" >
            <!-- Tenant -->
            <n-select v-model:value="selectedTenants" filterable clearable multiple @update:value="filterRecords(false)" placeholder="សូមជ្រើសរើស អ្នកជួល" :options="optionTenants" />
          </div>
          <div class="filter-action" >
            <!-- Agent -->
            <n-select v-model:value="selectedAgents" filterable clearable multiple @update:value="filterRecords(false)" placeholder="សូមជ្រើសើស ភ្នាក់ងារ" :options="optionAgents" />
          </div>
          <div class="filter-action" >
            <!-- Room -->
            <n-select v-model:value="selectedRooms" filterable clearable multiple @update:value="filterRecords(false)" placeholder="សូមជ្រើសើស បន្ទប់" :options="optionRooms" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script>
import { reactive ,ref , computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import orgLogoUrl from './../../../assets/logo.jpg'
import CreateForm from './../widgets/create.vue'
import dateFormat from 'dateformat'
/**
 * CRUD component form
 */
// import CreateForm from './../widgets/create.vue'
import ThumbnailActionsForm from './actions/thumbnail-action.vue'
export default {
  name: "Contract" ,
  components: {
    QrcodeVue ,
    Vue3Barcode,
    CreateForm ,
    ThumbnailActionsForm
  },
  setup(){
    const store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    /**
     * Variables
     */    
    const model = reactive( {
      name: "contract" ,
      module: "contracts" ,
      title: "កិច្ចសន្យា"
    })
    const table = reactive( {
      loading: false ,
      search: '' ,
      records: {
        all: [] ,
        matched: []
      },
      columns: {
        searchable: {
          start: '' ,
          end: ''
        },
        format: {
          room_id: null ,
          tenant_id: null ,
          agent_id: null ,
          start: new Date() ,
          end: new Date() ,
          deposit: 0 ,
          commission: 0 ,
          desp: '' ,
          pdf : null ,
          image: null
        }
      } ,
      pagination: {
        perPage: 20 ,
        page: 1 ,
        totalPages: 0 ,
        totalRecords: 0 ,
        start: 0 ,
        end: 0 ,
        buttons: []
      }
    })

    /**
     * Functions
     */
    function getRecords(){
      /**
       * Clear time interval after calling
       */
      window.clearTimeout()
      table.loading = true
      store.dispatch(model.name+'/list',{
        search: table.search ,
        perPage: table.pagination.perPage ,
        page: table.pagination.page 
        // ,
        // positions: selectedPositions.value ,
        // organizations: selectedOrganizations.value ,
      }).then(res => {
        table.records.all = table.records.matched = res.data.records
        table.pagination = res.data.pagination
        
        var paginationNumberList = 10
        if( ( table.pagination.page - ( parseInt( paginationNumberList / 2 ) + 1 ) ) < 1 ){
          table.pagination.start = 1
          table.pagination.end = table.pagination.totalPages > paginationNumberList ? paginationNumberList : table.pagination.totalPages
        }
        else{
          table.pagination.start = table.pagination.page - parseInt( paginationNumberList / 2 )
          table.pagination.end = table.pagination.page >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + parseInt( paginationNumberList / 2 )
        }
        /**
         * Create pagination buttons
         */
        table.pagination.buttons = []
        for(var i=table.pagination.start;i<=table.pagination.end;i++){
          i <= table.pagination.totalPages ? table.pagination.buttons.push(i) : false
        }

        closeTableLoading()
      }).catch( err => {
        console.log( err )
      })
    }
    function closeTableLoading(){
      table.loading = false
    }
    /**
     * Pagination functions
     */
    function previous(){
      goTo( table.pagination.page <= 1 ? 1 : table.pagination.page - 1 )
    }
    function next(){
      goTo( table.pagination.page >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 1 )
    }
    function goTo(page){
      table.pagination.page = page > table.pagination.totalPages ? table.pagination.totalPages : ( page < 1 ? 1 : page)
      getRecords()
    }
    function updatePerpage(perPage){
      table.pagination.perPage = perPage < 5 ? 5 : ( perPage > 100 ? 100 : perPgae )
      table.pagination.page = 1
      getRecords()
    }

    /**
     * Create modal handling
     */
    var createModal = reactive({show:false})
    function showCreateModal(){
      createModal.show = true
    }

    function closeCreateModal( actionStatus ){
      createModal.show = false
      if( parseInt( actionStatus ) > 0 ) getRecords()
    }

    function closeActions( actionStatus ){
      if( parseInt( actionStatus ) > 0 ) getRecords()
    }
    

    /**
     * Load organizations
     */
    const selectedRooms = ref(null)
    const optionRooms = computed( () => {
      let rooms = store.getters['room/records'].all.map( ( p ) => { return { label : p.name + ' ' + p.number , value : p.id } })
      rooms.unshift({ label: 'សូមជ្រើសរើស បន្ទប់' , value: null })
      return rooms
    })
    function getRooms(){
      store.dispatch('room/list',{
        page: 1 ,
        perPage: 1000 ,
        search: '' ,
        id: 0
      }).then(res=>{
        store.commit('room/setAllRecords',res.data.records)
      }).catch(err =>{
        notify.error({
          title: 'អានព័ត៌មាន' ,
          description: 'មានបញ្ហាពេលអាន។'
        })
        console.log( err )
      })
    }

    /**
     * Load positions
     */
    const selectedTenants = ref(null)
    const optionTenants = computed( () => {
      let tenants = store.getters['tenant/records'].all.map( ( p ) => { return { label : p.lastname + " " + p.firstname , value : p.id } })
      tenants.unshift({ label: 'សូមជ្រើសរើស អ្នកជួល' , value: null })
      return tenants
    })
    function getTenants(){
      store.dispatch('tenant/list',{
        page: 1 ,
        perPage: 1000 ,
        search: ''
      }).then(res=>{
        store.commit('tenant/setAllRecords',res.data.records)
      }).catch(err =>{
        notify.error({
          title: 'អានព័ត៌មាន' ,
          description: 'មានបញ្ហាពេលអាន។'
        })
        console.log( err )
      })
    }

    /**
     * Get Services
     */
    function getServices(){
      store.dispatch('service/list',{
        page: 1 ,
        perPage: 1000 ,
        search: ''
      }).then(res=>{
        store.commit('service/setAllRecords',res.data.records)
      }).catch(err =>{
        notify.error({
          title: 'អានព័ត៌មាន' ,
          description: 'មានបញ្ហាពេលអាន។'
        })
        console.log( err )
      })
    }

    /**
     * Load organizations
     */
    const selectedAgents = ref(null)
    const optionAgents = computed( () => {
      let agents = store.getters['agent/records'].all.map( ( p ) => { return { label : p.lastname + " " + p.firstname , value : p.id } })
      agents.unshift({ label: 'សូមជ្រើសរើស ភ្នាក់ងារ' , value: null })
      return agents
    })
    function getAgents(){
      store.dispatch('agent/list',{
        page: 1 ,
        perPage: 1000 ,
        search: '' ,
        id: 0
      }).then(res=>{
        store.commit('agent/setAllRecords',res.data.records)
      }).catch(err =>{
        notify.error({
          title: 'អានព័ត៌មាន' ,
          description: 'មានបញ្ហាពេលអាន។'
        })
        console.log( err )
      })
    }

    const filter = ref(false)
    function filterRecords(helper=true){
      if( helper ){
        table.records.matched = []
        if( table.search != "" ) {
          for(var index in table.records.all ){
            for(var field in table.records.all[index] ){
              if( (""+table.records.all[index][field]).includes( table.search ) !== false ) {
                table.records.matched.push( table.records.all[index] )
                break;
              }
            }
          }
        }
        if( table.records.matched.length <= 0 ) {
          table.records.matched = table.records.all
        }
      }else{
        setTimeout( function(){
          table.pagination.page = 1 
          getRecords()
        } , 500 )
      }
    }
    function toggleFilter(){
      filter.value = !filter.value
    }
    /**
     * Initial the data
     */
    getRecords()
    getRooms()
    getTenants()
    getAgents()
    getServices()


    return {
      /**
       * Variables
       */
      model ,
      table ,
      orgLogoUrl ,
      /**
       * Table
       */
      filterRecords ,
      /**
       * Pagination functions
       */
      updatePerpage ,
      goTo ,
      previous ,
      next ,
      /**
       * Loading overlay
       */
      closeTableLoading ,
      /**
       * Creating
       */
      createModal ,
      showCreateModal ,
      closeCreateModal ,
      closeActions ,
      /**
       * Functions
       */
      toggleFilter ,
      filterRecords ,
      filter ,
      /**
      * Filters
      */
      optionTenants ,
      selectedTenants ,
      optionAgents ,
      selectedAgents ,
      optionRooms ,
      selectedRooms ,
      dateFormat
    }
  }
}

</script>
<style type="text/css" scoped >
.vcb-thumbnail {
  @apply flex flex-wrap justify-center;
}
.vcb-thumbnail .item {
  @apply xl:w-1/4 lg:w-1/3 md:w-1/3 sm:w-1/3 w-1/2 py-6 px-2 ;
}
.vcb-thumbnail .item .content {
  @apply border rounded-lg hover:shadow duration-500 p-4 relative hover:scale-105 transform-gpu bg-white hover:bg-yellow-100;
  min-height: 10rem;
}
.vcb-thumbnail .item .content .image {
  @apply border rounded-full border-gray-200 p-2 w-12 h-12 flex-none mx-auto overflow-hidden bg-white absolute left-2 -top-6 ;
}
.vcb-filters-panel {
  @apply fixed left-0 top-10 right-0 bottom-0 bg-opacity-60 bg-white ;
}
.vcb-filters-panel .filter-title {
  @apply w-full text-left p-4 bg-white rounded-lg ;
}
.vcb-filters-panel .filter-actions {
  @apply w-full text-left p-4 flex flex-wrap justify-center;
}
.vcb-filters-panel .filter-actions .filter-action {
  @apply p-2 m-2 bg-white rounded-lg shadow border border-gray-300 w-4/6 sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-2/6 ;
}
</style>