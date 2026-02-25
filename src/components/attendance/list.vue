<<<<<<< HEAD
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
        <div class="mt-1 mr-2 flex flex-row">
          <n-date-picker v-model:value="attendanceDate" type="date" @update:value="filterRecords(false)" class="mx-1 h-9" />
          <router-link to="/attendance/import" class="border border-blue-500 rounded px-4 py-2 h-9 text-blue-500 " >បញ្ចូលវត្តមាន</router-link>
        </div>
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
                <th class="w-14" >ល.រ</th>
                <th class="w-16" >កូដ</th>
                <th>ឈ្មោះ</th>
                <th class="w-52" >តួនាទី</th>
                <th class="w-52" >ផ្នែក</th>
                <th class="w-52" >វត្តមាន</th>
                <th class="w-24" >ប្រតិបត្តិការ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in table.records.matched" :key='index' :class=" 'item hover:bg-yellow-200 duratoin-300 ' +
               ( record.attendance_calculation.attendance.attendance_type.code == 'IT' ? ' text-blue-600 ' : '' ) +
               ( record.attendance_calculation.attendance.attendance_type.code == 'AB' ? ' text-red-600 ' : '' ) +
               ( attendanceTypes.includes( record.attendance_calculation.attendance.attendance_type.code ) ? ' text-yellow-600 ' : '' ) 
              " >
                <td>{{ $toKhmer( index + 1 ) }}</td>
                <td>{{ record.code }}</td>
                <td>{{ record.people.lastname + ' ' + record.people.firstname }}</td>
                <td>{{ record.position != undefined ? record.position.name : '' }}</td>
                <td>{{ record.department != undefined ? record.department.name : '' }}{{ record.section != undefined ? ' - ' + record.section.name : '' }}</td>
                <td>{{ 
                  ( 
                    record.attendance_calculation.attendance.attendance_type.code == "AB" ? 'AB ' : (
                      record.attendance_calculation.calculation.checktimes.length > 0
                        ? record.attendance_calculation.calculation.checktimes[0].in.checktime
                        : ''
                    )
                  ) +
                  ( 
                    ( record.attendance_calculation.attendance.attendance_type.code == "AB" || record.attendance_calculation.attendance.attendance_type.code == "SN" || record.attendance_calculation.attendance.attendance_type.code == "SA" || record.attendance_calculation.attendance.attendance_type.code == "HL" ) && ( record.attendance_calculation != undefined && record.attendance_calculation.calculation != undefined && record.attendance_calculation.calculation.total > 0 )
                      ? (
                        ( 
                          record.attendance_calculation.calculation.total / 60 > 0 
                            ? parseInt( record.attendance_calculation.calculation.total / 60 ) + ' ម៉ោង ' 
                            : '' 
                        ) +
                        ( 
                          record.attendance_calculation.calculation.total % 60 > 0 
                            ? parseInt( record.attendance_calculation.calculation.total % 60 ) + ' នាទី ' 
                            : '' 
                        )
                     )
                      : '' 
                  ) +
                  ( 
                    [ "AB" , 'PR' ].includes( record.attendance_calculation.attendance.attendance_type.code ) 
                      ? '' 
                      : ' ' + record.attendance_calculation.attendance.attendance_type.code 
                  ) +
                  ( 
                    record.attendance_calculation.calculation.total > 0 
                      ? ' - WH' + record.attendance_calculation.calculation.total 
                      : '' 
                  ) + 
                  ( 
                    record.attendance_calculation.calculation.overtime > 0 
                      ? ' - OT' + record.attendance_calculation.calculation.overtime 
                      : '' 
                  )
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
          <!-- <div v-for="(record, index) in table.records.matched" :key='index' class="item"  >
            <div class="flex flex-wrap p-2 w-full leading-5 relative cursor-pointer hover:shadow border border-gray-200" >
              <div class="w-full" >
                <img v-if="record.image==null||record.image==undefined||record.image==''" :src="ocmLogoUrl" class="w-24 h-24 mx-auto rounded-full" />
                <img v-if="record.image!=null&&record.image!=undefined&&record.image!=''" :src="record.image" class="w-24 h-24 mx-auto rounded-full" />
                <div class="py-4 px-2 leading-5  text-xs text-center font-moul w-full" >{{ record.user.lastname }}&ensp;{{ record.user.firstname }}</div>
              </div>
              <div class="w-full" >
                <table class="w-full" >
                  <tbody>
                    <tr >
                      <td class=" py-1 pb-2 text-left  text-xs" colspan="1" >កាលបរិច្ឆែទ ៖ </td>
                      <td class=" py-1 pb-2 text-right font-bold  text-xs" colspan="3"  >{{ record.date }}</td>
                    </tr>
                    <tr class="" >
                      <td class=" py-1 text-left  text-xs pt-2" colspan="2" >រយះពេលបានបំពេញការងារ</td>
                      <td class=" py-1 text-right font-bold text-xs pt-2 text-blue-500" colspan="2"  >{{ record.calculateTime.total.workedTime }}</td>
                    </tr>
                    <tr >
                      <td class=" py-1 text-left  text-xs " colspan="2" >រយះពេលដែល{{ ( record.calculateTime.total.lateOrEarly > 0 ? 'លើស' : 'ខ្វះ' ) }}</td>
                      <td :class="'pb-2 text-right font-bold text-md' + ( ( record.calculateTime.total.workedTime - record.calculateTime.total.duration ) > 0 ? ' text-green-600 ' : ' text-red-600 ' )" colspan="2"  >{{  record.calculateTime.total.workedTime - record.calculateTime.total.duration  }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <thumbnail-actions-form v-bind:model="model" v-bind:record="record" :onClose="closeActions" />
            </div>
          </div> -->
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
</template>
<script>
import { reactive ,ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import dateFormat from "dateformat";
import ocmLogoUrl from './../../assets/logo.jpg'
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
    const attendanceDate = ref( null )
    attendanceDate.value = (new Date()).getTime()
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
      name: "Attendance" ,
      module: 'attendance' ,
      title: "វត្តមានប្រចាំថ្ងៃ"
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
      console.log( attendanceDate.value )
      console.log( dateFormat( new Date(attendanceDate.value) , "yyyy-mm-dd" ) )
      window.clearTimeout()
      table.loading = true
      store.dispatch(model.module+'/attendances',{
        search: table.search ,
        date: attendanceDate.value != null && parseInt( attendanceDate.value ) > 0 ? dateFormat( new Date(attendanceDate.value) , "yyyy-mm-dd" ) : dateFormat( new Date() , "yyyy-mm-dd" ) ,
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

    /**
     * Load organization
     */
    function getOrganizations(){
      store.dispatch('organizations/list',{
        page: 1 ,
        perPage: 1000 ,
        search: '' ,
        id: 164
      }).then(res=>{
        store.commit('organizations/setRecords',res.data.records)
      }).catch(err =>{
        notify.error({
          title: 'អានអង្គភាព' ,
          description: 'មានបញ្ហាពេលអានអានអង្គភាព។'
        })
        console.log( err )
      })
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
  
    function callFengshui(){
      store.dispatch('attendance/requestFengshui')
    }

    const attendanceTypes = ref([
      'SK' , 'OL' , 'AL' , 'ML' , 'SP'
    ]);

    /**
     * Initial the data
     */
    getRecords()
    // callFengshui()


    return {
      /**
       * Variables
       */
      model ,
      table ,
      attendanceDate ,
      attendanceTypes ,
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
  @apply bg-gray-200  ;
}
.vcb-table thead tr th {
  @apply p-1 text-left ;
}
.vcb-table tbody tr td {
  @apply p-1 text-left ;
}
.vcb-table tbody tr {
  @apply border-b border-gray-200 ;
}
=======
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
        <div class="mt-1 mr-2 flex flex-row">
          <n-date-picker v-model:value="attendanceDate" type="date" @update:value="filterRecords(false)" class="mx-1 h-9" />
          <router-link to="/attendance/import" class="border border-blue-500 rounded px-4 py-2 h-9 text-blue-500 " >បញ្ចូលវត្តមាន</router-link>
        </div>
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
                <th class="w-14" >ល.រ</th>
                <th class="w-16" >កូដ</th>
                <th>ឈ្មោះ</th>
                <th class="w-52" >តួនាទី</th>
                <th class="w-52" >ផ្នែក</th>
                <th class="w-52" >វត្តមាន</th>
                <th class="w-24" >ប្រតិបត្តិការ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in table.records.matched" :key='index' :class=" 'item hover:bg-yellow-200 duratoin-300 ' +
               ( record.attendance_calculation.attendance.attendance_type.code == 'IT' ? ' text-blue-600 ' : '' ) +
               ( record.attendance_calculation.attendance.attendance_type.code == 'AB' ? ' text-red-600 ' : '' ) +
               ( attendanceTypes.includes( record.attendance_calculation.attendance.attendance_type.code ) ? ' text-yellow-600 ' : '' ) 
              " >
                <td>{{ $toKhmer( index + 1 ) }}</td>
                <td>{{ record.code }}</td>
                <td>{{ record.people.lastname + ' ' + record.people.firstname }}</td>
                <td>{{ record.position != undefined ? record.position.name : '' }}</td>
                <td>{{ record.department != undefined ? record.department.name : '' }}{{ record.section != undefined ? ' - ' + record.section.name : '' }}</td>
                <td>{{ 
                  ( 
                    record.attendance_calculation.attendance.attendance_type.code == "AB" ? 'AB ' : (
                      record.attendance_calculation.calculation.checktimes.length > 0
                        ? record.attendance_calculation.calculation.checktimes[0].in.checktime
                        : ''
                    )
                  ) +
                  ( 
                    ( record.attendance_calculation.attendance.attendance_type.code == "AB" || record.attendance_calculation.attendance.attendance_type.code == "SN" || record.attendance_calculation.attendance.attendance_type.code == "SA" || record.attendance_calculation.attendance.attendance_type.code == "HL" ) && ( record.attendance_calculation != undefined && record.attendance_calculation.calculation != undefined && record.attendance_calculation.calculation.total > 0 )
                      ? (
                        ( 
                          record.attendance_calculation.calculation.total / 60 > 0 
                            ? parseInt( record.attendance_calculation.calculation.total / 60 ) + ' ម៉ោង ' 
                            : '' 
                        ) +
                        ( 
                          record.attendance_calculation.calculation.total % 60 > 0 
                            ? parseInt( record.attendance_calculation.calculation.total % 60 ) + ' នាទី ' 
                            : '' 
                        )
                     )
                      : '' 
                  ) +
                  ( 
                    [ "AB" , 'PR' ].includes( record.attendance_calculation.attendance.attendance_type.code ) 
                      ? '' 
                      : ' ' + record.attendance_calculation.attendance.attendance_type.code 
                  ) +
                  ( 
                    record.attendance_calculation.calculation.total > 0 
                      ? ' - WH' + record.attendance_calculation.calculation.total 
                      : '' 
                  ) + 
                  ( 
                    record.attendance_calculation.calculation.overtime > 0 
                      ? ' - OT' + record.attendance_calculation.calculation.overtime 
                      : '' 
                  )
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
          <!-- <div v-for="(record, index) in table.records.matched" :key='index' class="item"  >
            <div class="flex flex-wrap p-2 w-full leading-5 relative cursor-pointer hover:shadow border border-gray-200" >
              <div class="w-full" >
                <img v-if="record.image==null||record.image==undefined||record.image==''" :src="ocmLogoUrl" class="w-24 h-24 mx-auto rounded-full" />
                <img v-if="record.image!=null&&record.image!=undefined&&record.image!=''" :src="record.image" class="w-24 h-24 mx-auto rounded-full" />
                <div class="py-4 px-2 leading-5  text-xs text-center font-moul w-full" >{{ record.user.lastname }}&ensp;{{ record.user.firstname }}</div>
              </div>
              <div class="w-full" >
                <table class="w-full" >
                  <tbody>
                    <tr >
                      <td class=" py-1 pb-2 text-left  text-xs" colspan="1" >កាលបរិច្ឆែទ ៖ </td>
                      <td class=" py-1 pb-2 text-right font-bold  text-xs" colspan="3"  >{{ record.date }}</td>
                    </tr>
                    <tr class="" >
                      <td class=" py-1 text-left  text-xs pt-2" colspan="2" >រយះពេលបានបំពេញការងារ</td>
                      <td class=" py-1 text-right font-bold text-xs pt-2 text-blue-500" colspan="2"  >{{ record.calculateTime.total.workedTime }}</td>
                    </tr>
                    <tr >
                      <td class=" py-1 text-left  text-xs " colspan="2" >រយះពេលដែល{{ ( record.calculateTime.total.lateOrEarly > 0 ? 'លើស' : 'ខ្វះ' ) }}</td>
                      <td :class="'pb-2 text-right font-bold text-md' + ( ( record.calculateTime.total.workedTime - record.calculateTime.total.duration ) > 0 ? ' text-green-600 ' : ' text-red-600 ' )" colspan="2"  >{{  record.calculateTime.total.workedTime - record.calculateTime.total.duration  }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <thumbnail-actions-form v-bind:model="model" v-bind:record="record" :onClose="closeActions" />
            </div>
          </div> -->
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
</template>
<script>
import { reactive ,ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import dateFormat from "dateformat";
import ocmLogoUrl from './../../assets/logo.jpg'
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
    const attendanceDate = ref( null )
    attendanceDate.value = (new Date()).getTime()
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
      name: "Attendance" ,
      module: 'attendance' ,
      title: "វត្តមានប្រចាំថ្ងៃ"
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
      console.log( attendanceDate.value )
      console.log( dateFormat( new Date(attendanceDate.value) , "yyyy-mm-dd" ) )
      window.clearTimeout()
      table.loading = true
      store.dispatch(model.module+'/attendances',{
        search: table.search ,
        date: attendanceDate.value != null && parseInt( attendanceDate.value ) > 0 ? dateFormat( new Date(attendanceDate.value) , "yyyy-mm-dd" ) : dateFormat( new Date() , "yyyy-mm-dd" ) ,
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

    /**
     * Load organization
     */
    function getOrganizations(){
      store.dispatch('organizations/list',{
        page: 1 ,
        perPage: 1000 ,
        search: '' ,
        id: 164
      }).then(res=>{
        store.commit('organizations/setRecords',res.data.records)
      }).catch(err =>{
        notify.error({
          title: 'អានអង្គភាព' ,
          description: 'មានបញ្ហាពេលអានអានអង្គភាព។'
        })
        console.log( err )
      })
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
  
    function callFengshui(){
      store.dispatch('attendance/requestFengshui')
    }

    const attendanceTypes = ref([
      'SK' , 'OL' , 'AL' , 'ML' , 'SP'
    ]);

    /**
     * Initial the data
     */
    getRecords()
    // callFengshui()


    return {
      /**
       * Variables
       */
      model ,
      table ,
      attendanceDate ,
      attendanceTypes ,
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
  @apply bg-gray-200  ;
}
.vcb-table thead tr th {
  @apply p-1 text-left ;
}
.vcb-table tbody tr td {
  @apply p-1 text-left ;
}
.vcb-table tbody tr {
  @apply border-b border-gray-200 ;
}
>>>>>>> 9c9120be8b76f88ac98c70e3e86f780df1b53097
</style>