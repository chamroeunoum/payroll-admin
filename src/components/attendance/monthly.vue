<template>
  <div class=" mb-24" >
  <!-- Top action panel of crud -->
    <div class="flex title-bar border-b border-gray-200">
      <!-- Title of crud -->
      <div class="flex w-64 h-12 py-1 title " >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8h14v2H16z" fill="currentColor"></path><path d="M6 10.59L3.41 8L2 9.41l4 4l8-8L12.59 4L6 10.59z" fill="currentColor"></path><path d="M16 22h14v2H16z" fill="currentColor"></path><path d="M6 24.59L3.41 22L2 23.41l4 4l8-8L12.59 18L6 24.59z" fill="currentColor"></path></svg>
        <div class="font-moul ml-2 h-12 leading-10" v-html="model.title" ></div>
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
        <div class="w-1/5 relative hidden" >
          <input type="text" @keypress.enter="filterRecords(false)" v-model="table.search" class="bg-gray-100 px-2 h-9 my-1 w-full rounded border border-gray-200 focus:border-blue-600 hover:border-blue-600 " placeholder="ស្វែងរក" />
          <svg class="absolute right-1 top-2 text-gray-400 hover:text-blue-700 cursor-pointer" @click="filterRecords(false)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z" fill="currentColor"></path></g></svg>
        </div>
        <div class="mt-1 mr-2">
          <n-date-picker v-model:value="attendanceDate" type="month" @update:value="filterRecords(false)"/>
        </div>
        <div class="mt-1 mr-2">
          <n-button type="default" @click="$router.push('/attendance')" >
            បញ្ជីវត្តមាន
          </n-button>
        </div>
      </div>
      <!-- Filter panel of crud -->
      <div class="filters-bar"></div>
    </div>
    <!-- Table of crud -->
    <div class="mt-4 relative">
      <Transition name="fade" >
        <div v-if="Array.isArray( table.records.matched ) && table.records.matched.length > 0 " class="w-full flex flex-wrap justify-between " >
          <div class="w-full flex flex-wrap m-4 py-16 shadow-sm border border-gray-300" >
            <div class="report-title font-moul text-center w-full mt-4 text-xl" >របាយការណ៍វត្តមានប្រចាំខែ</div>
            <div class="report-title font-tacteing text-center w-full h-10 leading-10 my-4" style="font-size: 5rem; " >6</div>
            <div v-if="user!=null" class="report-title font-moul text-left w-1/2 pl-2" >ឈ្មោះ ៖ &ensp;&ensp;{{ user.lastname }}&ensp;{{ user.firstname }}</div>
            <div v-if="attendanceDate!=null" class="report-title font-moul text-right w-1/2 pr-2" >កាលបរិច្ឆែទ ៖ &ensp;&ensp;{{ $toKhmer( dateFormat( new Date( attendanceDate ) , 'mm - yyyy' ) ) }}</div>
            <!-- <div class="w-full p-4 mt-4 flex flex-wrap justify-center" > -->
              <!-- <div class="shadow rounded-md h-24 flex flex-wrap " >
                <div class=" p-4 border border-gray-200 m-2 " v-for="(type , index) in attendanceTotalByTypes" :key="index" >
                  <div class="w-full font-moul" >{{ $toKhmer( type.value ) }}</div>
                  <div class="w-full mt-2" >{{ attendanceTypeLabels.find( t => t.key == type.key ).label }}</div>
                </div>
              </div> -->
              <!-- <div class=" p-4 border border-gray-200 m-2 rounded-md min-w-16 " v-for="(type , index) in attendanceTotalByTypes" :key="index" >
                <div class="w-full font-moul" >{{ $toKhmer( type.value ) }}</div>
                <div class="w-full mt-2" >{{ attendanceTypeLabels.find( t => t.key == type.key ).label }}</div>
              </div> -->
              <!-- <div class="w-1/2 flex flex-wrap justify-center">
                <div class=" p-4 border border-gray-200 m-2 rounded-md min-w-16 " v-for="(type , index) in attendanceTotalByTypes.filter( (t) => t.key == 'A' || t.key == 'PM' || t.key == 'SL' || t.key == 'OL' || t.key == 'ML' || t.key == 'AL'   )" :key="index" >
                  <div class="w-full font-moul" >{{ $toKhmer( type.value ) }}</div>
                  <div class="w-full mt-2" >{{ attendanceTypeLabels.find( t => t.key == type.key ).label }}</div>
                </div>
              </div>
              <div class="w-1/2 flex flex-wrap justify-center">
                <div class=" p-4 border border-gray-200 m-2 rounded-md min-w-16 " v-for="(type , index) in attendanceTotalByTypes.filter( (t) => t.key == 'P' || t.key == 'PE' || t.key == 'PL' || t.key == 'SN' || t.key == 'ST' || t.key == 'HL'   )" :key="index" >
                  <div class="w-full font-moul" >{{ $toKhmer( type.value ) }}</div>
                  <div class="w-full mt-2" >{{ attendanceTypeLabels.find( t => t.key == type.key ).label }}</div>
                </div>
              </div> -->
            <!-- </div> -->
            <div class="attendance-list w-full my-8 mt-12" >
              <div class="attendance-header flex bg-gray-100 h-14 leading-10 py-2" >
                <div class="attendance-header-row w-40 font-moul pt-3" >ថ្ងៃ</div>
                <div class="attendance-header-row flex-grow font-moul pt-3" >ការចុះវត្តមាន</div>
                <div class="attendance-header-row w-60 font-moul pt-3" >សរុបរយះពេលបំពេញការងារ</div>
                <!-- <div class="attendance-header-row w-60 font-moul" >រយះពេលដែល លើស / ខ្វះ</div> -->
              </div>
              <div v-for="(attendance, index) in table.records.matched" :key='index' :class="'flex attendance-row w-full border-b border-gray-100 ' 
                + ( attendance.attendance_type == 'HL'? ' bg-green-50 ' : '' )
                + ( attendance.attendance_type == 'SN' ? ' bg-red-50 ' : '' ) " >
                <div class="day-number w-40 p-1 pt-2 font-kantumruy" :style="'color: ' + ( getDayOfWeek(attendance.day_of_week).color.hexa ) + '; '" >
                  <div class="font-bold">{{ $toKhmer( dateFormat( new Date( attendance.date ) , 'dd' ) ) }}</div>
                  <div class="font-bold">{{ getDayOfWeek(attendance.day_of_week).name.kh }}</div>
                </div>
                <div class="flex-grow p-1" >
                  <table v-if="( ['P','PR','IT','EA','LA','HL','SU','SA'].find( t => t == attendance.attendance_type ) ) != undefined" class="w-full" >
                    <thead>
                      <tr class="" >
                        <td class="font-kantumruy py-1 text-left font-bold">ចូល</td>
                        <td class="font-kantumruy py-1 text-left font-bold">ចេញ</td>
                        <td class="font-kantumruy py-1 text-right font-bold">សរុប</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(ct , ctIndex) in attendance.calculateTime.checktimes" :key="ctIndex">
                        <td class=" text-left flex flex-wrap " >
                          <div class="mr-1" >{{ $toKhmer( ct.in.checktime ) }}</div>
                          <svg v-if="ct.in != null && ct.in.lat != '' && ct.in.lat != null && ct.in.long != '' && ct.in.long != null " @click=" openMap( ct.in.lat , ct.in.lng )" class="mx-1 text-blue-500 w-4 h-4 cursor-pointer " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><g fill="none"><path d="M24.005 15.5a6 6 0 1 0 0 12a6 6 0 0 0 0-12zm-3.5 6a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0zM37 32L26.912 42.71a4 4 0 0 1-5.824 0L11 32h.038l-.017-.02l-.021-.025A16.922 16.922 0 0 1 7 21c0-9.389 7.611-17 17-17s17 7.611 17 17a16.922 16.922 0 0 1-4 10.955l-.021.025l-.017.02H37zm-1.943-1.619A14.433 14.433 0 0 0 38.5 21c0-8.008-6.492-14.5-14.5-14.5S9.5 12.992 9.5 21c0 3.58 1.294 6.852 3.443 9.381l.308.363l9.657 10.251a1.5 1.5 0 0 0 2.184 0l9.657-10.251l.308-.363z" fill="currentColor"></path></g></svg>
                          <svg v-if="ct.in != null && ct.in.photo == true" @click="openPicture(ct.in)" class="mx-1 text-blue-500 w-4 h-4 cursor-pointer " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M19 14a3 3 0 1 0-3-3a3 3 0 0 0 3 3zm0-4a1 1 0 1 1-1 1a1 1 0 0 1 1-1z" fill="currentColor"></path><path d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 22H6v-6l5-5l5.59 5.59a2 2 0 0 0 2.82 0L21 19l5 5zm0-4.83l-3.59-3.59a2 2 0 0 0-2.82 0L18 19.17l-5.59-5.59a2 2 0 0 0-2.82 0L6 17.17V6h20z" fill="currentColor"></path></svg>
                        </td>
                        <td class=" text-left " >                          
                          <div class="mr-1 inline-block" >{{ ct.out != null ? $toKhmer( ct.out.checktime ) : '' }}</div>
                          <svg v-if="ct.out != null && ct.out.lat != '' && ct.out.lat != null && ct.out.long != '' && ct.out.long != null " @click=" openMap( ct.out.lat , ct.out.lng )" class="mx-1 inline-block text-blue-500 w-4 h-4 cursor-pointer " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><g fill="none"><path d="M24.005 15.5a6 6 0 1 0 0 12a6 6 0 0 0 0-12zm-3.5 6a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0zM37 32L26.912 42.71a4 4 0 0 1-5.824 0L11 32h.038l-.017-.02l-.021-.025A16.922 16.922 0 0 1 7 21c0-9.389 7.611-17 17-17s17 7.611 17 17a16.922 16.922 0 0 1-4 10.955l-.021.025l-.017.02H37zm-1.943-1.619A14.433 14.433 0 0 0 38.5 21c0-8.008-6.492-14.5-14.5-14.5S9.5 12.992 9.5 21c0 3.58 1.294 6.852 3.443 9.381l.308.363l9.657 10.251a1.5 1.5 0 0 0 2.184 0l9.657-10.251l.308-.363z" fill="currentColor"></path></g></svg>
                          <svg v-if="ct.out != null && ct.out.photo == true" @click="openPicture(ct.out)" class="mx-1 inline-block text-blue-500 w-4 h-4 cursor-pointer " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M19 14a3 3 0 1 0-3-3a3 3 0 0 0 3 3zm0-4a1 1 0 1 1-1 1a1 1 0 0 1 1-1z" fill="currentColor"></path><path d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 22H6v-6l5-5l5.59 5.59a2 2 0 0 0 2.82 0L21 19l5 5zm0-4.83l-3.59-3.59a2 2 0 0 0-2.82 0L18 19.17l-5.59-5.59a2 2 0 0 0-2.82 0L6 17.17V6h20z" fill="currentColor"></path></svg>
                        </td>
                        <td class=" text-right" >{{ $toKhmer( ct.spenttime ) }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-if="( ['AB','OL','SK','SP','ML','AL'].find( t => t == attendance.attendance_type ) ) != undefined" class=" flex flex-wrap w-full" >
                    <div class="text-md font-btb-black mt-1" >
                      {{ attendanceTypeLabels.find( m => m.key == attendance.attendance_type ).label }}
                    </div>
                  </div>
                </div>
                <div v-if="( ['PR','IT','EA','LA','HL','SU','SA'].find( t => t == attendance.attendance_type ) ) != undefined" class=" w-60 p-4 pt-2 font-bold text-lg" >
                  {{
                //  $toKhmer( attendance.calculateTime.checktimes.reduce( ( sum , checktime ) => sum + parseFloat( checktime.spenttime ) , 0 ) ) 
                  $toKhmer( attendance.calculateTime.total )
                  }}<br/><div class="text-green-700" >{{ 
                    $toKhmer( attendance.calculateTime.overtime ) 
                }}</div></div>
                <!-- <div :class="'w-60 p-4 font-bold  text-xl ' + ( ( attendance.calculateTime.total.total - attendance.calculateTime.total.duration ) > 0 ? ' text-green-600 ' : ' text-red-600 ' )" >{{ parseInt( attendance.calculateTime.total.workedTime ) - parseInt( attendance.calculateTime.total.duration ) }}</div> -->
              </div>
              <div class="text-right flex flex-row-reverse" >
                <div class="p-4 w-60 font-bold font-moul text-center leading-5 " >{{ $toKhmer( table.records.matched.reduce( ( sum , attendance ) => sum + ( attendance.calculateTime.checktimes.reduce( ( sm , ct ) => sm + ct.spenttime , 0 ) ) , 0 ) ) }} នាទី <br/> {{ $toKhmer( parseInt( table.records.matched.reduce( ( sum , attendance ) => sum + ( attendance.calculateTime.checktimes.reduce( ( sm , ct ) => sm + ct.spenttime , 0 ) ) , 0 ) / 60 ) ) + " ម៉ោង" }} {{ $toKhmer( parseInt( table.records.matched.reduce( ( sum , attendance ) => sum + ( attendance.calculateTime.checktimes.reduce( ( sm , ct ) => sm + ct.spenttime , 0 ) ) , 0 ) % 60 ) ) + " នាទី" }}</div>
                <div class="flex-grow p-4 w-60 font-bold font-moul " >សរុប</div>
              </div>
            </div>
            <div class="w-1/3 p-4 flex flex-wrap -mt-20" >
              <table class="w-48" >
                <thead>
                  <tr class="bg-gray-100 leading-6" >
                    <th colspan="3" class="p-1 font-btb-black" >សរុបវត្តមាន</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(type , index) in attendanceTotalByTypes" :key="index" class=" text-left leading-6 " >
                    <td class="" style="padding: 3px; " >{{ $toKhmer( index + 1 ) + '.' }}</td>
                    <td class="" >{{ attendanceTypeLabels.find( t => t.key == type.key ).label }}</td>
                    <td class="text-right pr-1" >{{ $toKhmer( type.value ) }}</td>
                  </tr>
                  <tr class=" text-left leading-6 bg-gray-200 " >
                    <td colspan="2" class="p-1" ></td>
                    <td colspan="1" class="text-right font-bold p-1" >{{ $toKhmer( attendanceTotalByTypes.reduce( (sum , type ) => sum + type.value , 0 ) ) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
  </div>
</template>
<script>
import { reactive ,ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import dateFormat from "dateformat";
/**
 * CRUD component form
 */
export default {
  name: "User" ,
  components: {
    QrcodeVue ,
    Vue3Barcode
  },
  setup(){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const route = useRoute()
    const router = useRouter()
    const notify = useNotification()
    const user = ref(null)
    const attendanceDate = ref( null )
    attendanceDate.value = route.params.date != '' && route.params.date != undefined
    ? (new Date( route.params.date )).getTime()
    : (new Date()).getTime()

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
      title: "វត្តមានប្រចាំខែ"
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
          attendance_type : ''
        },
        format: {
          date: '' ,
          attendance_type: 'A' ,
          ot_hours: 0 ,
          ot_minutes: 0 ,
          worked_hours: 0 ,
          worked_minutes: 0 
        }
      } ,
      pagination: {
        perPage: 50 ,
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
      // console.log( dateFormat( new Date(attendanceDate.value) , "yyyy-mm-dd" ) )
      /**
       * Clear time interval after calling
       */
      window.clearTimeout()
      table.loading = true
      store.dispatch(model.module+'/userattendances',{
        userId: route.params.userId ,
        date: attendanceDate.value != null && parseInt( attendanceDate.value ) > 0 ? dateFormat( new Date(attendanceDate.value) , "yyyy-mm-dd" ) : dateFormat( new Date() , "yyyy-mm-dd" ) ,
      }).then(res => {
        table.records.all = table.records.matched = res.data.records
        user.value = res.data.user
        attendanceTotalByTypes.value = []
        for( const [ k, v ] of Object.entries( res.data.total_attendance_by_types ) ){
          if( parseInt( v ) > 0 ){
            attendanceTotalByTypes.value.push({
              key: k , value : v
            })
          }
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

    function openMap( lat , long ){
      window.open('https://www.google.com/maps?q=' + lat + ',' + long , '_blank' ) 
      // window.open('https://maps.apple.com/?q=' + lat + ',' + long , '_blank' ) 
      // window.open('https://www.openstreetmap.org/?mlat=' + lat + '&mlon=' + long , '_blank' ) 
    }

    function openPicture( record ){
      store.dispatch('attendance/readPhoto',{ id : record.id }).then( res => {
        console.log(  )
        // Replace this with your Base64-encoded image data
        const base64Image = res.data.base64 
        // Create an HTML page with the image
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Attendance Check - Picture</title>
            </head>
            <body>
                <img src="${base64Image}" alt="Base64 Image" style="max-width: 60%; height: auto;">
            </body>
            </html>
        `;

        // Open the HTML content in a new tab
        const newTab = window.open();
        newTab.document.write(htmlContent);
        newTab.document.close();
      }).catch( err => {
        console.log( err )
      })
    }

    const attendanceTotalByTypes = ref()
    const attendanceTypeLabels = ref([
      {
        key : 'AB' ,
        label : 'អវត្តមាន' 
      },
      {
        key : 'SP' ,
        label : 'ច្បាប់សំរាក់ពិសេស' 
      },
      {
        key : 'SK' ,
        label : 'ឈឺ' 
      },
      {
        key : 'OL' ,
        label : 'ធុរៈផ្ទាល់ខ្លួន' 
      },
      {
        key : 'ML' ,
        label : 'មាតុភាព' 
      },
      {
        key : 'AL' ,
        label : 'ប្រចាំឆ្នាំ' 
      },
      {
        key: 'PR' ,
        label : 'វត្តមាន'
      },
      {
        key: 'EA' ,
        label : 'វត្តមានមុនម៉ោង'
      },
      {
        key: 'LA' ,
        label : 'វត្តមានយឺត'
      },
      {
        key: 'SU' ,
        label : 'ថ្ងៃអាទិត្យ'
      },
      {
        key: 'SA' ,
        label : 'ថ្ងៃសៅរ៍'
      },
      {
        key: 'HL' ,
        label : 'ថ្ងៃឈប់សម្រាក់'
      }
    ])

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
      user ,
      attendanceDate ,
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
      getEffectiveDayName ,
      minutesToStringTime ,
      getDayOfWeek ,
      dateFormat ,
      openMap ,
      openPicture ,
      attendanceTypeLabels ,
      attendanceTotalByTypes
    }
  }
}

</script>

<style scoped >
  .vcb-table-cell {
    @apply p-2 ;
  }
</style>