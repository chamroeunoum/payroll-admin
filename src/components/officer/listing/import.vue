<template>
  <div class="relative">
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
          <input type="text" 
          :disabled="uploading==true"
          @keypress.enter="filterRecords(false)" v-model="search" class="bg-gray-100 px-2 h-9 my-1 w-full rounded border border-gray-200 focus:border-blue-600 hover:border-blue-600 " placeholder="ស្វែងរក" />
          <svg class="absolute w-6 h-6 right-1 top-2 text-gray-400 hover:text-blue-700 cursor-pointer" @click="filterRecords(false)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z" fill="currentColor"></path></g></svg>
        </div>
        <div class="mt-1 mr-2 flex">
          <div class=" mx-2" >
            <n-button 
              icon-placement="left"
              :disabled="registerEmployeeCodes.length<=0||uploading==true" type="primary" @click="registerAttendances"
              >
              <template #icon>
                <NIcon>
                  <svg v-if="uploading==false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-.95A5.469 5.469 0 0 1 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5l1.53.11A2.98 2.98 0 0 1 22 15c0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z" fill="currentColor"></path></svg>
                  <svg v-if="uploading==true" class="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48s48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.491-48-48-48z" fill="currentColor"></path></svg>
                </NIcon>
              </template>
              ចុះវត្តមាន
            </n-button>

          </div>
          <div class="uploader w-42 flex" >
            <input type="file" multiple placeholder="ឯកសារយោង" @change="handleExcelFile" class="hidden " id="referenceDocument" accept=".xlsx, .xls" />
            <n-button 
              icon-placement="left"
              :disabled="uploading" type="info" @click="importExcelFile"
              >
              <template #icon>
                <NIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494zM514.1 580.1l-61.8-102.4c-2.2-3.6-6.1-5.8-10.3-5.8h-38.4c-2.3 0-4.5.6-6.4 1.9c-5.6 3.5-7.3 10.9-3.7 16.6l82.3 130.4l-83.4 132.8a12.04 12.04 0 0 0 10.2 18.4h34.5c4.2 0 8-2.2 10.2-5.7L510 664.8l62.3 101.4c2.2 3.6 6.1 5.7 10.2 5.7H620c2.3 0 4.5-.7 6.5-1.9c5.6-3.6 7.2-11 3.6-16.6l-84-130.4l85.3-132.5a12.04 12.04 0 0 0-10.1-18.5h-35.7c-4.2 0-8.1 2.2-10.3 5.8l-61.2 102.3z" fill="currentColor"></path></svg>
                </NIcon>
              </template>
              ជ្រើសរើសឯកសារ Excel
            </n-button>
          </div>
        </div>
      </div>
      <!-- Filter panel of crud -->
      <div class="filters-bar"></div>
    </div>
    <!-- Table of crud -->
    <div class="mt-4 mb-24 relative">
      <div v-if="unregisterEmployeeCodes.length" class="w-full my-1 mb-2 py-2 text-left text-md text-red-600 " >
        {{ 'មានមន្ត្រីដែលមិនទាន់បានចុះឈ្មោះចំនួន៖ ' + unregisterEmployeeCodes.length + ' នៃតួលេខសរុប ' + allEmployeeCodes.length + ' ។ សូមពិនិត្យបន្ទាប់ក្រហមខាងក្រោម។' }}
        <n-button type="default" @click="toggleRegisterOfficers">{{ toggleOfficer != true ? 'បុគ្គលិកគ្មានក្នុងប្រព័ន្ធ' : 'បុគ្គលិកក្នុងប្រព័ន្ធ' }}</n-button>
        <n-button type="default" @click="resetEmployeeCodes">បង្ហាញទាំងអស់</n-button>
      </div>
      <div v-if="files != null && files.length" class="w-full my-1 mb-2 py-2 text-left text-md text-red-600 " >
        កំពុងអានឯកសារឈ្មោះ ៖ {{  currentFile != null ? currentFile.name : ''  }}។ {{ currentFileIndex != null ? currentFileIndex + 1 : 0 }} នៃ {{ files != null ? files.length : 0 }}
      </div>
      <div v-if="rows.length">
        <table class="vcb-table mb-40 ">
          <thead>
            <tr >
              <th class="capital" >{{ ( columns[0] + '' ).toUpperCase().replaceAll( '_' , ' ' ) }}</th>
              <th class="capital" >{{ ( columns[1] + '' ).toUpperCase().replaceAll( '_' , ' ' ) }}</th>
              <th class="capital" >{{ ( columns[2] + '' ).toUpperCase().replaceAll( '_' , ' ' ) }}</th>
              <th class="capital" >{{ ( columns[3] + '' ).toUpperCase().replaceAll( '_' , ' ' ) }}</th>
              <th class="capital" >{{ ( columns[4] + '' ).toUpperCase().replaceAll( '_' , ' ' ) }}</th>
              <th class="capital" >{{ ( columns[5] + '' ).toUpperCase().replaceAll( '_' , ' ' ) }}</th>
              <th class="capital" >{{ ( columns[6] + '' ).toUpperCase().replaceAll( '_' , ' ' ) }}</th>
              <th class="capital" >{{ ( columns[7] + '' ).toUpperCase().replaceAll( '_' , ' ' ) }}</th>
              <th class="capital" >{{ ( columns[8] + '' ).toUpperCase().replaceAll( '_' , ' ' ) }}</th>
              <th class="capital" >{{ ( columns[9] + '' ).toUpperCase().replaceAll( '_' , ' ' ) }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in filteredRows" :key="index" :class="( row[10] ? ' bg-yellow-100' : ' ' ) + ( row[11] == false ? ' bg-red-200 ' : ' ' ) " >
              <td class="text-center font-bold" >{{ row[0] }}</td>
              <td>{{ row[1] }}</td>              
              <td>{{ row[2] }}</td>
              <td>{{ row[3] }}</td>
              <td>{{ row[4] }}</td>
              <td>{{ row[5] }}</td>
              <td>{{ row[6] }}</td>
              <td>{{ row[7] }}</td>
              <td :class=" row[10] == false ? '' : ( row[8].toLowerCase() == 'ab' ? ' text-red-700' : '' ) " >{{ row[8] }}</td>
              <td>{{ row[9] }}</td>
              <!-- <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                {{ cell }}
              </td> -->
            </tr>
          </tbody>
        </table>
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
import * as XLSX from 'xlsx'
/**
 * CRUD component form
 */
export default {
  name: "Officer Import" ,
  components: {
    QrcodeVue ,
    Vue3Barcode ,
    TableActionsForm
  },
  setup(){
    var store = useStore()
    const notify = useNotification()
    /**
     * Variables
     */    
    var model = reactive( {
      name: "Officer Import" ,
      module: 'officer' ,
      title: "នាំចូលព័ឥ៌មានបុគ្គលិក"
    })


    const uploading = ref(false)
    const officerCodes = ref([])
    const rows = ref([])
    const columns = ref([])
    const filteredRows = ref([])
    const allEmployeeCodes = ref([])
    const registerEmployeeCodes = ref([])
    const unregisterEmployeeCodes = ref([])
    const files = ref(null)
    const currentFile = ref(null)
    const currentFileIndex = ref(0)
    function handleExcelFile(event){
      files.value = event.target.files
      rows.value = []
      columns.value = []
      filteredRows.value = [] 
      registerEmployeeCodes.value = []
      unregisterEmployeeCodes.value = []

      for (let i = 0; i < files.value.length; i++) {
        const file = files.value[i];

        const reader = new FileReader();
        
        reader.onload = (e) => {

          const data = new Uint8Array(e.target.result);
        
          const workbook = XLSX.read(data, { 
            type: 'array' ,
            cellDates: true,  // Parse dates
            dateNF: 'm/d/yyyy' // Optional: specify date format
          });
          
          // Get first worksheet
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          
          currentFileIndex.value = i
          currentFile.value = file

          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          jsonData.shift().map( (column) => { 
            columns.value.push( column )
          })

          console.log( (i + 1) + '. ' + file.name )

          let formatedData = reformatData( jsonData )

          // rows.value = rows.value.concat( formatedData )
        }
        reader.readAsArrayBuffer(file)
      }
      toggleOfficer.value = false
      toggleRegisterOfficers()
    }

    function reformatData( jsonData ){
      console.log( jsonData ) 
      // return jsonData.map( (row) => {
      //   let date = row[3] != undefined && row[3] != "" && row[3] instanceof Date && !isNaN(row[3]) ? new Date( row[3] ) : false
      //   if( date != false ){
      //     date.setDate(date.getDate() + 1)
      //   }

      //   row[1] = row[1] != undefined && row[1] != '' && row[1].length > 0 ? row[1].trim() : row[1]
      //   row[3] = date != false ? dateFormat( date , "yyyy-mm-dd" ) : '' 
      //   row[4] = row[4] != undefined && row[4] != "" && row[4] instanceof Date && !isNaN(row[4]) ? dateFormat( new Date( row[4] ) , "HH:mm" ) : row[4]
      //   row[5] = row[5] != undefined && row[5] != "" && row[5] instanceof Date && !isNaN(row[5]) ? dateFormat( new Date( row[5] ) , "HH:mm" ) : row[5]
      //   row[6] = row[6] != undefined && row[6] != "" && row[6] instanceof Date && !isNaN(row[6]) ? dateFormat( new Date( row[6] ) , "HH:mm" ) : row[6]
      //   row[7] = row[7]  != undefined && row[7] != "" && row[7] instanceof Date && !isNaN(row[7]) ? dateFormat( new Date( row[7] ) , "HH:mm" ) : row[7]
      //   row[10] = row[8] == undefined || row[8] == '' 
      //           ? false
      //           : ( 
      //             row[8] != undefined && row[8] != '' && row[8].length > 0 && attendanceTypes.value.includes(row[8]) 
      //               ? true
      //               : false 
      //           )
      //   row[11] = officerCodes.value.length <= 0 
      //     ? true 
      //     : (
      //       officerCodes.value.filter( (code) => code == row[1] ).length > 0 ? true : false
      //     )
        
      //   allEmployeeCodes.value.push( row )
      //   if( row[11] == true ){
      //     registerEmployeeCodes.value.push( row )
      //   }else{
      //     unregisterEmployeeCodes.value.push( row )
      //   }

      //   // return [
      //   //   row[0] ,
      //   //   row[1] ,
      //   //   row[2] ,
      //   //   row[3] ,
      //   //   row[4] ,
      //   //   row[5] ,
      //   //   row[6] ,
      //   //   row[7] ,
      //   //   row[8] ,
      //   //   row[9] ,
      //   //   row[10] ,
      //   //   row[11] 
      //   // ]
      //   return row ;
      // })
    }

    function importExcelFile(){
      document.getElementById('referenceDocument').click();
    }

    const search = ref('')
    function filterRecords(){
      if( search.value != undefined && search.value != '' && search.value.trim().length > 0 ){
        filteredRows.value = rows.value.filter( (r) => { return r[1].toLowerCase().includes( search.value.toLowerCase() ) || r[2].toLowerCase().includes( search.value.toLowerCase() ) } )
      }else if ( search.value != undefined && search.value == '' ){
        filteredRows.value = rows.value
      }
      console.log( search.value )
    }

    const importResult = ref([])
    function registerAttendances(){
      if( filteredRows.value.length > 0 ){        
        uploading.value = true 
        store.dispatch( 'attendance/importAttantances', { attendances: registerEmployeeCodes.value } ).then( res => {
          if( res.data.ok == true ){
            rows.value = []
            columns.value = []
            filteredRows.value = [] 
            registerEmployeeCodes.value = []
            unregisterEmployeeCodes.value = [] 
            uploading.value = false
            notify.success({
              title: 'ចុះវត្តមាន' ,
              content: 'ចុះវត្តមានបានរួចរាល់។' ,
              duration: 3000
            })
          }
        }).catch( err => console.log( err ) )
      }else{
        notify.info({
          title: 'ចុះវត្តមាន' ,
          content: 'មិនមានវត្តមានឡើយ។' ,
          duration: 2000
        })
      }
    }

    function getOfficerCodes(){
      store.dispatch( 'officer/getCodes' ).then( res => {
        officerCodes.value = res.data.codes
      }).catch( err => console.log( err ))
    }

    const toggleOfficer = ref(false)
    function toggleRegisterOfficers(){
      toggleOfficer.value = !toggleOfficer.value
      rows.value = toggleOfficer.value != true ? registerEmployeeCodes.value : unregisterEmployeeCodes.value
      filteredRows.value = rows.value
    }
    function resetEmployeeCodes(){
      rows.value = allEmployeeCodes.value
      filteredRows.value = rows.value
    }

    /**
     * Initial the data
     */
    getOfficerCodes()

    return {
      /**
       * Variables
       */
      model ,
      columns ,
      rows ,
      filteredRows ,
      search ,
      unregisterEmployeeCodes ,
      registerEmployeeCodes ,
      allEmployeeCodes ,
      uploading ,
      toggleOfficer , 
      files , 
      currentFile ,
      currentFileIndex ,
      /**
       * Functions
       */
      ocmLogoUrl ,
      handleExcelFile ,
      importExcelFile ,
      dateFormat  ,
      filterRecords ,
      registerAttendances ,
      toggleRegisterOfficers ,
      resetEmployeeCodes
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
</style>