<template>
  <div class="relative" >
  <!-- Top action panel of crud -->
    <div class="flex title-bar border-b border-gray-200">
      <!-- Title of crud -->
      <div class="flex w-64 h-10 py-1 title " >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M14 4.5A2.5 2.5 0 0 0 11.5 2h-7A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h1.757a5.507 5.507 0 0 1-.657-1H4.5A1.5 1.5 0 0 1 3 11.5V6h4.337c.895-.63 1.986-1 3.163-1c1.33 0 2.55.472 3.5 1.257V4.5zm-3.5.5H3v-.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5V5h-2.5zM6.635 9.92a2 2 0 0 0 1.43-2.478l-.155-.557c.254-.195.529-.362.821-.497l.338.358a2 2 0 0 0 2.91.001l.324-.343c.298.14.578.314.835.518l-.126.422a2 2 0 0 0 1.456 2.519l.349.082a4.698 4.698 0 0 1 .01 1.017l-.46.118a2 2 0 0 0-1.431 2.478l.156.556c-.254.196-.53.363-.822.498l-.338-.358a2 2 0 0 0-2.909-.002l-.325.345a4.322 4.322 0 0 1-.835-.518l.127-.423a2 2 0 0 0-1.456-2.519l-.35-.083a4.702 4.702 0 0 1-.01-1.016l.461-.118zm4.865.58a1 1 0 1 0-2 0a1 1 0 0 0 2 0z" fill="currentColor"></path></g></svg>
        <div class="font-moul ml-2 leading-9" v-html="model.title" ></div>
      </div>
      <!-- Actions button of the crud -->
      <div class="flex-grow action-buttons flex-row-reverse flex">
        <!-- New Button -->
        <!-- <div class="mt-1 ml-2 flex flex-wrap">
          
        </div> -->
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
        <div class="mt-1 ml-2 flex flex-wrap">
          <n-tooltip trigger="hover">
            <template #trigger>
              <router-link to="/setting" >
                <svg class="w-8 h-8 mx-1 cursor-pointer hover:text-green-500 duration-300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M1.91 7.383a8.491 8.491 0 0 1 1.78-3.08a.5.5 0 0 1 .54-.135l1.918.686a1 1 0 0 0 1.32-.762l.366-2.006a.5.5 0 0 1 .388-.4a8.532 8.532 0 0 1 3.555 0a.5.5 0 0 1 .387.4l.367 2.006a1 1 0 0 0 1.32.762l1.918-.686a.5.5 0 0 1 .54.136a8.491 8.491 0 0 1 1.78 3.079a.5.5 0 0 1-.152.535l-1.555 1.32a1 1 0 0 0 0 1.524l1.555 1.32a.5.5 0 0 1 .152.535a8.491 8.491 0 0 1-1.78 3.08a.5.5 0 0 1-.54.135l-1.918-.686a1 1 0 0 0-1.32.762l-.367 2.007a.5.5 0 0 1-.387.399a8.53 8.53 0 0 1-3.555 0a.5.5 0 0 1-.388-.4l-.365-2.006a1 1 0 0 0-1.32-.762l-1.919.686a.5.5 0 0 1-.54-.136a8.49 8.49 0 0 1-1.78-3.079a.5.5 0 0 1 .153-.535l1.554-1.32a1 1 0 0 0 0-1.524l-1.554-1.32a.5.5 0 0 1-.153-.535zm1.061-.006l1.294 1.098a2 2 0 0 1 0 3.05L2.97 12.623c.292.782.714 1.51 1.245 2.152l1.596-.57a2 2 0 0 1 2.64 1.525l.305 1.668a7.556 7.556 0 0 0 2.485 0l.305-1.67a1.998 1.998 0 0 1 2.64-1.524l1.597.571a7.492 7.492 0 0 0 1.245-2.152l-1.294-1.098a1.998 1.998 0 0 1 0-3.05l1.294-1.098a7.491 7.491 0 0 0-1.245-2.152l-1.596.57a2 2 0 0 1-2.64-1.524l-.306-1.669a7.555 7.555 0 0 0-2.485 0l-.304 1.669a2 2 0 0 1-2.641 1.525l-1.596-.571a7.491 7.491 0 0 0-1.245 2.152zM7.5 10a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0zm1 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 0 0-3 0z" fill="currentColor"></path></g></svg>
              </router-link>
            </template>
            ត្រឡប់ទៅ ការកំណត់
          </n-tooltip>
        </div>
      </div>
    </div>
    <!-- Table of crud -->
    <div class="vcb-table-panel relative ">
      <Transition name="fade" >
        <div v-if="Array.isArray( table.records.matched ) && table.records.matched.length > 0 " class="vcb-thumbnail mb-12" >
          <div class="w-full shadow p-4 m-2 rounded bg-white  flex flex-wrap " >
            <div class="font-moul text-left w-full mb-2 border-b border-gray-200 pb-2 " >ការកំណត់ចំនួន ថ្ងៃ ម៉ោង ធ្វើការ</div>
            <div v-for="(record, index) in table.records.matched.filter( ( r ) => r.key == 'working_days_of_week' || r.key == 'total_hours_per_day' || r.key == 'total_days_per_month' )" :key='index' class="item " >
              <div v-if="record.key!='working_days_of_week'" class=" content"  >
                <!-- <div v-if="record.image != false && record.image != null && record.image != undefined " class="image bg-80% bg-cover bg-center bg-no-repeat " :style=" 'background-image: url(' + record.image +');' " ></div>
                <div v-if="record.image == false || record.image == null || record.image == undefined " class="image bg-contain bg-center bg-no-repeat " :style=" 'background-image: url('+ orgLogoUrl +');' " ></div> -->
                <div class="flex flex-wrap " >
                  <div class="w-full py-2" >
                    <div class="w-full text-center font-btb-black leading-6 tracking-wider" >{{ record.name }}</div>
                  </div>
                  <div class="w-full relative flex flex-wrap" >
                    <div class="w-full text-left text-xs text-gray-500 leading-5 tracking-wider" >
                      <n-input-number :min="0" :placeholder="record.name" v-model:value="record.value" @blur="update(record)" />
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="record.key=='working_days_of_week'" class=" content"  >
                <div class="flex flex-wrap " >
                  <div class="w-full py-2" >
                    <div class="w-full text-center font-btb-black leading-6 tracking-wider" >{{ record.name }}</div>
                  </div>
                  <div class="w-full relative flex flex-wrap" >
                    <div class="w-full text-left text-xs text-gray-500 leading-5 tracking-wider" >
                      <n-checkbox-group v-model:value="optionDays" @update:value="updateCheckbox(record)">
                        <n-space item-style="display: flex;">
                          <n-checkbox :value="1" label="ចន្ទ" />
                          <n-checkbox :value="2" label="អង្គារ៍" />
                          <n-checkbox :value="3" label="ពុធ" />
                          <n-checkbox :value="4" label="ព្រហស្បត៍" />
                          <n-checkbox :value="5" label="សុក្រ" />
                          <n-checkbox :value="6" label="សៅរ៍" />
                        </n-space>
                      </n-checkbox-group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full shadow p-4 m-2 rounded bg-white  flex flex-wrap " >
            <div class="font-moul text-left w-full mb-2 border-b border-gray-200 pb-2 " >ការពិន័យ</div>
            <div v-for="(record, index) in table.records.matched.filter( ( r ) => r.key == 'total_days_late_payment' || r.key == 'total_amount_late_pay' )" :key='index' class="item " >
              <div class=" content"  >
                <!-- <div v-if="record.image != false && record.image != null && record.image != undefined " class="image bg-80% bg-cover bg-center bg-no-repeat " :style=" 'background-image: url(' + record.image +');' " ></div>
                <div v-if="record.image == false || record.image == null || record.image == undefined " class="image bg-contain bg-center bg-no-repeat " :style=" 'background-image: url('+ orgLogoUrl +');' " ></div> -->
                <div class="flex flex-wrap " >
                  <div class="w-full py-2" >
                    <div class="w-full text-center font-btb-black leading-6 tracking-wider" >{{ record.name }}</div>
                  </div>
                  <div class="w-full relative flex flex-wrap" >
                    <div class="w-full text-left text-xs text-gray-500 leading-5 tracking-wider" >
                      <n-input-number :min="0" :placeholder="record.name" v-model:value="record.value" @blur="update(record)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full shadow p-4 m-2 rounded bg-white  flex flex-wrap " >
            <div class="font-moul text-left w-full mb-2 border-b border-gray-200 pb-2 " >ថ្លៃសេវាផ្សេងៗ និងអាត្រាប្ដូរប្រាក់</div>
            <div v-for="(record, index) in table.records.matched.filter( ( r ) => r.key == 'water_price' || r.key == 'electricity_price' || r.key == 'daily_exchange_rate' )" :key='index' class="item " >
              <div class=" content"  >
                <!-- <div v-if="record.image != false && record.image != null && record.image != undefined " class="image bg-80% bg-cover bg-center bg-no-repeat " :style=" 'background-image: url(' + record.image +');' " ></div>
                <div v-if="record.image == false || record.image == null || record.image == undefined " class="image bg-contain bg-center bg-no-repeat " :style=" 'background-image: url('+ orgLogoUrl +');' " ></div> -->
                <div class="flex flex-wrap " >
                  <div class="w-full py-2" >
                    <div class="w-full text-center font-btb-black leading-6 tracking-wider" >{{ record.name }}</div>
                  </div>
                  <div class="w-full relative flex flex-wrap" >
                    <div class="w-full text-left text-xs text-gray-500 leading-5 tracking-wider" >
                      <n-input-number :min="0" :placeholder="record.name" v-model:value="record.value" @blur="update(record)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full shadow p-4 m-2 rounded bg-white  flex flex-wrap " >
            <div class="font-moul text-left w-full mb-2 border-b border-gray-200 pb-2 " >ការកំណត់ពីវត្តមាន</div>
            <div v-for="(record, index) in table.records.matched.filter( ( r ) => r.key == 'daily_working_hours' || r.key == 'attn_mode_maternity_leave' || r.key == 'attn_mode_annual_leave' || r.key == 'attn_mode_married_leave' || r.key == 'attn_mode_sick_leave' || r.key == 'attn_ot_weekend_percentage' || r.key == 'attn_ot_holiday_percentage' || r.key == 'attn_bonus_permonth' || r.key == 'attn_ot_percentage' )" :key='index' class="item " >
              <div class=" content"  >
                <!-- <div v-if="record.image != false && record.image != null && record.image != undefined " class="image bg-80% bg-cover bg-center bg-no-repeat " :style=" 'background-image: url(' + record.image +');' " ></div>
                <div v-if="record.image == false || record.image == null || record.image == undefined " class="image bg-contain bg-center bg-no-repeat " :style=" 'background-image: url('+ orgLogoUrl +');' " ></div> -->
                <div class="flex flex-wrap " >
                  <div class="w-full py-2" >
                    <div class="w-full text-center font-btb-black leading-6 tracking-wider" >{{ record.name }}</div>
                  </div>
                  <div class="w-full relative flex flex-wrap" >
                    <div class="w-full text-left text-xs text-gray-500 leading-5 tracking-wider" >
                      <n-input-number :min="0" :placeholder="record.name" v-model:value="record.value" @blur="update(record)" />
                    </div>
                  </div>
                  <div v-if="record.desp != null && record.desp != '' " class=" mt-2 " >
                    <prep class="leading-5" style="font-size: 0.6rem; " >{{ record.desp }}</prep>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div v-for="(record, index) in table.records.matched" :key='index' class="item " >
            <div class=" content"  >
              <div v-if="record.image != false && record.image != null && record.image != undefined " class="image bg-80% bg-cover bg-center bg-no-repeat " :style=" 'background-image: url(' + record.image +');' " ></div>
              <div v-if="record.image == false || record.image == null || record.image == undefined " class="image bg-contain bg-center bg-no-repeat " :style=" 'background-image: url('+ orgLogoUrl +');' " ></div>
              <div class="flex flex-wrap " >
                <div class="w-full py-2" >
                  <div class="w-full text-center font-btb-black leading-6 tracking-wider" >{{ record.name }}</div>
                </div>
                <div class="w-full relative flex flex-wrap" >
                  <div class="w-full text-left text-xs text-gray-500 leading-5 tracking-wider" >
                    <n-input-number :min="0" :placeholder="record.name" v-model:value="record.value" @blur="update(record)" />
                  </div>
                </div>
              </div>
            </div>
          </div> -->
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
  </div>
</template>
<script>
import { reactive ,ref } from 'vue'
import { useStore } from 'vuex'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import orgLogoUrl from './../../../assets/logo.jpg'
/**
 * CRUD component form
 */
export default {
  name: "User" ,
  components: {
  },
  setup(){
    const store = useStore()
    const notify = useNotification()
    /**
     * Variables
     */    
    const model = reactive( {
      name: "generalsetting" ,
      title: "ការកំណត់ទូទៅ"
    })
    const optionDays = ref()
    const table = reactive( {
      loading: false ,
      search: '' ,
      records: {
        all: [] ,
        matched: []
      },
      columns: {
        searchable: {
          name: '' ,
          group: ''
        },
        format: {
          name: '' ,
          value: '' ,
          group: ''
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

    function update(setting){
      store.dispatch(model.name+'/update',{
        id: setting.id ,
        value: setting.value ,
        options : setting.options
      }).then(res => {
        if( res.data.ok == true ){
          notify.success({
            title: 'កែប្រែការកំណត់' ,
            content: 'កែប្រែ' + setting.name + 'ទៅ ' + setting.value + ' រួចរាល់' ,
            duration: 3000
          })  
        }
      }).catch( err => {
        console.log( err )
      })
    }

    function updateCheckbox(setting){
      store.dispatch(model.name+'/update',{
        id: setting.id ,
        value: setting.value ,
        options : optionDays.value.join(',')
      }).then(res => {
        if( res.data.ok == true ){
          notify.success({
            title: 'កែប្រែការកំណត់' ,
            content: 'កែប្រែរួចរាល់' ,
            duration: 3000
          })  
        }
      }).catch( err => {
        console.log( err )
      })
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
        perPage: table.pagination.perPage ,
        page: table.pagination.page ,
      }).then(res => {
        table.records.all = table.records.matched = res.data.records
        table.pagination = res.data.pagination

        let record = res.data.records.find( r => r.key == 'working_days_of_week' )
        if( record != undefined ){
          console.log( record.options.split(',').map( o => parseInt( o ) ) )
          optionDays.value = record.options.split(',').map( o => parseInt( o ) )
        }
        
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
       * Functions
       */
      filterRecords ,
      filter ,
      update ,
      optionDays ,
      updateCheckbox
      /**
      * Filters
      */
    }
  }
}

</script>
<style type="text/css" scoped >
.vcb-thumbnail {
  @apply flex flex-wrap justify-center;
}
.vcb-thumbnail .item {
  @apply xl:w-1/3 lg:w-1/3 md:w-1/2 w-1/2 p-2 ;
}
.vcb-thumbnail .item .content {
  @apply border rounded-lg hover:shadow duration-500 p-4 relative bg-white hover:bg-yellow-100;
  min-height: 10rem;
}
.vcb-thumbnail .item .content-living {
  @apply  bg-green-100 hover:bg-green-200;
  min-height: 10rem;
}
.vcb-thumbnail .item .content-maintenance {
  @apply  bg-yellow-100 hover:bg-yellow-200;
  min-height: 10rem;
}
.vcb-thumbnail .item .content .image {
  @apply border rounded-full border-gray-200 p-2 w-20 h-20 flex-none mx-auto overflow-hidden bg-white ;
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