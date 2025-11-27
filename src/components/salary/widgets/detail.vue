<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-bind:show="show" :on-esc="maskOrEscClick" :on-mask-click="maskOrEscClick"  :on-after-enter="initial" transform-origin="center">
        <n-card class="w-11/12 xl:w-7/12 lg:w-7/12 md:w-8/12 sm:w-11/12 font-pvh text-xl p-0 " :bordered="false" size="small">
          <!-- Form edit account -->
          <div class="card relative border border-gray-300 rounded p-8 -my-3 -mx-4">
            <div class="w-full my-4 font-moul text-center" >សង្ខេបពីប្រាក់ខែ</div>
            <table class="w-full " >
              <tbody>
              <tr>
                <td class="p-2" >ឈ្មោះ</td>
                <td class="p-2" >{{ record.officer.people.lastname + ' ' + record.officer.people.firstname }}</td>
                <td class="p-2" >ចូលធ្វើការថ្ងៃ</td>
                <td class="p-2 text-right" >{{ $toKhmer( record.officer.date ) }}</td>
              </tr>
              <tr>
                <td class="p-2" >តួនាទី</td>
                <td class="p-2" >{{ record.officer.position.name }}</td>
                <td class="p-2" >ប្រាក់ខែគោល</td>
                <td class="p-2 text-right" >{{ $toKhmer( parseFloat( record.officer.salary ).toFixed( 2 ) ) }}</td>
              </tr>
              </tbody>
            </table>
            <div class="w-full my-4 font-btb-black text-center" >ប្រាក់ខែសម្រាប់ខែ {{ $toKhmer( dateFormat( new Date(record.date) , 'mm-yyyy' ) ) }}</div>
            <table class="w-full" >
              <tbody>
              <tr >
                <td class=" w-8 p-2"  >{{ $toKhmer( 1 ) }}.</td>
                <td class="p-2" >ប្រាក់ខែគោល</td>
                <td class="p-2 text-green-600 text-right " >{{ $toKhmer( parseFloat( record.officer.salary ).toFixed(2) ) }}</td>
              </tr>
              <tr v-for="( sd , index ) in record.PayrollAdjustmentHistories " :key="index" >
                <td class=" w-8 p-2"  >{{ $toKhmer( index + 2 ) }}.</td>
                <td class="p-2" >{{ sd.salaryAdjustment.title  }}</td>
                <td :class=" ' p-2 text-right ' + ( sd.salary_adjustment_type == 1 ? ' text-green-600 ' : ' text-red-600 ' ) " >{{ sd.salary_adjustment_type == 1 ? '+' : '-' }}{{ parseFloat( sd.adjustment_amount ).toFixed(2)  }}</td>
              </tr>
              </tbody>
              <tfoot class="bg-gray-100" >
                <tr>
                <th colspan="2" class="p-2 text-right " >សរុប</th>
                <th class="p-1 text-right" >{{ $toKhmer( parseFloat( parseFloat( record.officer.salary ) + record.PayrollAdjustmentHistories.reduce( ( sum , adj ) => 
                  sum + ( ( adj.salary_adjustment_type != 1 ? -1 : 1 ) * adj.adjustment_amount )
                , 0 ) ).toFixed(2) ) }}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </n-card>
      </n-modal>
    </div>
    <!-- End of edit account -->
</template>
<script>
import { reactive , ref , computed } from 'vue'
import { useStore } from 'vuex'
import { useMessage, useNotification } from 'naive-ui'
import Frame4Corner from './../../widgets/frame/corner4.vue'
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
      required: true ,
      default: () => {
        return reactive({
          id: 0 ,
          username: '' ,
          firstname: '' ,
          lastname: '' ,
          email: '' ,
          phone: '' ,
          person: null ,
          orgainzations: [] ,
          positions: [] ,
          avatar_url: ''
        })
      },
      // validator: (val) => {
      //   for(var field in ['id','username','firstname','lastname','email','phone','password','active'] ){
      //     if( !val.hasOwnProperty(field) ) return false
      //   }
      //   return true 
      // }
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

    const selectedOrganizations = ref([])
    const selectedPositions = ref([])

    const organizations = computed( () => 
      store.getters['organizations/getRecords'].map( o => ( { label: o.name , value : o.id } ) )
    )
    const positions = computed( () => 
      store.getters['position/getRecords'].map( o => ( { label: o.name , value : o.id } ) )
    ) 

    const userCountesies = computed( () => {
      return props.record.officer.countesy != undefined ? props.record.officer.countesy.name : 'ok'
    })
    

    /**
     * Variables
     */    
    var rules = {
        firstname: {
          required: true,
          message: 'សូមបញ្ចូលឈ្មោះ',
          trigger: [ 'blur']
        },
        lastname: {
          required: true,
          message: 'សូមបញ្ចូលត្រកូល',
          trigger: [ 'blur']
        }
    }
    /**
     * Functions
     */
    function clearRecord( actionStatus ){
      // props.record.id = 0
      // props.record.username = ""
      // props.record.firstname = ""
      // props.record.lastname = ""
      // props.record.phone = ""
      // props.record.email = ""
      // props.record.officer.people = null ,
      // props.record.organizations = [] 
      // props.record.positions = []
      // selectedPositions.value = []
      // selectedOrganizations.value = []
      props.onClose( actionStatus )
    }

    function update(){
      if( props.record.phone == "" && props.record.email == "" ){
        notify.warning({
          title: 'ពិនិត្យព័ត៌មាន' ,
          description: 'សូមបំពេញ លេខទូរស័ព្ទ ឬ អ៊ីមែល' ,
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
      
      store.dispatch( props.model.name+'/update',{
        id: props.record.id ,
        username: props.record.username ,
        firstname: props.record.firstname ,
        lastname: props.record.lastname ,
        phone: props.record.phone ,
        email: props.record.email.toLowerCase() ,
        organizations: selectedOrganizations.value ,
        positions: selectedPositions.value ,
      }).then( res => {
        if( res.data.ok ){
          notify.success({
            title: 'រក្សារទុកព័ត៌មាន' ,
            description: res.data.message ,
            duration: 2000
          })
          clearRecord( 1 )
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
      clearRecord( 0 )
    }
  
    function maskOrEscClick(){
      props.onClose( 0 )
    }

    function initial(){
      // selectedOrganizations.value = [463]
      selectedOrganizations.value = Array.isArray( props.record.officer.people.organizations ) ? props.record.officer.people.organizations.map( o => o.id ) : []
      selectedPositions.value = Array.isArray( props.record.officer.people.positions ) ? props.record.officer.people.positions.map( o => o.id ) : []
    }

    return {
      /**
       * Variables
       */
      rules ,
      selectedOrganizations ,
      organizations ,
      selectedPositions ,
      positions , 
      userCountesies ,
      /**
       * Functions
       */
      update  ,
      initial ,
      clearRecord ,
      maskOrEscClick ,
      ocmLogoUrl ,
      dateFormat
    }
  }
}
</script>