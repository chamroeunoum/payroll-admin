<template>
  <div>
  <!-- Top action panel of crud -->
    <div class="flex title-bar border-b border-gray-200">
      <!-- Title of crud -->
      <div class="flex w-64 h-10 py-1 title " >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8h14v2H16z" fill="currentColor"></path><path d="M6 10.59L3.41 8L2 9.41l4 4l8-8L12.59 4L6 10.59z" fill="currentColor"></path><path d="M16 22h14v2H16z" fill="currentColor"></path><path d="M6 24.59L3.41 22L2 23.41l4 4l8-8L12.59 18L6 24.59z" fill="currentColor"></path></svg>
        <div class="font-moul ml-2 leading-9" v-html="model.title" ></div>
      </div>
      <!-- Actions button of the crud -->
      <div class="flex-grow action-buttons flex-row-reverse flex">
        <!-- New Button -->
        <!-- <div class="mt-1 ml-2">
          <n-button type="success" @click="showCreateModal()" >
            <template #icon>
              <n-icon>
                <Add20Regular />
              </n-icon>
            </template>
            បន្ថែម
          </n-button>
        </div> -->
        <div class="w-1/5 relative" >
          <input type="text" @keypress.enter="filterRecords(false)" v-model="table.search" class="bg-gray-100 px-2 h-9 my-1 w-full rounded border border-gray-200 focus:border-blue-600 hover:border-blue-600 " placeholder="ស្វែងរក" />
          <svg class="absolute w-6 h-6 right-1 top-2 text-gray-400 hover:text-blue-700 cursor-pointer" @click="filterRecords(false)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z" fill="currentColor"></path></g></svg>
        </div>
        <n-tooltip trigger="hover">
          <template #trigger>
            <router-link to="/setting" >
              <svg class="w-8 h-8 mx-1 mt-1 cursor-pointer hover:text-green-500 duration-300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M1.91 7.383a8.491 8.491 0 0 1 1.78-3.08a.5.5 0 0 1 .54-.135l1.918.686a1 1 0 0 0 1.32-.762l.366-2.006a.5.5 0 0 1 .388-.4a8.532 8.532 0 0 1 3.555 0a.5.5 0 0 1 .387.4l.367 2.006a1 1 0 0 0 1.32.762l1.918-.686a.5.5 0 0 1 .54.136a8.491 8.491 0 0 1 1.78 3.079a.5.5 0 0 1-.152.535l-1.555 1.32a1 1 0 0 0 0 1.524l1.555 1.32a.5.5 0 0 1 .152.535a8.491 8.491 0 0 1-1.78 3.08a.5.5 0 0 1-.54.135l-1.918-.686a1 1 0 0 0-1.32.762l-.367 2.007a.5.5 0 0 1-.387.399a8.53 8.53 0 0 1-3.555 0a.5.5 0 0 1-.388-.4l-.365-2.006a1 1 0 0 0-1.32-.762l-1.919.686a.5.5 0 0 1-.54-.136a8.49 8.49 0 0 1-1.78-3.079a.5.5 0 0 1 .153-.535l1.554-1.32a1 1 0 0 0 0-1.524l-1.554-1.32a.5.5 0 0 1-.153-.535zm1.061-.006l1.294 1.098a2 2 0 0 1 0 3.05L2.97 12.623c.292.782.714 1.51 1.245 2.152l1.596-.57a2 2 0 0 1 2.64 1.525l.305 1.668a7.556 7.556 0 0 0 2.485 0l.305-1.67a1.998 1.998 0 0 1 2.64-1.524l1.597.571a7.492 7.492 0 0 0 1.245-2.152l-1.294-1.098a1.998 1.998 0 0 1 0-3.05l1.294-1.098a7.491 7.491 0 0 0-1.245-2.152l-1.596.57a2 2 0 0 1-2.64-1.524l-.306-1.669a7.555 7.555 0 0 0-2.485 0l-.304 1.669a2 2 0 0 1-2.641 1.525l-1.596-.571a7.491 7.491 0 0 0-1.245 2.152zM7.5 10a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0zm1 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 0 0-3 0z" fill="currentColor"></path></g></svg>
            </router-link>
          </template>
          ត្រឡប់ទៅ ការកំណត់
        </n-tooltip>
      </div>
      <!-- Filter panel of crud -->
      <div class="filters-bar"></div>
    </div>
    <!-- Table of crud -->
    <div class="mt-4 mb-24 relative">
      <Transition name="fade" >
        <div v-if="Array.isArray( table.records.matched ) && table.records.matched.length > 0 " class="w-full flex flex-wrap justify-between vcb-thumbnail mb-12" >
          <table class="vcb-table " >
            <thead>
              <tr>
                <th>ល.រ</th>
                <th>កូដ</th>
                <th>ឈ្មោះ</th>
                <th>តួនាទី</th>
                <th>ផ្នែក</th>
                <th>វត្តមាន</th>
                <th class="w-24" >ប្រតិបត្តិការ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in table.records.matched" :key='index' :class=" 'item ' +
               ( record.attendance_calculation.Attendance.Attendance_type == 'IT' ? ' text-blue-600 ' : '' ) +
               ( record.attendance_calculation.Attendance.Attendance_type == 'AB' ? ' text-red-600 ' : '' ) +
               ( AttendanceTypes.includes( record.attendance_calculation.Attendance.Attendance_type ) ? ' text-yellow-600 ' : '' ) 
              " >
                <td>{{ $toKhmer( index + 1 ) }}</td>
                <td>{{ record.code }}</td>
                <td>{{ record.people.lastname + ' ' + record.people.firstname }}</td>
                <td>{{ record.position != undefined ? record.position.name : '' }}</td>
                <td>{{ record.organization != undefined ? record.organization.name : '' }}</td>
                <td>{{ 
                ( record.attendance_calculation.Attendance.Attendance_type == "AB" ? 'AB' : (
                  record.attendance_calculation.calculation.checktimes.length > 0
                    ? 'ចូល ' + $toKhmer( record.attendance_calculation.calculation.checktimes[0].in.checktime ) + ' - ' 
                    : ''
                  )
                ) +
                ( ( record.attendance_calculation.Attendance.Attendance_type == "AB" || record.attendance_calculation.Attendance.Attendance_type == "SN" || record.attendance_calculation.Attendance.Attendance_type == "SA" || record.attendance_calculation.Attendance.Attendance_type == "HL" ) && ( record.attendance_calculation != undefined && record.attendance_calculation.calculation != undefined && record.attendance_calculation.calculation.total > 0 )
                  ? (
                    ( record.attendance_calculation.calculation.total / 60 > 0 ? parseInt( record.attendance_calculation.calculation.total / 60 ) + ' ម៉ោង ' : '' ) +
                    ( record.attendance_calculation.calculation.total % 60 > 0 ? parseInt( record.attendance_calculation.calculation.total % 60 ) + ' នាទី ' : '' )
                  )
                  : '' ) +
                ( record.attendance_calculation.Attendance.Attendance_type != "AB" ? record.attendance_calculation.Attendance.Attendance_type : '' )
                }}</td>
                <td class="relative ">
                  <table-actions-form v-bind:model="model" v-bind:record="record" :onClose="closeActions" />
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </Transition>
      <div v-if="!Array.isArray( table.records.matched ) || table.records.matched.length <= 0 " class="w-full flex flex-wrap justify-between " >មិនមានព័ត៌មានដែលអ្នកកំពុងស្វែងរកឡើយ។</div>
      <!-- Loading -->
      <Transition name="slide-fade" >
        <div v-if="table.loading" class="table-loading fixed flex h-screen left-0 top-0 right-0 bottom-0 bg-white bg-opacity-80 ">
          <div class="flex mx-auto items-center">
            <div class="spinner">
              <svg class="animate-spin w-16 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48s48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.491-48-48-48z" fill="currentColor"></path></svg>
              <br/><br/>កំពុងអាន...
            </div>
          </div>
          <div class="absolute top-1 right-1 cursor-pointer bg-white rounded-full " @click="closeTableLoading" >
            <svg class="w-14 mx-auto text-red-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 320l128-128"></path></svg>
          </div>
        </div>
      </Transition>
    </div>
    <!-- Pagination of crud -->
    <div class="fixed left-0 right-0 bottom-1 flex flex-wrap" >
      <!-- This pagination is for the media side with from Medium up -->
      <div class="vcb-table-pagination bg-blue-300 mx-auto">
        <!-- Information -->
        <div class="vcb-table-pagination-info" >{{ table.pagination.totalRecords > 0 ? table.pagination.totalRecords + " នាក់" : "" }}</div>
          <div class="vcb-table-pagination-info" >{{ table.pagination.totalPages > 0 ? " ចែកជា " + table.pagination.totalPages + " ទំព័រ" : "" }}</div>
        <!-- First -->
        <!-- Pages (7) -->
        <div v-for="(page, index) in table.pagination.buttons" :key="index" :class=" (table.pagination.page == page ? ' vcb-pagination-page-active ' : ' vcb-pagination-page ' )" @click="table.pagination.page == page ? false : goTo(page) " >{{ page }}</div>
        <!-- Previous -->          
        <div v-if="table.pagination.page > 1 " class="vcb-pagination-page " v-html='"<"' @click="previous()" ></div>
        <n-tooltip v-if="table.pagination.page <= 1 "  trigger="hover">
          <template #trigger>
            <div class="vcb-pagination-page border-gray-200 text-gray-200 " v-html='"<"' ></div>
          </template>
          អ្នកកំពុងស្ថិតនៅទំព័រដើមបង្អស់ហើយ។
        </n-tooltip>
        <!-- Next -->
        <div v-if="table.pagination.page < table.pagination.totalPages " class="vcb-pagination-page " v-html='">"' @click="next()" ></div>
        <n-tooltip v-if="table.pagination.page >= table.pagination.totalPages " trigger="hover">
          <template #trigger>
            <div class="vcb-pagination-page border-gray-200 text-gray-200 " v-html='">"' ></div>
          </template>
          អ្នកកំពុងស្ថិតនៅទំព័រចុងក្រោយហើយ។
        </n-tooltip>
        <!-- Last -->
        <!-- Go to -->
        <!-- Total per page -->
      </div>
    </div>
  </div>
</template>
<script>
import { reactive ,ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import dateFormat from "dateformat";
import ocmLogoUrl from './../../../assets/logo.jpg'
import TableActionsForm from './actions/table-action.vue'
/**
 * CRUD component form
 */
export default {
  name: "User" ,
  components: {
    QrcodeVue ,
    Vue3Barcode ,
    TableActionsForm
  },
  setup(){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const router = useRouter()
    const notify = useNotification()
    const daysOfWeek = reactive([
      {
        name: {
          kh: 'អាទិត្យ' ,
          en: 'Sunday' 
        },
        symbol: 'Bravery / Courage' ,
        color: {
          kh: 'ក្រហម' ,
          en: 'red' ,
          hexa: '#D80032' 
        } ,
        number: 0
      },
      {
        name: {
          kh: 'ច័ន្ទ' ,
          en: 'Monday' 
        },
        symbol: 'Equality' ,
        color: {
          kh: 'ទឹកក្រូច' ,
          en: 'orange' ,
          hexa: '#EC8F5E' 
        } ,
        number: 1
      },
      {
        name: {
          kh: 'អង្គារ៍' ,
          en: 'Tuesday' 
        },
        symbol: 'Honesty / Loyalty' ,
        color: {
          kh: 'ស្វាយ' ,
          en: 'Purple' ,
          hexa: '#B15EFF' 
        } ,
        number: 2
      },
      {
        name: {
          kh: 'ពុធ' ,
          en: 'Wednesday' 
        },
        symbol: 'Embodying justice' ,
        color: {
          kh: 'ត្រួយចេក' ,
          en: 'Mustard Green' ,
          hexa: '#79AC78' 
        } ,
        number: 3
      },
      {
        name: {
          kh: 'ព្រហស្បត៍' ,
          en: 'Thursday' 
        },
        symbol: 'Signifying hope' ,
        color: {
          kh: 'បៃតង' ,
          en: 'Green' ,
          hexa: '#004225' 
        } ,
        number: 4
      },
      {
        name: {
          kh: 'សុក្រ' ,
          en: 'Thursday' 
        },
        symbol: 'Forgiveness' ,
        color: {
          kh: 'ខៀវ' ,
          en: 'Blue' ,
          hexa: '#39A7FF' 
        } ,
        number: 5
      },
      {
        name: {
          kh: 'សៅរ៍' ,
          en: 'Thursday' 
        },
        symbol: 'Signifying sadness' ,
        color: {
          kh: 'ឈាមជ្រូក' ,
          en: 'Burgundy' ,
          hexa: '#952323' 
        } ,
        number: 6
      }
    ])
    /**
     * Variables
     */    
    var model = reactive( {
      name: "Attendancepolicy" ,
      title: "គោលការណ៍វត្តមាន"
    })
    var table = reactive( {
      loading: false ,
      search: '' ,
      records: {
        all: [] ,
        matched: []
      },
      columns: {
        searchable: {
          date: '' ,
          Attendance_type : ''
        },
        format: {
          date: '' ,
          Attendance_type: 'AB' ,
          ot_hours: 0 ,
          ot_minutes: 0 ,
          worked_hours: 0 ,
          worked_minutes: 0 
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
        setTimeout( goTo(1) , 500 )
      }
    }

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
        date: AttendanceDate.value != null && parseInt( AttendanceDate.value ) > 0 ? dateFormat( new Date(AttendanceDate.value) , "yyyy-mm-dd" ) : dateFormat( new Date() , "yyyy-mm-dd" ) ,
        perPage: table.pagination.perPage ,
        page: table.pagination.page
      }).then(res => {
        table.records.all = table.records.matched = res.data.records
        table.pagination = res.data.pagination
        
        var paginationNumberList = 5
        if( ( table.pagination.page - ( paginationNumberList - 1 ) ) < 1 ){
          table.pagination.start = 1
          table.pagination.end = table.pagination.totalPages > 9 ? 9 : table.pagination.totalPages
        }
        else{
          table.pagination.start = table.pagination.page  - ( paginationNumberList - 1 )
          table.pagination.end = table.pagination.page + 4 >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 4
        }
        /**
         * Create pagination buttons
         */
        table.pagination.buttons = []
        for(var i=table.pagination.start;i<=table.pagination.end;i++){
          table.pagination.buttons.push(i)
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

    function getEffectiveDayName(effectiveDayNumbers){
      let days = ["អាទិត្យ","ចន្ទ័","អង្គារ៍","ពុធ","ព្រសហ្បត៍","សុក្រ","សៅរ៍"]
      return effectiveDayNumbers.map( ( dayNumber )=> days[ dayNumber ] )
    }

    function minutesToStringTime(minutes){
      let time = {
        hours: 0 ,
        minutes: 0 
      }
      if( minutes > 60 ){
        time.minutes = minutes % 60
        time.hours = ( minutes - time.minutes ) / 60
      }else{
        time.minutes = minutes
      }
      return time
    }
    function getDayOfWeek(number){
      return daysOfWeek.find( day => day.number == number )
    }

    function closeActions( actionStatus ){
      if( parseInt( actionStatus ) > 0 ) getRecords()
    }
  
    const AttendanceTypes = ref([
      'SK', 'ML', 'AL', 'SP', 'OL', 'AB',
      'PT', 'LA', 'EA', 'SA', 'SU', 'HL'
    ]);

    /**
     * Initial the data
     */
    getRecords()

    return {
      /**
       * Variables
       */
      model ,
      table ,
      AttendanceTypes ,
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
       * Functions
       */
      closeActions ,
      getEffectiveDayName ,
      minutesToStringTime ,
      getDayOfWeek ,
      ocmLogoUrl
    }
  }
}

</script>

<style type="text/css" scoped >
.vcb-table thead tr {
  @apply bg-gray-200 ;
}
.vcb-table thead tr th {
  @apply p-1 ;
}
.vcb-table tbody tr td {
  @apply p-1 ;
}
</style>