<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr ">
      <n-modal 
      v-bind:show="show" :on-esc="maskOrEscClick" :on-mask-click="maskOrEscClick"  :on-after-enter="initial" transform-origin="center" 
      class=" bg-white" >
        <!-- Form edit account -->
        <div class="card relative border border-gray-300 rounded mx-auto overflow-hidden" >
          <!-- <div class="absolute left-0 top-0 right-0 bottom-0 bg-center bg-cover bg-no-repeat " :style=" 'background-image: url(' + blurBackgroundZ + '); background-position: 100% auto; transform: scaleX(-1); '"  ></div> -->
          <!-- Start design artwork -->
          <!-- <div class="absolute -left-20 top-0 -right-20 h-60 bg-opacity-100 bg-blue-700 rounded-br-full rounded-bl-full" ></div> -->
          <!-- <div class="absolute -left-20 bottom-0 -right-20 h-4/6 bg-opacity-90 bg-blue-700 rounded-tr-full rounded-tl-full " ></div> -->
          <!-- <div class="absolute -left-20 bottom-0 -right-20 h-full bg-opacity-90 bg-blue-700 " ></div> -->
          <div class="absolute left-0 bottom-0 right-0 h-full bg-opacity-80 bg-white " ></div>
          <!-- End design artwork -->
          <div v-if="record != undefined " class="flex relative official-card" >
            <div class="flex flex-wrap" style="height: 5.5cm; width: 8.5cm; padding: 6px; " > 
              <table class="w-full " >
                <tr >
                  <td style="width: 2.8cm; vertical-align: middle;" >
                    <img :src="(record.image!=''? record.image:ocmLogoUrl)" class="mx-auto rounded border-gray-100 mb-1 " />
                    <div class="w-full text-center font-bold" >
                      {{ $toKhmer( officerCode ) }} 
                    </div>
                  </td>
                  <td style="width: 5.7cm; padding: 0.2cm; vertical-align: top;" colspan="2" >
                    <table style="width: 6cm;">
                      <tr>
                        <td class="text-left font-moul align-top" style="width: 2cm; " >គោត្តនាម / នាម</td>
                        <td class="flex flex-wrap " style="font-size: 0.6rem; " >
                          <div class="w-full font-moul " >
                            <!-- {{ record.countesy != undefined &&record.countesy != "" ? record.countesy.name : '' }} -->
                            {{ record.people.lastname + " " + record.people.firstname }}<br/>
                          </div>
                          <div class="w-full font-bold leading-4" style="font-size: 0.5rem;">
                            {{ 
                              ( record.people.enlastname != undefined && record.people.enlastname != null ? record.people.enlastname : '' ) + 
                              ( record.people.enfirstname != undefined && record.people.enfirstname != null ? ' ' + record.people.enfirstname : '' )
                            }}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-left font-moul align-top" style="width: 2cm; "  >ថ្ងៃខែឆ្នាំកំណើត</td>
                        <td class="leading-4 font-moul "  >{{ $toKhmer( dateFormat( new Date( record.people.dob ) , 'dd-mm-yyyy' ) ) }}</td>
                      </tr>
                      <tr>
                        <td class="text-left font-moul align-top" style="width: 2cm; "  >អសយដ្ឋាន</td>
                        <td class="leading-4 ">{{ record.people.address }}</td>
                      </tr>
                      <tr>
                        <td class="text-left font-moul align-top" style="width: 2cm; "  >អង្គភាព</td>
                        <td class="leading-4">{{ record.organization.name }}</td>
                      </tr>
                      <tr>
                        <td class="text-left font-moul align-top" style="width: 2cm; "  >មុខងារ</td>
                        <td class="leading-4">{{ record.position.name }}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="width: 3cm; text-align: center; vertical-align: top; " >ថ្ងៃផុតសុពលភាព<br/>៣១ ធ្នូ ២០២៨</td>
                  <td style="width: 2cm; ">
                    <a :href="'https://hr.ocm.gov.kh/#/officer/card/'+record.public_key" target="_blank" >
                    <!-- <a :href="'http://127.0.0.1:3006/#/officer/card/'+record.public_key" target="_blank" > -->
                      <qrcode-vue :value=" 'https://hr.ocm.gov.kh/#/officer/card/'+record.public_key " :size="50" level="H" class="mx-auto border border-gray-400 rounded " :render-as="'svg'" style="padding: 2px; " />
                    </a>
                  </td>
                  <td class="relative" style="width: 3.5cm; text-align: center; vertical-align: top; " >
                    <div class="absolute top-1 right-3 bg-cover bg-no-repeat bg-center" style="width: 1.4cm; height: 1.4cm; " :style=" ' background-image:url('+royalstamp+'); ' " ></div>
                    <div class="" >រាជធានីភ្នំពេញ ថ្ងៃទី{{ "០១" }} ខែ{{ "មករា" }} ឆ្នាំ{{ "២០២៣" }}<br/>ទីស្ដីការគណៈរដ្ឋមន្ត្រី</div>
                  </td>
                </tr>
              </table>
            </div> 

            <!-- <div class="mx-auto p-4 w-full flex flex-wrap" >
              <div class="w-full mb-2" >
                <div class="w-12 h-12 mx-auto bg-center bg-no-repeat bg-contain border-gray-200 " :style="'background-image: url('+ocmLogoUrl+')'" ></div>
                <div class="w-full font-moul text-xs text-center text-yellow-500 my-2 " >ទីស្ដីការគណៈរដ្ឋមន្ត្រី</div>
                <div class="w-full text-xs text-center text-yellow-500 " >Office of the Council of Ministers</div>
              </div>
              
              <div class="w-full" >
                <img :src="(record.image!=''? record.image:ocmLogoUrl)" class="w-24 mx-auto rounded-md border border-gray-100 p-1 bg-white" />
              </div>
              
              <div 
                v-if="record.organizations != null && record.organizations != undefined && record.organizations.length > 0 "
                class="w-full"
                >
                <div class="w-full" v-for="(organizationPivot, index) in record.organizations" >
                  <div class="w-full h-6 text-center mx-auto my-2 font-bold " >{{ organizationPivot.organization.code != "" && organizationPivot.organization.code != undefined && organizationPivot.organization.code.length > 0 ? organizationPivot.organization.code : 'OCM' }}{{ organizationPivot.code != "" && organizationPivot.code != undefined && organizationPivot.code.length > 0 ? "-" + organizationPivot.code : '-' + record.id }}</div>
                </div>
              </div>
              <div class="font-moul text-left mx-auto" >
                <table class="" >
                  <tr v-if="userCountesies!=''" >
                    <td class="w-24 p-1  font-moul leading-6" style="vertical-align: top; text-align: left;" >ងារ</td>
                    <td class="font-moul p-1 text-md leading-6" style="vertical-align: top; text-align: left;"  >{{ userCountesies }}</td>
                  </tr>
                  <tr>
                    <td class="w-24 p-1 font-moul leading-6" style="vertical-align: top; text-align: left;" >ឈ្មោះ</td>
                    <td class="font-moul p-1 text-xl leading-6" style="vertical-align: top; text-align: left;"  >{{ record.lastname + " " + record.firstname }}</td>
                  </tr>
                  <tr v-if="record != null && record.organizations != null " >
                    <td class="w-24 p-1 font-moul leading-6" style="vertical-align: top; text-align: left;"  >អង្គភាព</td>
                    <td class="font-moul p-1 leading-6" style="vertical-align: top; text-align: left;"  >{{ record.organizations.map( (o) => o.name ).join( ', ' )}}</td>
                  </tr>
                  <tr v-if="record != null && record.positions != null ">
                    <td class="w-24 p-1 font-moul leading-6" style="vertical-align: top; text-align: left;"  >តួនាទី</td>
                    <td class="font-moul p-1 leading-6" style="vertical-align: top; text-align: left;"  >{{ record.positions.map( (o) => o.name ).join( ', ' )}}</td>
                  </tr>
                </table>
              </div>
              
              <div class="w-full my-2" >
                <a :href="getPublicCardUrl(record)" target="_blank_" >
                  <qrcode-vue :value="getPublicCardUrl(record)" :size="100" level="H" class=" mx-auto" :render-as="'svg'" />
                </a>
              </div>

            </div> -->

          </div>
          <!-- <Frame4Corner /> -->
        </div>
      </n-modal>
    </div>
    <!-- End of edit account -->
</template>
<script>
import { reactive , ref , computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useMessage, useNotification } from 'naive-ui'
import Frame4Corner from './../../widgets/frame/corner4.vue'
import QrcodeVue from 'qrcode.vue'
import ocmLogoUrl from './../../../assets/logo.jpg'
import blurBackground from './../../../assets/bg_stp.png'
import blurBackgroundZ from './../../../assets/bg_stp_z.png'
import royalstamp from './../../../assets/st.png'
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
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
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
      return props.record != undefined && Array.isArray( props.record.countesies ) ? props.record.countesies.map( ( c ) => c.name ).join(', ') : ''
    })
    
    const officerCode = computed( () => {
      return ( props.record.organization != undefined && props.record.organization.prefix != undefined && props.record.organization.prefix.length > 0 ? props.record.organization.prefix : 'OCM' ) + '-' + props.record.id
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
      props.onClose( actionStatus )
    }
  
    function maskOrEscClick(){
      props.onClose( 0 )
    }
    
    function getPublicCardUrl(record){
      return window.location.origin+'/#/officer/card/'+record.id
    }

    function initial(){
      // selectedOrganizations.value = [463]
    }

    return {
      /**
       * Variables
       */
      rules ,
      organizations ,
      positions , 
      userCountesies ,
      getPublicCardUrl ,
      /**
       * Functions
       */
      initial ,
      clearRecord ,
      maskOrEscClick ,
      ocmLogoUrl ,
      blurBackground ,
      blurBackgroundZ  ,
      officerCode ,
      dateFormat ,
      royalstamp
    }
  }
}
</script>
<style scoped >
  .official-card * {
    font-size: 0.5rem;
  }
</style>