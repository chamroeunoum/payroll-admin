<template>
    <div class="vcb-pop-create font-ktr">
      <n-modal v-bind:show="show" :on-esc="maskOrEscClick" :on-mask-click="maskOrEscClick" :on-after-enter="initial" transform-origin="center">
        <n-card class="w-10/12 sm:w-3/4 md:w-8/12 lg:w-3/5 xl:w-7/12 " title="បន្ថែម សំណើរឈប់សម្រាក" :bordered="false" size="small">
          <template #header-extra>
            <n-button type="success" @click="create" >
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M3 5a2 2 0 0 1 2-2h8.379a2 2 0 0 1 1.414.586l1.621 1.621A2 2 0 0 1 17 6.621V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1v-4.5A1.5 1.5 0 0 1 6.5 10h7a1.5 1.5 0 0 1 1.5 1.5V16a1 1 0 0 0 1-1V6.621a1 1 0 0 0-.293-.707l-1.621-1.621A1 1 0 0 0 13.379 4H13v2.5A1.5 1.5 0 0 1 11.5 8h-4A1.5 1.5 0 0 1 6 6.5V4H5zm2 0v2.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4H7zm7 12v-4.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V16h8z" fill="currentColor"></path></g></svg>
              </template>
              រក្សារទុក
            </n-button>
          </template>
          <div class="crud-create-form w-full border-t">
            <div class="mx-auto p-4 flex-wrap">
              <div class="crud-form-panel w-full flex flex-wrap ">
                <n-form class="w-full text-left font-btb flex flex-wrap" :label-width="80" :model="record" size="large">
                  <n-form-item label="បុគ្គលិក" class="w-1/2 p-1" >
                    <n-select v-model:value="record.officer_id" filterable placeholder="ជ្រើសរើសបុគ្គលិក" :options="officerOptions" />
                  </n-form-item>
                  <n-form-item label="ប្រភេទ" class="w-1/2 p-1" >
                    <n-select v-model:value="record.type" placeholder="ជ្រើសរើសប្រភេទ" :options="typeOptions" />
                  </n-form-item>
                  <n-form-item label="ថ្ងៃចាប់ផ្ដើម" class="w-1/2 p-1" >
                    <n-date-picker v-model:value="startDate" type="date" format="dd-MM-yyyy" placeholder="ថ្ងៃចាប់ផ្ដើម" class="w-full" />
                  </n-form-item>
                  <n-form-item label="ថ្ងៃបញ្ចប់" class="w-1/2 p-1" >
                    <n-date-picker v-model:value="endDate" type="date" format="dd-MM-yyyy" placeholder="ថ្ងៃបញ្ចប់" class="w-full" />
                  </n-form-item>
                </n-form>
              </div>
            </div>
          </div>
          <template #footer></template>
        </n-card>
      </n-modal>
    </div>
</template>
<script>
import { reactive, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useMessage, useNotification } from 'naive-ui'
import dateFormat from 'dateformat'

export default {
  props: {
    model: { type: Object, required: true },
    show: { type: Boolean, default: false },
    onClose: { type: Function }
  },
  setup(props){
    const store = useStore()
    const message = useMessage()
    const notify = useNotification()
    const startDate = ref(null)
    const endDate = ref(null)
    const officerOptions = ref([])

    const typeOptions = [
      { label: 'ឈឺ', value: 'sick' },
      { label: 'សម្រាកកាយ', value: 'maternity' },
      { label: 'រៀបការ', value: 'marriage' },
      { label: 'បុណ្យសព', value: 'funeral' },
      { label: 'ប្រចាំឆ្នាំ', value: 'annual' },
      { label: 'ផ្ទាល់ខ្លួន', value: 'personal' }
    ]

    const record = reactive({
      officer_id: null,
      type: '',
      start: '',
      end: ''
    })

    function initial(){
      loadOfficers()
    }

    function loadOfficers(){
      store.dispatch('officer/list',{ perPage: 200, page: 1 }).then(res => {
        if( res.data && res.data.records ){
          officerOptions.value = res.data.records.map(o => ({
            label: (o.people ? o.people.lastname + ' ' + o.people.firstname : '') + ' (' + o.code + ')',
            value: o.id
          }))
        }
      }).catch(err => console.log(err))
    }

    function create(){
      if( !record.officer_id ){ notify.warning({ title: 'ពិនិត្យព័ត៌មាន', description: 'សូមជ្រើសរើសបុគ្គលិក។', duration: 3000 }); return }
      if( !record.type ){ notify.warning({ title: 'ពិនិត្យព័ត៌មាន', description: 'សូមជ្រើសរើសប្រភេទ។', duration: 3000 }); return }

      record.start = startDate.value ? dateFormat( new Date(startDate.value), "yyyy-mm-dd" ) : ''
      record.end = endDate.value ? dateFormat( new Date(endDate.value), "yyyy-mm-dd" ) : ''

      store.dispatch('leaverequest/create', {
        officer_id: record.officer_id,
        type: record.type,
        start: record.start,
        end: record.end,
        approved: 0
      }).then(res => {
        if( res.status == 200 ){
          notify.success({ title: 'រក្សារទុកព័ត៌មាន', description: res.data.message, duration: 3000 })
          props.onClose(1)
        }
      }).catch(err => {
        notify.error({ title: 'រក្សារទុកព័ត៌មាន', description: 'មានបញ្ហាក្នុងពេលរក្សារទុកព័ត៌មាន។', duration: 3000 })
      })
    }

    function maskOrEscClick(){ props.onClose(0) }

    return { record, startDate, endDate, typeOptions, officerOptions, create, maskOrEscClick, initial, loadOfficers }
  }
}
</script>
