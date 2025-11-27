<template>
  <!-- Form edit account -->
    <div class="vcb-pop-create font-ktr">
      <n-modal v-bind:show="show" :on-esc="maskOrEscClick" :on-mask-click="maskOrEscClick" :on-after-enter="initial" transform-origin="center">
        <n-card class="w-10/12 sm:w-3/4 md:w-8/12 lg:w-3/5 xl:w-7/12" title="បន្ថែមផ្នែក" :bordered="false" size="small">
          <template #header-extra>
            <n-button type="success" @click="create()" >
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M3 5a2 2 0 0 1 2-2h8.379a2 2 0 0 1 1.414.586l1.621 1.621A2 2 0 0 1 17 6.621V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1v-4.5A1.5 1.5 0 0 1 6.5 10h7a1.5 1.5 0 0 1 1.5 1.5V16a1 1 0 0 0 1-1V6.621a1 1 0 0 0-.293-.707l-1.621-1.621A1 1 0 0 0 13.379 4H13v2.5A1.5 1.5 0 0 1 11.5 8h-4A1.5 1.5 0 0 1 6 6.5V4H5zm2 0v2.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4H7zm7 12v-4.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V16h8z" fill="currentColor"></path></g></svg>
              </template>
              រក្សារទុក
            </n-button>
          </template>
          <!-- Form edit account -->
          <div class="crud-create-form w-full border-t">
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
                  <n-form-item label="ឈ្មោះ" path="name" class="w-full p-1" >
                    <n-input v-model:value="record.name" placeholder="ឈ្មោះ" />
                  </n-form-item>
                  <n-form-item label="កូដសម្គាល់" class="w-full p-1" >
                    <n-input v-model:value="record.prefix" placeholder="កូដសម្គាល់" />
                  </n-form-item>
                  <n-form-item label="ឈ្មោះ" class="w-full p-1" >
                    <n-input type="textarea" v-model:value="record.desp" placeholder="ឈ្មោះ" />
                  </n-form-item>
                </n-form>
                <div class="w-1/2 h-8"></div>  
              </div>
            </div>
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
      required: false ,
      default: () => {
        return reactive({
          id: 0 ,
          name: '' ,
          desp: '' ,
          prefix: ''

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
    var store = useStore()
    const message = useMessage()
    const notify = useNotification()

    
    /**
     * Variables
     */    
    var rules = {
        name: {
          required: true,
          message: 'សូមបញ្ចូល ឈ្មោះ',
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

    function create(){
      if( 
        props.record.name == ""
      ){
        notify.warning({
          title: 'ពិនិត្យព័ត៌មាន' ,
          description: 'សូមបំពេញឈ្មោះជា ភាសារខ្មែរ និង អង់គ្លេស ឲ្យបានពេញលេញ' ,
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

      store.dispatch( props.model.module+'/create',
        {
          'name' : props.record.name , 
          'desp' : props.record.desp ,
          'prefix' : props.record.prefix
        }
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
  
    function initial(){
      
    }

    return {
      /**
       * Variables
       */
      rules ,
      /**
       * Functions
       */
      create  ,
      initial ,
      clearRecord ,
      maskOrEscClick
    }
  }
}
</script>
<style type="text/css" scoped >
  
</style>