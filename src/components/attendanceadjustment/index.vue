<template>
  <div class="relative bg-gray-50 w-full min-h-screen" >
    <div class="top-10 right-0 bottom-0 left-40 absolute p-4">
      <div class="flex title-bar border-b border-gray-200">
        <div class="flex w-64 h-10 py-1 title " >
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M384 224v184a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V168a40 40 0 0 1 40-40h167.48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M459.94 53.25a16.06 16.06 0 0 0-23.22-.56L424.35 65a8 8 0 0 0 0 11.31l11.34 11.32a8 8 0 0 0 11.34 0l12.06-12c6.1-6.09 6.12-16.02.85-22.38z" fill="currentColor"/><path d="M399 93.09L340.44 152l-12.19-36.69A16 16 0 0 0 295 115.27l-79.95 80.28 16.38 32 31.63 16.18 80-80.35a16 16 0 0 0 0-22.61L387 102.7a8 8 0 0 0 0-11.31l-11.07-11.06a8 8 0 0 0-11.32 0l-78.19 78.77" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
          <div class="font-moul ml-2 leading-9" v-html="model.title" ></div>
        </div>
      </div>
      <div class="mt-4 mb-24 relative">
        <Transition name="fade" >
          <div v-if="Array.isArray( table.records.matched ) && table.records.matched.length > 0 " class="w-full" >
            <table class="vcb-table w-full" >
              <thead>
                <tr>
                  <th>ល.រ</th>
                  <th>គោលការណ៍</th>
                  <th>ប្រភេទ</th>
                  <th>ទឹកប្រាក់</th>
                  <th>តាមបំណង</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(record, index) in table.records.matched" :key='index' :class=" ( index % 2 ? ' bg-gray-100 ' : '' ) " >
                  <td>{{ $toKhmer( index + 1 ) }}</td>
                  <td>{{ record.attendancePolicy ? record.attendancePolicy.title : '' }}</td>
                  <td>{{ record.attendancePolicy ? record.attendancePolicy.type : '' }}</td>
                  <td>{{ $toKhmer( Number(record.amount).toFixed(2) ) }}</td>
                  <td>{{ record.is_amount_custom == 1 ? 'បាទ' : 'ទេ' }}</td>
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
    </div>
    <Topmenu type="sidebar" />
  </div>
</template>
<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import Topmenu from '@components/widgets/menu/topmenu.vue'

export default {
  name: "AttendanceAdjustmentPage",
  components: { Topmenu },
  setup(){
    var store = useStore()
    var model = reactive({ name: "attendanceadjustment", title: "ការកែតម្រូវវត្តមាន" })
    var table = reactive({
      loading: false,
      records: { all: [], matched: [] },
      pagination: { perPage: 20, page: 1, totalPages: 0, totalRecords: 0 }
    })

    function getRecords(){
      table.loading = true
      store.dispatch('attendanceadjustment/list',{ perPage: 50, page: 1 }).then(res => {
        table.records.all = table.records.matched = res.data.records
        table.pagination = res.data.pagination
        closeTableLoading()
      }).catch( err => { console.log( err ) })
    }
    function closeTableLoading(){ table.loading = false }

    getRecords()
    return { model, table, closeTableLoading }
  }
}
</script>
<style scoped>
.vcb-table thead tr { @apply bg-gray-200; }
.vcb-table thead tr th { @apply p-1; }
.vcb-table tbody tr td { @apply p-1; }
</style>
