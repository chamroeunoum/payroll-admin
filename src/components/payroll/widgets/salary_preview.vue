<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-bind:show="show" :on-esc="maskOrEscClick" :on-mask-click="maskOrEscClick"  :on-after-enter="initial" transform-origin="center">
        <!-- <n-card class="w-11/12 xl:w-7/12 lg:w-7/12 md:w-8/12 sm:w-11/12 font-pvh text-xl p-0 " :bordered="false" size="small"> -->
          <n-card class="w-[540px] p-0 " style="" :bordered="false" size="small">
          <!-- Form edit account -->
          <div class="card relative border border-gray-300 rounded p-8 -my-3 -mx-4">
            <div class="w-full mb-2 font-moul flex items-center place-content-center " >
              <!-- <div class="w-10 h-10 mr-2 bg-contain bg-no-repeat bg-center p-2" style=" background-image: url('/src/assets/logo.jpg'); " ></div> -->
              <img src="/src/assets/logo.jpg" class="w-10 h-10" />
              <div class="font-moul ml-2 " style="font-size: 1.2rem; " >ក្រុមហ៊ុន អូ អេន អិម (ខេមបូឌា) ខូអិលធីឌី</div>
            </div>
            <div class="w-full mb-2 font-moul text-center" style="font-size: 1rem; " >ការពិនិត្យប្រាក់បៀវត្ស</div>
            <!-- <div class="w-full mb-0 text-center font-bold" >Pay Slip for the month of Oct 2025</div>
            <div class="w-full mb-3 text-center font-bold" >From 01-Jan-2025 To 31-Jan-2025</div> -->
            <table class="w-full border border-dashed border-gray-200 " >
              <tbody>
                <tr class="">
                  <td class="font-bold p-1 "  >ID</td>
                  <td class="font-bold p-1 "  >ឈ្មោះ/Name</td>
                  <td class="font-bold p-1 " colspan="2"  >ថ្ងៃចូលធ្វើការ/Date Join</td>
                </tr>
                <tr>
                  <td class="font-bold p-1 pb-2" >{{ record.code }}</td>
                  <td class=" p-1 pb-2">{{ record.people.lastname + ' ' + record.people.firstname }}</td>
                  <td class="font-bold p-1 pb-2" colspan="2" >{{ dateFormat( record.official_date , 'dd/mm/yyyy' ) }}</td>
                </tr>
                <tr>
                  <td class="font-bold p-1 pb-2" colspan="2"  >ផ្នែក/Department : {{ record.department.name }}</td>
                  <td class="font-bold p-1 pb-2" colspan="2"  >លេខ បសស/NSSF : {{ record.people.nssf_no }}</td>
                </tr>
                <tr>
                  <td class=" p-1 " colspan="4" >
                    <div class="flex w-full" >
                      ប្រាក់ឈ្នួលមូលដ្ឋានសម្រាប់ខែនេះ This month Base : <div class="font-bold w-24 text-left pl-2" >{{ record.salary_rank }} $</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class=" p-1 font-bold" colspan="4" >លេខរៀង No. {{ record.id }}</td>
                </tr>
              </tbody>
            </table>
            <!-- <div class="w-full my-4 font-btb-black text-center" >ប្រាក់ខែសម្រាប់ខែ {{ $toKhmer( dateFormat( new Date(record.date) , 'mm-yyyy' ) ) }}</div> -->
            <table class="w-full table-payment-details border-double border-4 border-gray-500 " >
              <tbody>
                <tr>
                  <th class="p-1" >ព័ត៌មានលម្អិត Details Information</th>
                  <th class="w-24 p-1" >ចំនួនម៉ោង/ថ្ងៃ<br/>Hour/Day</th>
                  <th class="w-24 p-1" >ចំនួនទឹកប្រាក់<br/>Amount</th>
                </tr>
                <tr>
                  <td>ចំនួនថ្ងៃនិងប្រាក់ដែលធ្វើការថ្ងៃធម្មតា Regular Pay</td>
                  <td >{{ previewSalary?.attendancesOfTheMonth?.total?.worked_days }}</td>
                  <td >{{ previewSalary?.attendancesOfTheMonth?.total?.pay_base_worked_time }}</td>
                </tr>
                <tr>
                  <td>ចំនួនថ្ងៃអវត្តមាន No. Of Absences</td>
                  <td colspan="2" >{{ previewSalary?.attendancesOfTheMonth?.total?.attendance_by_types?.AB }}</td>
                </tr>
                <tr>
                  <td>ចំនួន/ប្រាក់ម៉ោងបន្ថែមធម្មតា OT Pay 150%</td>
                  <td>{{ previewSalary?.attendancesOfTheMonth?.total?.overtime / 60 }}</td>
                  <td>{{ previewSalary?.attendancesOfTheMonth?.total?.ot_pay }}</td>
                </tr>
                <tr>
                  <td>ចំនួន/ប្រាក់ម៉ោងបន្ថែម Pay 200%</td>
                  <td>{{ previewSalary?.attendancesOfTheMonth?.total?.holiday_worked_time / 60 }}</td>
                  <td>{{ previewSalary?.attendancesOfTheMonth?.total?.holiday_pay }}</td>
                </tr>
                <tr>
                  <td>ថ្ងៃជួសការសម្រាក់ប្រចាំឆ្នាំ Annual Leave</td>
                  <td colspan="2">{{ previewSalary?.attendancesOfTheMonth?.total?.attendance_by_types?.AL }}</td>
                </tr>
                <tr>
                  <td>ចំនួន/ប្រាក់ថ្ងៃសុំច្បាស់ឈឺ Sick Leave</td>
                  <td colspan="2">{{ previewSalary?.attendancesOfTheMonth?.total?.attendance_by_types?.SK }}</td>
                </tr>
                <tr>
                  <td>ចំនួន/ប្រាក់ថ្ងៃច្បាស់មាតុភាព Maternity Leave</td>
                  <td>{{ previewSalary?.attendancesOfTheMonth?.total?.attendance_by_types?.AL }}</td>
                  <td>{{ record.maternity_pay }}</td>
                </tr>
                <tr>
                  <td>ចំនួន/ប្រាក់ម៉ោងបន្ថែមថ្ងៃបុណ្យ PH Pay</td>
                  <td>{{ previewSalary?.attendancesOfTheMonth?.total?.holiday_worked_time / 60 }}</td>
                  <td>{{ previewSalary?.attendancesOfTheMonth?.total?.holiday_pay }}</td>
                </tr>
                <tr>
                  <td>ចំនួន/ប្រាក់ម៉ោងបន្ថែម Sunday Pay</td>
                  <td>{{ previewSalary?.attendancesOfTheMonth?.total?.sunday_worked_time / 60 }}</td>
                  <td>{{ previewSalary?.attendancesOfTheMonth?.total?.weekend_pay }}</td>
                </tr>
                <tr>
                  <td>ប្រាក់រង្វាន់ការងារ Attendance Bonus</td>
                  <td colspan="2">{{ previewSalary?.attendancesOfTheMonth?.attendance_bonus }}</td>
                </tr>
                <tr>
                  <td>ប្រាក់ឧបត្ថមថ្លៃធ្វើដំណើរ Trip Fee</td>
                  <td colspan="2">{{ previewSalary?.attendancesOfTheMonth?.trip_fee }}</td>
                </tr>
                <tr>
                  <td>ប្រាក់ឧបត្ថមអាហារសម្រាប់ធ្វើការថែមម៉ោង Dinner for working OT</td>
                  <td colspan="2">{{ previewSalary?.attendancesOfTheMonth?.total?.dinner_pay }}</td>
                </tr>
                <tr>
                  <td>ប្រាក់រង្វាន់ Rewards</td>
                  <td colspan="2">{{ previewSalary?.rewards }}</td>
                </tr>
                <tr>
                  <td>ប្រាក់ឧបត្ថមទារកដ្ឋាន Bonus Day Care</td>
                  <td colspan="2">{{ previewSalary?.bonus_daycare }}</td>
                </tr>
                <tr>
                  <td>ប្រាក់ទូទាត់សម្រាប់ប្រាក់ប្រចាំឆ្នាំ Comp. for annual leave</td>
                  <td colspan="2">{{ previewSalary?.comp_for_annual_leave }}</td>
                </tr>
                <tr>
                  <td>ប្រាក់អតីតភាព Seniority Bonus</td>
                  <td colspan="2">{{ previewSalary?.seniority_bonus }}</td>
                </tr>
                <tr>
                  <td>ប្រាក់បំណាច់អតីតភាពការងារថ្មី New work seniority bonus</td>
                  <td colspan="2">{{ previewSalary?.newwork_seniority_bonus }}</td>
                </tr>
                <tr>
                  <td>ប្រាក់ដែលត្រូវសង Salary adjustment</td>
                  <td colspan="2">{{ previewSalary?.salary_adjustments?.key }}</td>
                </tr>
                <tr>
                  <td>ប្រាក់សរុបទាំងអស់ Gross Pay</td>
                  <td colspan="2">{{ previewSalary?.gross_salary }}</td>
                </tr>
                <tr>
                  <td>ចំនួនប្រាក់កាត់ថ្លៃថែទាំសុខភាព Health Care Service</td>
                  <td colspan="2">0</td>
                </tr>
                <tr>
                  <td>កាត់ប្រាក់ពន្ធ Tax</td>
                  <td colspan="2">{{ previewSalary?.tax_withholding }}</td>
                </tr>
                <tr>
                  <td>ចំនួនប្រាក់បានខ្ចី Cash Advance</td>
                  <td colspan="2">{{ previewSalary?.cash_advance }}</td>
                </tr>
                <tr>
                  <td>ចំនួនប្រាក់គោលសុទ្ធបើកលើកទី១ពាក់កណ្ដាលខែ<br/>Take basic salary middle of month (50%)</td>
                  <td colspan="2">{{ previewSalary?.basic_salary_middle_of_month }}</td>
                </tr>
                <tr>
                  <td>ប្រាក់កាត់ទុករបបសន្តិសុខសង្គម(សោធនិវត្ស)<br/>Amount withhold on NSSF 2%</td>
                  <td colspan="2">{{ previewSalary?.nssf }}</td>
                </tr>
                <tr>
                  <td>ចំនួនប្រាក់កាត់មានកំហុស Mistake</td>
                  <td colspan="2">{{ previewSalary?.mistake }}</td>
                </tr>
                <tr>
                  <td>ចំនួនប្រាក់កាត់ថ្លៃទឹកភ្លើង Deduce Utilities</td>
                  <td colspan="2">{{ previewSalary?.utilities }}</td>
                </tr>
                <tr>
                  <td class="flex gap-2 " ><div class="font-moul" >ប្រាក់ឈ្នួលសរុប</div><div class="" >Net Pay</div></td>
                  <td colspan="2">{{ previewSalary?.net_pay }}</td>
                </tr>
              </tbody>
              <!-- <tbody>
              <tr >
                <td class=" w-8 p-2"  >{{ $toKhmer( 1 ) }}.</td>
                <td class="p-2" >ប្រាក់ខែគោល</td>
                <td class="p-2 text-green-600 text-right " >{{ $toKhmer( parseFloat( record.salary_rank ).toFixed(2) ) }}</td>
              </tr>
              <tr >
                <td class=" w-8 p-2"  >{{ $toKhmer( index + 2 ) }}.</td>
                <td class="p-2" >{{ sd.salaryAdjustment.title  }}</td>
                <td :class=" ' p-2 text-right ' + ( sd.salary_adjustment_type == 1 ? ' text-green-600 ' : ' text-red-600 ' ) " >{{ sd.salary_adjustment_type == 1 ? '+' : '-' }}{{ parseFloat( sd.adjustment_amount ).toFixed(2)  }}</td>
              </tr>
              </tbody>
              <tfoot class="bg-gray-100" >
                <tr>
                <th colspan="2" class="p-2 text-right " >សរុប</th>
                <th class="p-1 text-right" >{{ 
                  $toKhmer( 
                    parseFloat( 
                      parseFloat( record.salary ) + 
                      ( 
                        record.PayrollAdjustmentHistories != undefined 
                          ? record.PayrollAdjustmentHistories.reduce( ( sum , adj ) => 
                            sum + ( ( adj.salary_adjustment_type != 1 ? -1 : 1 ) * adj.adjustment_amount )
                          , 0 )
                          : 0
                      ) 
                    ).toFixed(2) ) }}</th>
                </tr>
              </tfoot> -->
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
    salaryType: {
      type: Number
    },
    salaryDate: {
      type: Number
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
      return props.record.countesy != undefined ? props.record.countesy.name : 'ok'
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
      // props.record.people = null ,
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

    const previewSalary = ref(null)
    function getPreviewSalary(){
      store.dispatch('officer/previewSalary',{
        officer_id : props.record.id ,
        type: parseInt( props.salaryType ) > 0 ? (
          parseInt( props.salaryType ) > 2 ? 2 : 1
        ): 0 ,
        date: dateFormat( new Date( props.salaryDate ) , 'yyyy-mm-dd')
      }).then( res => {
        previewSalary.value = res.data.ok == true ? res.data.result : null
        console.log( res )
      }).catch( err => {
        console.log( err )
      })
    }
    function initial(){
      getPreviewSalary()
      // selectedOrganizations.value = [463]
      // selectedOrganizations.value = Array.isArray( props.record.people.organizations ) ? props.record.people.organizations.map( o => o.id ) : []
      // selectedPositions.value = Array.isArray( props.record.people.positions ) ? props.record.people.positions.map( o => o.id ) : []
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
      previewSalary ,
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
<style type="text/css" scoped >
  .table-payment-details tr td , .table-payment-details tr th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 5px; 
  }
  .table-payment-details tr td:not(:first-child) {
    text-align: center;
    font-weight: bold;
  }
</style>