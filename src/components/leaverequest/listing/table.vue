<template>
  <div class="relative" >
    <div class="flex title-bar border-b border-gray-200">
      <div class="flex w-64 h-10 py-1 title " >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" d="M112 48v416M400 48v416M112 144h48M400 144h48M112 240h48M400 240h48M112 336h48M400 336h48"></path><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M88 48H64v416h24M448 48h-24v416h24"></path></svg>
        <div class="font-moul ml-2 leading-9" v-html="model.title" ></div>
      </div>
      <div class="flex-grow action-buttons flex-row-reverse flex">
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
                <svg class="absolute right-1 top-2 w-6 h-6 text-gray-400 cursor-pointer" @click="filterRecords(false)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z" fill="currentColor"></path></g></svg>
              </div>
            </template>
            សូមបញ្ចូលពាក្យគន្លឹះដើម្បីស្វែងរក
          </n-tooltip>
        </div>
      </div>
    </div>
    <div class="vcb-table-panel relative">
      <Transition name="fade" >
        <div v-if="Array.isArray( table.records.matched ) && table.records.matched.length > 0 " class="vcb-thumbnail mb-12" >
          <table class="vcb-table" >
            <thead>
              <tr class="vcb-table-row bg-gray-100" >
                <th class="text-center" >ល.រ</th>
                <th class="text-left" >បុគ្គលិក</th>
                <th class="text-center" >ប្រភេទ</th>
                <th class="text-center" >ថ្ងៃចាប់ផ្ដើម</th>
                <th class="text-center" >ថ្ងៃបញ្ចប់</th>
                <th class="text-center" >ស្ថានភាព</th>
                <th class="w-14" ></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in table.records.matched" :key='index' :class=" ( index % 2 ? ' bg-gray-100 ' : '' ) " >
                <td class="text-center" >{{ $toKhmer( index + 1 ) }}</td>
                <td class="text-left" >{{ record.officer && record.officer.people ? record.officer.people.lastname + ' ' + record.officer.people.firstname : '' }}</td>
                <td class="text-center" >{{ leaveTypes[record.type] || record.type }}</td>
                <td class="text-center" >{{ $toKhmer( dateFormat( new Date( record.start ) , 'dd-mm-yyyy' ) ) }}</td>
                <td class="text-center" >{{ $toKhmer( dateFormat( new Date( record.end ) , 'dd-mm-yyyy' ) ) }}</td>
                <td class="text-center" >
                  <n-tag :type="record.approved == 1 ? 'success' : (record.approved == 0 ? 'warning' : 'error')" size="small">
                    {{ record.approved == 1 ? 'បានអនុម័ត' : (record.approved == 0 ? 'រង់ចាំ' : 'បដិសេធ') }}
                  </n-tag>
                </td>
                <td class="relative" >
                  <table-actions-form v-bind:model="model" v-bind:record="record" :onClose="closeActions" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Transition>
      <div v-if="!Array.isArray( table.records.matched ) || table.records.matched.length <= 0 " class="w-full text-center py-10 text-gray-400" >មិនមានព័ត៌មានដែលអ្នកកំពុងស្វែងរកឡើយ។</div>
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
    </div>
    <create-widget :model="model" :show="showCreate" @close="closeCreate" @saved="onSaved" />
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import dateFormat from "dateformat"
import TableActionsForm from './actions/table-action.vue'
import CreateWidget from './../widgets/create.vue'

export default {
  name: "LeaveRequestTable",
  components: { TableActionsForm, CreateWidget },
  setup(){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    const showCreate = ref(false)

    const leaveTypes = {
      'sick': 'ឈឺ',
      'maternity': 'សម្រាកកាយ',
      'marriage': 'រៀបការ',
      'funeral': 'បុណ្យសព',
      'annual': 'ប្រចាំឆ្នាំ',
      'personal': 'ផ្ទាល់ខ្លួន'
    }

    var model = reactive({
      name: "leaverequests",
      title: "សំណើរឈប់សម្រាក"
    })
    var table = reactive({
      loading: false,
      search: '',
      records: { all: [], matched: [] },
      pagination: { perPage: 20, page: 1, totalPages: 0, totalRecords: 0, start: 0, end: 0, buttons: [] }
    })

    function showCreateModal(){ showCreate.value = true }
    function closeCreate(){ showCreate.value = false }
    function onSaved(){ showCreate.value = false; getRecords() }

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
        if( table.records.matched.length <= 0 ) { table.records.matched = table.records.all }
      } else { setTimeout( goTo(1) , 500 ) }
    }

    function getRecords(){
      window.clearTimeout()
      table.loading = true
      store.dispatch('leaverequest/list',{
        search: table.search,
        perPage: table.pagination.perPage,
        page: table.pagination.page
      }).then(res => {
        table.records.all = table.records.matched = res.data.records
        table.pagination = res.data.pagination
        var n = 5
        if( ( table.pagination.page - ( n - 1 ) ) < 1 ){ table.pagination.start = 1; table.pagination.end = table.pagination.totalPages > 9 ? 9 : table.pagination.totalPages }
        else { table.pagination.start = table.pagination.page - ( n - 1 ); table.pagination.end = table.pagination.page + 4 >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 4 }
        table.pagination.buttons = []
        for(var i=table.pagination.start;i<=table.pagination.end;i++){ table.pagination.buttons.push(i) }
        closeTableLoading()
      }).catch( err => { console.log( err ) })
    }
    function closeTableLoading(){ table.loading = false }
    function previous(){ goTo( table.pagination.page <= 1 ? 1 : table.pagination.page - 1 ) }
    function next(){ goTo( table.pagination.page >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 1 ) }
    function goTo(page){ table.pagination.page = page > table.pagination.totalPages ? table.pagination.totalPages : ( page < 1 ? 1 : page); getRecords() }
    function closeActions( actionStatus ){ if( parseInt( actionStatus ) > 0 ) getRecords() }

    getRecords()

    return {
      model, table, leaveTypes, showCreate,
      filterRecords, goTo, previous, next, closeTableLoading, closeActions,
      showCreateModal, closeCreate, onSaved,
      dateFormat
    }
  }
}
</script>
<style scoped>
.vcb-table thead tr { @apply bg-gray-200; }
.vcb-table thead tr th { @apply p-1; }
.vcb-table tbody tr td { @apply p-1; }
</style>
