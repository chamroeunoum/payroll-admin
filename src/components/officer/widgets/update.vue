<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-bind:show="show" :on-esc="maskOrEscClick" :on-mask-click="maskOrEscClick" :on-after-enter="initial" transform-origin="center">
        <n-card class="w-10/12 sm:w-3/4 md:w-8/12 lg:w-3/5 xl:w-7/12" :title="'កែប្រែ ' + model.title" :bordered="false" size="small">
          <template #header-extra>
            <n-button type="success" @click="update" >
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M3 5a2 2 0 0 1 2-2h8.379a2 2 0 0 1 1.414.586l1.621 1.621A2 2 0 0 1 17 6.621V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1v-4.5A1.5 1.5 0 0 1 6.5 10h7a1.5 1.5 0 0 1 1.5 1.5V16a1 1 0 0 0 1-1V6.621a1 1 0 0 0-.293-.707l-1.621-1.621A1 1 0 0 0 13.379 4H13v2.5A1.5 1.5 0 0 1 11.5 8h-4A1.5 1.5 0 0 1 6 6.5V4H5zm2 0v2.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4H7zm7 12v-4.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V16h8z" fill="currentColor"></path></g></svg>
              </template>
              រក្សារទុក
            </n-button>
          </template>
          <!-- Form edit account -->
          <div class="crud-create-form w-full border-t">
            <!-- Tab -->
            <n-tabs type="segment" animated>
              <n-tab-pane name="account-detail" tab="ព័ត៌មានផ្ទាល់ខ្លួន">
                <div class="py-4" >
                  <div class=" mx-auto p-4 flex-wrap">
                    <div class="crud-form-panel w-full flex flex-wrap ">
                      <n-form v-if="record!=null" 
                        class="w-full text-left font-btb text-lg flex flex-wrap" 
                        :label-width="80"
                        :model="record"
                        :rules="rules"
                        size="large"
                        ref="formRef"
                      >
                        <n-form-item label="ត្រកូល" path="lastname" class="w-6/12 p-1" >
                          <n-input v-model:value="record.people.lastname" placeholder="នាមត្រកូល" />
                        </n-form-item>
                        <n-form-item label="ឈ្មោះ" path="firstname" class="w-6/12 p-1" >
                          <n-input v-model:value="record.people.firstname" placeholder="នាមខ្លួន" />
                        </n-form-item>
                        <n-form-item label="ត្រកូល (អង់គ្លេស)" path="enlastname" class="w-6/12 p-1" >
                          <n-input v-model:value="record.people.enlastname" placeholder="នាមត្រកូល" />
                        </n-form-item>
                        <n-form-item label="ឈ្មោះ (អង់គ្លេស)" path="enfirstname" class="w-6/12 p-1" >
                          <n-input v-model:value="record.people.enfirstname" placeholder="នាមខ្លួន" />
                        </n-form-item>
                        <n-form-item label="ថ្ងៃ ខែ ឆ្នាំ កំណើត" path="dob" class="w-4/12 p-1" >
                          <n-date-picker v-model:value="dob" type="date" format="dd-MM-yyyy"  placeholder="ថ្ងៃ ខែ ឆ្នាំ កំណើត" class="w-full" />
                        </n-form-item>
                        <n-form-item label="" path="gender" class="w-3/12 p-1 " >
                          <n-radio-group v-model:value="record.people.gender" class="mx-auto" >
                            <n-space>
                              <n-radio
                                v-for="gender in [{label:'ស្រី',value:0},{label:'ប្រុស',value:1}]"
                                :key="gender.value"
                                :value="gender.value"
                                :label="gender.label"
                              />
                            </n-space>
                          </n-radio-group>
                        </n-form-item>
                        <n-form-item label="" path="marry" class="w-5/12 p-1" >
                          <n-radio-group v-model:value="record.people.marry_status" class="mx-auto" >
                            <n-space>
                              <n-radio
                              v-for="status in [{label:'នៅលីវ',value:'single'},{label:'រៀបការរួច',value:'married'},{label:'ពោះមាយ / មេមាយ',value:'divorced'}]"
                              :key="status.value"
                              :value="status.value"
                              :label="status.label"
                              />
                            </n-space>
                          </n-radio-group>

                        </n-form-item>
                        
                        <n-form-item label="លេខអត្តសញ្ញាណបណ្ណ" path="nid" class="w-1/2 p-1" >
                          <n-input v-model:value="record.people.nid" placeholder="លេខអត្តសញ្ញាណបណ្ណ" />
                        </n-form-item>
                        <n-form-item label="អ៊ីមែល" path="email" class="w-1/2 p-1" >
                          <n-input v-model:value="record.people.email" placeholder="អ៊ីមែល" />
                        </n-form-item>
                        <n-form-item label="ទូរស័ព្ទផ្ទាល់ខ្លួន" path="mobile_phone" class="w-1/2 p-1" >
                          <n-input v-model:value="record.people.mobile_phone" placeholder="ទូរស័ព្ទផ្ទាល់ខ្លួន" />
                        </n-form-item>
                        <n-form-item label="ទូរស័ព្ទការិយាល័យ" path="phone" class="w-1/2 p-1" >
                          <n-input v-model:value="record.people.office_phone" placeholder="ទូរស័ព្ទការិយាល័យ" />
                        </n-form-item>
                        <n-form-item-row label="អសយដ្ឋានបច្ចុប្បន្ន" >
                          <n-input 
                            placeholder="អសយដ្ឋានបច្ចុប្បន្ន" 
                            class="text-left" 
                            v-model:value="record.people.address" 
                            type="textarea" show-count maxlength="5000" />
                        </n-form-item-row>
                        <n-form-item-row label="ទីកន្លែងកំណើត" >
                          <n-input placeholder="ទីកន្លែងកំណើត" class="text-left" 
                          v-model:value="record.people.pob" 
                          type="textarea" show-count maxlength="5000" />
                        </n-form-item-row>
                        
                      </n-form>
                      <div class="w-1/2 h-8"></div>  
                    </div>
                  </div>
                </div>
              </n-tab-pane>
              <n-tab-pane name="organization-detail" tab="ព័ត៌មានក្នុងក្រុមហ៊ុន">
                <div class=" mx-auto p-4 flex-wrap">
                  <div class="crud-form-panel w-full flex flex-wrap ">
                    <n-form v-if="record!=null" 
                      class="w-full text-left font-btb text-lg flex flex-wrap" 
                      :label-width="80"
                      :model="record"
                      :rules="rules"
                      size="large"
                      ref="formRef"
                    >
                      <n-form-item label="អត្តលេខ" path="code" class="w-6/12 p-1" >
                        <n-input v-model:value="record.code" disabled placeholder="អត្តលេខ" />
                      </n-form-item>
                      <n-form-item label="ថ្ងៃខែឆ្នាំចូលធ្វើការ" path="officer_dob" class="w-6/12 p-1" >
                        <n-date-picker v-model:value="officer_dob" type="date" format="dd-MM-yyyy" placeholder="ថ្ងៃ ខែ ឆ្នាំ កំណើត" class="w-full" />
                      </n-form-item>
                      <n-form-item label="ប្រាក់ខែ" path="code" class="w-6/12 p-1" >
                        <n-input type="number"
                          v-model:value="record.salary_rank" placeholder="ប្រាក់ខែ" 
                          :min="0"
                          class="w-full"
                          >
                          <template #prefix>$</template>
                        </n-input>
                      </n-form-item>
                      <n-form-item label="ទូរស័ព្ទ" path="phone" class="w-1/2 p-1" >
                        <n-input v-model:value="record.phone" placeholder="ទូរស័ព្ទ" />
                      </n-form-item>
                      <n-form-item label="លេខិតឆ្លងដែន" path="passport" class="w-1/2 p-1" >
                        <n-input v-model:value="record.passport" placeholder="លេខិតឆ្លងដែន" />
                      </n-form-item>
                      <n-form-item label="អ៊ីមែល" path="email" class="w-1/2 p-1" >
                        <n-input v-model:value="record.email" placeholder="អ៊ីមែល" />
                      </n-form-item>
                      <!-- <n-form-item label="ងារ" path="countesy" class="w-full mb-4" >
                        <n-select
                          v-model:value="selectedCountesies"
                          filterable
                          placeholder="សូមជ្រើសរើសងារ"
                          :options="countesies"
                          multiple
                        />
                      </n-form-item> -->
                      <n-form-item label="Category" path="category" class="w-1/2 p-1 mb-4" >
                        <n-select
                          v-model:value="selectedCategory"
                          filterable
                          placeholder="សូមជ្រើសរើស"
                          :options="categories"
                        />
                      </n-form-item>
                      <n-form-item label="Department" path="department" class="w-1/2 p-1 mb-4" >
                        <n-select
                          v-model:value="selectedDepartment"
                          filterable
                          placeholder="សូមជ្រើសរើស"
                          :options="departments"
                        />
                      </n-form-item>
                      <n-form-item label="Section" path="section" class="w-1/2 p-1 mb-4" >
                        <n-select
                          v-model:value="selectedSection"
                          filterable
                          placeholder="សូមជ្រើសរើស"
                          :options="sections"
                        />
                      </n-form-item>
                      <n-form-item label="តួនាទី" path="position" class="w-1/2 p-1 mb-4" >
                        <n-select
                          v-model:value="selectedPosition"
                          filterable
                          placeholder="សូមជ្រើសរើសតួនាទី"
                          :options="positions"
                        />
                      </n-form-item>
                      <Transition name="slide-fade" >
                        <div 
                        v-if="record.organizationPeople != null && record.organizationPeople != undefined && record.organizationPeople.length > 0 "
                        class="w-full border border-gray-200 rounded p-4"
                        >
                          <div class="w-full mb-4" >លេខសម្កាល់មន្ត្រីក្នុងស្ថាប័នស្ថិតនៅ</div>
                          <div class="w-full mb-4" v-for="(organizationPivot, index) in record.organizationPeople" :key="index">
                            <div class="w-full " >{{ getKhmer( index + 1 ) + '. ' +organizationPivot.organization.name }}{{ organizationPivot.organization.code != "" && organizationPivot.organization.code != undefined && organizationPivot.organization.code.length > 0 ? ' - ' + organizationPivot.organization.code : '' }}</div>
                            <div class="w-1/2 p-4" >
                              <n-input v-model:value="organizationPivot.code" placeholder="លេខកូដ" @blur="updatePeopleCodeWithinOrganization(organizationPivot)" />
                            </div>
                          </div>
                        </div>
                      </Transition>
                    </n-form>
                  </div>
                </div>
              </n-tab-pane>
              <n-tab-pane name="emergency-contact" tab="ទំនាក់ទំនងក្នុងករណីមានអាសន្ន">
                <div class=" mx-auto p-4 flex-wrap">
                  <div class="crud-form-panel w-full flex flex-wrap ">
                    <n-form v-if="record!=null" 
                      class="w-full text-left font-btb text-lg flex flex-wrap" 
                      :label-width="80"
                      :model="record"
                      :rules="rules"
                      size="large"
                      ref="formRef"
                    >
                      <n-form-item label="គោត្តនាម" class="w-1/2 p-1" >
                        <n-input v-model:value="record.people.emergency_lastname" placeholder="គោត្តនាម" />
                      </n-form-item>
                      <n-form-item label="នាម" class="w-1/2 p-1" >
                        <n-input v-model:value="record.people.emergency_firstname" placeholder="នាម" />
                      </n-form-item>
                      <n-form-item label="ភេទ" class="w-1/2 p-1" >
                        <n-radio-group v-model:value="record.people.emergency_gender" class="w-full" >
                          <n-space>
                            <n-radio
                            v-for="status in [{label:'ប្រុស',value:1},{label:'ស្រី',value:0},{label:'ផ្សេងៗ',value:2}]"
                            :key="status.value"
                            :value="status.value"
                            :label="status.label"
                            />
                          </n-space>
                        </n-radio-group>
                      </n-form-item>
                      <n-form-item label="ទំនាក់ទំនងត្រូវជា" class="w-1/2 p-1" >
                        <n-input v-model:value="record.people.emergency_relationship" placeholder="ទំនាក់ទំនងត្រូវជា" />
                      </n-form-item>
                      <n-form-item label="មុខរបរ" class="w-1/2 p-1" >
                        <n-input v-model:value="record.people.emergency_profession" placeholder="មុខរបរ" />
                      </n-form-item>
                      <n-form-item label="ទូរសព្ទ" class="w-1/2 p-1" >
                        <n-input v-model:value="record.people.emergency_phone" placeholder="ទូរសព្ទ" />
                      </n-form-item>
                      <n-form-item label="អ៉ីមែល" class="w-full p-1" >
                        <n-input v-model:value="record.people.emergency_email" placeholder="អ៉ីមែល" />
                      </n-form-item>
                      <n-form-item label="អាសយដ្ឋាន" class="w-full p-1" >
                        <n-input v-model:value="record.people.emergency_address" placeholder="អាសយដ្ឋាន" />
                      </n-form-item>
                    </n-form>
                  </div>
                </div>
              </n-tab-pane>
              <n-tab-pane name="user-attendance-setting" tab="កំណត់គោលនយោបាយវត្តមាន">
                <div class="py-4" >
                  <div class=" mx-auto p-4 flex-wrap">
                    <div class="crud-form-panel w-full flex flex-wrap ">
                      <n-form v-if="record!=null" 
                        class="w-full text-left font-btb text-lg flex flex-wrap" 
                        :label-width="80"
                        :model="record"
                        :rules="rules"
                        size="large"
                        ref="formRef"
                      >
                        <n-form-item
                          class="w-full"
                          label="ការបញ្ជាក់ការលាឈប់ពីការងារ"
                        >
                          <n-radio-group v-model:value="record.is_working" >
                            <n-space>
                              <n-radio :value="1" >នៅធ្វើការ</n-radio>
                              <n-radio :value="0" >បានលាឈប់</n-radio>
                            </n-space>
                          </n-radio-group>
                        </n-form-item>
                        <n-form-item
                          class="w-full"
                          label="ការថែមម៉ោង"
                        >
                          <n-radio-group v-model:value="record.allowed_ot" :disabled=" record.is_working != 1 " >
                            <n-space>
                              <n-radio :value="1" >អនុញ្ញាត</n-radio>
                              <n-radio :value="0" >មិនអនុញ្ញាត</n-radio>
                            </n-space>
                          </n-radio-group>
                        </n-form-item>
                        <n-form-item
                          class="w-1/2"
                          label="ការរាប់វត្តមាន"
                        >
                          <n-radio-group v-model:value="record.attn_mode_ignore" :disabled=" record.is_working != 1 " >
                            <n-space>
                              <n-radio :value="0" >មិនររាប់វត្តមានបុគ្គលិក</n-radio>
                              <n-radio :value="1" >រាប់វត្តមានបុគ្គលិក</n-radio>
                            </n-space>
                          </n-radio-group>
                        </n-form-item>
                        <n-form-item
                          class="w-full"
                          label="ការបិទនិងបើកគោលនយោបាយវត្តមានសម្រាប់បុគ្គលិក"
                        >
                          <n-radio-group v-model:value="record.attn_active" :disabled=" record.is_working != 1 " >
                            <n-space>
                              <n-radio :value="0" >ប្រើប្រាស់គោលនយោបាយរួមរបស់ប្រព័ន្ធ</n-radio>
                              <n-radio :value="1" >ប្រើប្រាស់គោលនយោបាយផ្ទាល់ខ្លួន</n-radio>
                            </n-space>
                          </n-radio-group>
                        </n-form-item>
                        <n-form-item label="ចំនួននាទីដែលមិនរាប់បញ្ចូលជាការមកយឺត ឬ ចេញមុន" class="w-1/2 p-1" >
                          <n-input-number :min="0" :step="0.1" v-model:value="record.attn_undertime_ignore_minute" placeholder="ចំនួននាទីដែលមិនរាប់បញ្ចូលជាការមកយឺត ឬ ចេញមុន" 
                          :disabled=" record.is_working != 1 || record.attn_active != 1 " 
                          />
                        </n-form-item>
                        <n-form-item label="គោលការណ៍បន្ថែមប្រាក់ឧបត្ថមធ្វើការទៀងទាត់" class="w-1/2 p-1" >
                          <n-input-number :min="0" :step="0.1" v-model:value="record.attn_bonus" placeholder="គោលការណ៍បន្ថែមប្រាក់ឧបត្ថមធ្វើការទៀងទាត់" 
                          :disabled=" record.is_working != 1 || record.attn_active != 1 " 
                          />
                        </n-form-item>
                        <n-form-item label="ការរាប់ការធ្វើការងារថែមម៉ោង" class="w-1/2 p-1" >
                          <n-input-number :min="0" :step="0.1" v-model:value="record.attn_min_minute_overtime" placeholder="បន្ទាប់ធ្វើការបានចាប់ពី ៣០ នាទី" 
                          :disabled=" record.is_working != 1 || record.attn_active != 1 " 
                          />
                        </n-form-item>
                        <n-form-item label="ភាគរយគិតសម្រាប់ការធ្វើការថ្ងៃធម្មតា" class="w-1/2 p-1" >
                          <n-input-number :min="0" :step=".1" v-model:value="record.attn_ot_percentage" placeholder="ភាគរយគិតសម្រាប់ការធ្វើការថ្ងៃបុណ្យ" 
                          :disabled=" record.is_working != 1 || record.attn_active != 1 " 
                          />
                        </n-form-item>
                        <n-form-item label="ភាគរយគិតសម្រាប់ការធ្វើការថ្ងៃចុងសប្ដាហ៍ (សំដៅថ្ងៃសម្រាប់ចុងសប្ដាហ៍អាចជាថ្ងៃ សៅរ៍ ឬ អាទិត្យ)" class="w-1/2 p-1" >
                          <n-input-number :min="0" :step=".1" v-model:value="record.attn_ot_weekend_percentage" placeholder="ភាគរយគិតសម្រាប់ការធ្វើការថ្ងៃចុងសប្ដាហ៍" 
                          :disabled=" record.is_working != 1 || record.attn_active != 1 " 
                          />
                        </n-form-item>
                        <n-form-item label="ភាគរយគិតសម្រាប់ការធ្វើការថ្ងៃបុណ្យ" class="w-1/2 p-1" >
                          <n-input-number :min="0" :step=".1" v-model:value="record.attn_ot_holiday_percentage" placeholder="ភាគរយគិតសម្រាប់ការធ្វើការថ្ងៃបុណ្យ" 
                          :disabled=" record.is_working != 1 || record.attn_active != 1 " 
                          />
                        </n-form-item>
                        <n-form-item label="ចំនួនថ្ងៃធ្វើការក្នុងរយះពេល១ខែ" class="w-1/2 p-1" >
                          <n-input-number :min="0" :step=".1" v-model:value="record.total_days_per_month" placeholder="ចំនួនថ្ងៃធ្វើការក្នុងរយះពេល១ខែ" 
                          :disabled=" record.is_working != 1 || record.attn_active != 1 " 
                          />
                        </n-form-item>
                      </n-form>
                    </div>
                  </div>
                </div>
              </n-tab-pane>
            </n-tabs>
          </div>
          <!-- End form edit account -->
          <template #footer></template>
        </n-card>
      </n-modal>
    </div>
    <!-- End of edit account -->
</template>
<script>
import { reactive , ref , computed } from 'vue'
import { useStore } from 'vuex'
import { useMessage, useNotification } from 'naive-ui'
import dateFormat from "dateformat";
import { getKhmer } from '../../../plugins/kh/number.js'

export default {
  components: {
    
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
          firstname: '' ,
          lastname: '' ,
          email: '' ,
          gender: '' ,
          mobile_phone: '' ,
          office_phone: '' ,
          dob: null ,
          nid: '' ,
          salary_rank: 0 ,
          marry_status: null ,
          user: null ,
          orgainzations: [] ,
          positions: []
        })
      },
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

    console.log( props.record )

    var store = useStore()
    const message = useMessage()
    const notify = useNotification()

    const selectedOrganization = ref(null)
    const selectedCategory = ref(null)
    const selectedDepartment = ref(null)
    const selectedSection = ref(null)
    const selectedPosition = ref(null)
    const selectedCountesies = ref([])

    const organizations = computed( () => 
      store.getters['organizations/getRecords'].map( o => ( { label: o.name , value : o.id } ) )
    )
    const categories = computed( () => 
      store.getters['organizations/getRecords'].filter( o => o.tag == 'category' ).map( o => ( { label: o.name , value : o.id } ) )
    )
    const departments = computed( () => 
      store.getters['organizations/getRecords'].filter( o => o.tag == 'department' ).map( o => ( { label: o.name , value : o.id } ) )
    )
    const sections = computed( () => 
      store.getters['organizations/getRecords'].filter( o => o.tag == 'section' ).map( o => ( { label: o.name , value : o.id } ) )
    )
    const positions = computed( () => 
      store.getters['position/getRecords'].map( o => ( { label: o.name , value : o.id } ) )
    ) 
    const countesies = computed( () => 
      store.getters['countesy/getRecords'].map( c => ( { label: c.name , value : c.id } ) )
    ) 
    
    const dob = ref( null )
    dob.value = props.record.people.dob != '' && props.record.people.dob != undefined
      ? (new Date( props.record.people.dob )).getTime()
      : (new Date()).getTime()

    const officer_dob = ref( null )
    officer_dob.value = props.record.official_date != '' && props.record.official_date != undefined
      ? (new Date( props.record.official_date )).getTime()
      : (new Date()).getTime()

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

    function update(){
      if( props.model === undefined || props.model.name == "" ){
        notify.warning({
          title: 'ពិនិត្យព័ត៌មាន' ,
          description: 'ទម្រង់នៃព័ត៌មានមិនទាន់បានកំណត់។' ,
          duration: 2000
        })
        return false
      }
      
      props.record.dob = dob.value != null && parseInt( dob.value ) > 0 ? dateFormat( new Date(dob.value) , "yyyy-mm-dd" ) : dateFormat( new Date() , "yyyy-mm-dd" ) ,

      store.dispatch( props.model.name+'/update',
        {
          'id' : props.record.id ,
          'code' : props.record.code ,
          'organization_id' : selectedOrganization.value != null ? selectedOrganization.value : 0 ,
          'position_id' : selectedPosition.value != null ? selectedPosition.value : 0 ,
          'countesy_id' : selectedCountesies.value != null ? selectedCountesies.value[0] : 0 ,
          'passport' : props.record.passport ,
          'email' : props.record.email ,
          'phone' : props.record.phone ,
          'caregory_id' : props.record.category_id ,
          'department_id' : props.record.category_id ,
          'section_id' : props.record.category_id ,
          'salary_rank' : parseFloat( props.record.salary_rank ) <= 0 ? 0 : parseFloat( props.record.salary_rank ) ,
          'officer_dob' : officer_dob.value != null && parseInt( officer_dob.value ) > 0 ? dateFormat( new Date(officer_dob.value) , "yyyy-mm-dd" ) : dateFormat( new Date() , "yyyy-mm-dd" ) ,
          'people' : {
            'firstname' : props.record.people.firstname ,
            'lastname' : props.record.people.lastname ,
            'enfirstname' : props.record.people.enfirstname ,
            'enlastname' : props.record.people.enlastname ,
            'gender' : props.record.people.gender ,
            'email' : props.record.people.email ,
            'mobile_phone' : props.record.people.mobile_phone ,
            'office_phone' : props.record.people.office_phone ,
            'dob' : props.record.people.dob ,
            'nid' : props.record.people.nid ,
            'passport' : props.record.people.passport ,
            'marry_status' : props.record.people.marry_status ,
            'address' : props.record.people.address ,
            'pob' : props.record.people.pob ,
            // Emergency 
            'emergency_lastname' : props.record.people.emergency_lastname ,
            'emergency_firstname' : props.record.people.emergency_firstname ,
            'emergency_gender' : props.record.people.emergency_gender ,
            'emergency_relationship' : props.record.people.emergency_relationship ,
            'emergency_profession' : props.record.people.emergency_profession ,
            'emergency_address' : props.record.people.emergency_address ,
            'emergency_phone' : props.record.people.emergency_phone ,
            'emergency_email' : props.record.people.emergency_email
          } ,
          // Attendance Settings
          'attn_active' : props.record.attn_active ,
          'attn_mode_ignore' : props.record.attn_mode_ignore ,
          'allowed_ot' : props.record.allowed_ot ,
          'total_days_per_month' : props.record.total_days_per_month ,
          'attn_ot_percentage' : props.record.attn_ot_percentage ,
          'attn_ot_weekend_percentage' : props.record.attn_ot_weekend_percentage ,
          'attn_ot_holiday_percentage' : props.record.attn_ot_holiday_percentage ,
          'attn_min_minute_overtime' : props.record.attn_min_minute_overtime ,
          'attn_undertime_ignore_minute' : props.record.attn_undertime_ignore_minute ,
          'attn_bonus' : props.record.attn_bonus ,
          'is_working' : props.record.is_working
        }
      // {
      //   id: props.record.id ,
      //   firstname: props.record.firstname ,
      //   lastname: props.record.lastname ,
      //   gender: props.record.gender ,
      //   email: props.record.email.toLowerCase() ,
      //   mobile_phone: props.record.mobile_phone ,
      //   office_phone: props.record.office_phone ,
      //   dob: props.record.dob ,
      //   nid: props.record.nid ,
      //   marry_status: props.record.marry_status ,
      //   organizations: selectedOrganization.value ,
      //   positions: selectedPosition.value ,
      //   countesies: selectedCountesies.value
      // }
    ).then( res => {
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

    function updatePeopleCodeWithinOrganization(organizationPivot){
      if( organizationPivot.code != "" && organizationPivot.code.length > 0 ){
        if( props.model === undefined || props.model.name == "" ){
          notify.warning({
            title: 'ពិនិត្យព័ត៌មាន' ,
            description: 'ទម្រង់នៃព័ត៌មានមិនទាន់បានកំណត់។' ,
            duration: 2000
          })
          return false
        }
        store.dispatch( props.model.name+'/updateOrganizationCode',{
          people_id: organizationPivot.people_id ,
          organization_id : organizationPivot.organization_id ,
          code : organizationPivot.code
        }).then( res => {
          if( res.data.ok ){
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
      }
    }
  
    function initial(){
      selectedOrganization.value = props.record.organization != null && props.record.organization != undefined ? props.record.organization.id : null
      selectedPosition.value = props.record.position != null && props.record.position != undefined ? props.record.position.id : null
      selectedCategory.value = props.record.category_id != null && props.record.category_id != undefined ? props.record.category_id : null
      selectedDepartment.value = props.record.department_id != null && props.record.department_id != undefined ? props.record.department_id : null
      selectedSection.value = props.record.section_id != null && props.record.section_id != undefined ? props.record.section_id : null
      selectedCountesies.value = props.record.countesy != null && props.record.countesy != undefined ? [props.record.countesy.id] : null
    }

    return {
      /**
       * Variables
       */
      rules ,
      selectedOrganization ,
      organizations ,
      categories ,
      departments ,
      sections ,
      selectedPosition ,
      selectedCategory ,
      selectedDepartment ,
      selectedSection ,
      positions ,
      selectedCountesies ,
      countesies ,
      dob ,
      officer_dob ,
      /**
       * Functions
       */
      update  ,
      initial ,
      clearRecord ,
      maskOrEscClick ,
      updatePeopleCodeWithinOrganization ,
      getKhmer
    }
  }
}
</script>
<style type="text/css" scoped >
</style>