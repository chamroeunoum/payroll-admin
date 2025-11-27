<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-bind:show="show" :on-esc="maskOrEscClick" :on-mask-click="maskOrEscClick"  :on-after-enter="initial" transform-origin="center">
        <n-card class="w-11/12 font-pvh text-xl p-0 " :bordered="false" size="small">
          <!-- Form edit account -->
          <div class="card relative border border-gray-300 rounded p-8 -my-3 -mx-4">
            <Transition name="fade" >
              <div v-if="services != undefined && Array.isArray( services ) && services.length > 0 " class="vcb-thumbnail mb-12" >
                <div v-for="(record, index) in services" :key='index' class="item " >
                  <div class="content" @click="confirmStartService(record)" >
                    <div v-if="record.image != false && record.image != null && record.image != undefined " class="image bg-80% bg-cover bg-center bg-no-repeat " :style=" 'background-image: url(' + record.image +');' " ></div>
                    <div v-if="record.image == false || record.image == null || record.image == undefined " class="image bg-contain bg-center bg-no-repeat " :style=" 'background-image: url('+ocmLogoUrl+');' " ></div>
                    <div class="flex flex-wrap " >
                      <div class="w-full py-2" >
                        <div class="w-full text-center font-moul leading-6 tracking-wider" >{{ record.name }}</div>
                        <div class="w-full text-center leading-6 tracking-wider" >{{ record.price }} $</div>
                      </div>
                      <div class="w-full flex flex-wrap justify-between text-gray-600" >
                        <div class="w-1/2 text-left text-vcb-xs my-1 leading-5 tracking-wider" >
                          <div v-if="record.number_services != undefined && record.number_services != null " class="w-full text-center" >ចំនួនសេវា<br/>{{ $toKhmer( record.number_services ) }}</div>
                        </div>
                        <div class="w-1/2 text-right text-vcb-xs my-1  leading-5 tracking-wide" >
                          <div v-if="record.cycle_months != undefined && record.cycle_months != null " class="w-full text-center" >ក្នុងរយះពេល<br/>{{ $toKhmer( record.cycle_months ) }}</div>
                        </div>
                      </div>
                    </div>
                    <div v-if="selectedServices.find( sc => sc.service_id == record.id )" class="absolute left-1 top-1 w-6 h-6" >
                      <svg class="text-green-600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z" fill="currentColor"></path></svg>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </n-card>
      </n-modal>
      <n-modal v-bind:show="confirmServiceHelper" transform-origin="center" >
        <div class="confirm_start_n_total_modal bg-white rounded p-8"  >
          <div class="mb-4 ">សូមបញ្ជាក់ថ្ងៃចាប់ផ្ដើមសេវា និងចំនួនដងនៃការអនុវត្តសេវាឡើងវិញ</div>
          <div class="w-full p-2">
            ថ្ងៃចាប់ផ្ដើម
            <n-date-picker v-model:value="startDate" type="date" format="dd-MM-yyyy" class="mt-2"/>
          </div>
          <div class="w-full p-2">
            ចំនួនដងអនុវត្តសេវាឡើងវិញ
            <n-input-number :min="0" v-model:value="totalRepeat" clearable class="mt-2"/>
          </div>
          <div class="w-full p-2 text-center " >
            <n-button type="success" class="mx-2" ghost @click="toggleService" >
              បញ្ចូលសេវា
            </n-button>
            <n-button type="default" class="mx-2" ghost @click="closeConfirmService" >
              បិទ
            </n-button>
          </div>
        </div>
      </n-modal>
    </div>
    <!-- End of edit account -->
</template>
<script>
import { reactive , ref , computed } from 'vue'
import { useStore } from 'vuex'
import { useMessage, useNotification , useDialog } from 'naive-ui'
import Frame4Corner from '../../widgets/frame/corner4.vue'
import QrcodeVue from 'qrcode.vue'
import ocmLogoUrl from './../../../assets/logo.jpg'
import dateFormat from 'dateformat'

export default {
  components: {
    Frame4Corner ,
    QrcodeVue
  },
  props: {
    model: {
      type: Object ,
      required: true ,
      default: () => {
        return reactive({
          name: 'Undefined' ,
          title: 'No title'
        })
      },
      // validator: (val) => {}
    } , 
    record: {
      type: Object ,
      required: true
    },
    show: {
      type: Boolean ,
      default: false
    },
    onClose: {
      type: Function
    } ,
    // onShow: {
    //   type: Function
    // }
  },
  setup(props){
    var store = useStore()
    const message = useMessage()
    const notify = useNotification()
    const dialog = useDialog()

    const selectedServices = ref([])
    const services = computed( () => 
      store.getters['service/records'].all
    )

    const selectedService = ref(null)
    const confirmServiceHelper = ref(false)
    function confirmStartService(service){
      
      if( props.record.service_contracts != undefined && props.record.service_contracts != null && props.record.service_contracts.length > 0 && props.record.service_contracts.find( sc => sc.service_id == service.id ) ){
        dialog.warning({
          title: "សេវាកម្មក្នុងកិច្ចសន្យា" ,
          content: "តើអ្នកចង់ដកសេវានេះចេញមែនទេ?" ,
          positiveText: 'បាទ / ចាស',
          negativeText: 'ទេ',
          onPositiveClick: () => {
            startDate.value = new Date().getTime()
            totalRepeat.value = 0
            selectedService.value = service
            toggleService()
          },
          onNegativeClick: () => {
            
          }
        })
      }else{
        selectedService.value = service
        confirmServiceHelper.value = true 
      }
    }
    function closeConfirmService(){
      selectedService.value = null
      startDate.value = new Date().getTime()
      totalRepeat.value = 0
      confirmServiceHelper.value = false
    }

    function toggleService(){
      if( selectedService.id <= 0 ){
        notify.warning({
          title: 'ពិនិត្យព័ត៌មាន' ,
          description: 'សូមបញ្ជាក់សេវាដែលត្រូវដាក់បញ្ចូល' ,
          duration: 2000
        })
        return false
      }
      if( props.model === undefined || props.model.name == "" ){
        notify.warning({
          title: 'ពិនិត្យព័ត៌មាន' ,
          description: 'ទម្រង់នៃព័ត៌មានមិនទាន់បានកំណត់។' ,
          duration: 2000
        })
        return false
      }

      store.dispatch( props.model.name+'/toggleService',{
        id: props.record.id ,
        service_id : parseInt( selectedService.value.id ) ,
        start : dateFormat( new Date( startDate.value ) , 'yyyy-mm-dd' ) ,
        total_repeat : parseInt( totalRepeat.value ) > 0 ? parseInt( totalRepeat.value ) : 0
      }).then( res => {
        if( res.data.ok ){
          selectedServices.value = res.data.record.service_contracts
          props.record.service_contracts = res.data.record.service_contracts
          notify.success({
            title: 'រក្សារទុកព័ត៌មាន' ,
            description: res.data.message ,
            duration: 2000
          })
        }else{
          notify.error({
            title: 'រក្សារទុកព័ត៌មាន' ,
            description: 'មានបញ្ហាក្នុងពេលរក្សារទុកព័ត៌មាន។' ,
            duration: 2000
          })
        }
      }).catch( err => {
        message.error( err )
      })
      closeConfirmService()
    }
  
    function maskOrEscClick(){
      props.onClose( 1 )
    }

    function initial(){
      selectedServices.value = props.record.service_contracts != null && props.record.service_contracts != undefined 
        ? props.record.service_contracts : [] 
    }

    const startDate = ref( Date.parse( props.record.start ) )
    const totalRepeat = ref(0)

    return {
      /**
       * Variables
       */
      services ,
      toggleService ,
      /**
       * Functions
       */
      initial ,
      maskOrEscClick ,
      ocmLogoUrl ,
      dateFormat ,
      selectedServices ,
      selectedService ,
      startDate ,
      totalRepeat ,
      confirmServiceHelper ,
      confirmStartService ,
      closeConfirmService
    }
  }
}
</script>

<style type="text/css" scoped >
.vcb-thumbnail {
  @apply flex flex-wrap justify-center;
}
.vcb-thumbnail .item {
  @apply xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/3 w-1/2 p-2 ;
}
.vcb-thumbnail .item .content {
  @apply border rounded-lg hover:shadow duration-500 p-4 relative hover:scale-105 transform-gpu bg-white hover:bg-yellow-100 cursor-pointer;
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