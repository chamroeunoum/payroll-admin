<template>
  <div class="actions" >
    <Transition name="slide-fade" >
      <div v-if="show" class="panel" >
        <!-- <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-blue-500" @click="showDetailModal(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28"><g fill="none"><path d="M15 11.75a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm.75 3.25a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5zm-4.5-3.25a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0zM7 14.5h5a1 1 0 0 1 1 1v.5s-.5 2.5-3.5 2.5S6 16 6 16v-.5a1 1 0 0 1 1-1zM2.004 6.75A2.75 2.75 0 0 1 4.754 4H23.25A2.75 2.75 0 0 1 26 6.75v14.5A2.75 2.75 0 0 1 23.25 24H4.755a2.75 2.75 0 0 1-2.75-2.75V6.75zm2.75-1.25c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25H23.25c.69 0 1.25-.56 1.25-1.25V6.75c0-.69-.56-1.25-1.25-1.25H4.755z" fill="currentColor"></path></g></svg>
          </template>
          ព័ត៌មានលម្អិត
        </n-tooltip> -->
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-blue-500 " @click="showEditModal(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M4 15h5.986c-.227.3-.4.639-.51 1H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5.232c-.326.14-.631.343-.897.609L15 9.944V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1zm8-9.5a.5.5 0 0 1 1 0v6.444l-.88.88A.498.498 0 0 1 12 12.5v-7zm-7 2a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0v-5zM9 9a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-3A.5.5 0 0 0 9 9zm1.98 6.377l4.83-4.83a1.87 1.87 0 1 1 2.645 2.646l-4.83 4.829a2.197 2.197 0 0 1-1.02.578l-1.498.374a.89.89 0 0 1-1.079-1.078l.375-1.498c.096-.386.296-.74.578-1.02z" fill="currentColor"></path></g></svg>
          </template>
          កែប្រែ
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-yellow-500 " @click="inputPassword(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M11 6a1 1 0 1 0 0-2a1 1 0 0 0 0 2z" fill="currentColor"></path><path d="M7.5 12v-.5h1A.5.5 0 0 0 9 11v-1h1a4 4 0 1 0-3.838-2.87L2.292 11a1 1 0 0 0-.292.707V13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.5h1a.5.5 0 0 0 .5-.5zM7 6a3 3 0 1 1 3 3H8.5a.5.5 0 0 0-.5.5v1H7a.5.5 0 0 0-.5.5v.5h-1a.5.5 0 0 0-.5.5v1H3v-1.293l4.089-4.089a.5.5 0 0 0 .113-.534C7.072 6.748 7 6.384 7 6z" fill="currentColor"></path></g></svg>
          </template>
          ប្ដូរពាក្យសម្ងាត់
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-red-500" @click="deleteAccount(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path><path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M184 176l8 224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M328 176l-8 224"></path></svg>              
          </template>
          លុបគណនី
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg :class="'action ' + ( parseInt( record.active ) == 1 ? ' text-green-500 ' : ' text-gray-500 ') " @click="activateAccount(record)" :title="record.active == 1 ? 'គណនីនេះកំពុងបើកតំណើរការ' : 'គណនីនេះកំពុងត្រូវបានបិទមិនអាចប្រើប្រាស់បាន' "  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z" fill="currentColor"></path></svg>
          </template>
          បិទ និង បើក គណនី
        </n-tooltip>  
      </div>
    </Transition>
    <n-tooltip v-if="!show" trigger="hover">
      <template #trigger>
        <div class="action-toggle bg-gray-200 hover:bg-blue-500 duration-500 hover:text-gray-50" @click="toggleActions" >
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z" fill="currentColor"></path></svg>
        </div>
      </template>
      មុខងារផ្សេងៗ
    </n-tooltip>
    <n-tooltip v-if="show" trigger="hover">
      <template #trigger>
        <div class="action-toggle bg-blue-500 text-gray-50" @click="toggleActions" >
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M8.12 14.71L12 10.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 8.71a.996.996 0 0 0-1.41 0L6.7 13.3a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.42 0z" fill="currentColor"></path></svg>
        </div>
      </template>
      បិទមុខងារផ្សេងៗ
    </n-tooltip>
    <!-- Form update account -->
    <update-form v-bind:model="model" v-bind:record="record" v-bind:show="editModal.show" :onClose="closeUpdate"/>
    <!-- Form update account -->
    <detail-form v-bind:model="model" v-bind:record="record" v-bind:show="detailModal.show" :onClose="closeDetail"/>
    <!-- Form change password -->
    <div class="vcb-pop-edit font-ktr">
      <n-modal v-model:show="changePasswordModal.show" transform-origin="center">
        <n-card class="w-11/12 xl:w-7/12 lg:w-7/12 md:w-8/12 sm:w-11/12 font-pvh text-xl" title="ប្ដូរពាក្យសម្ងាត់" :bordered="false" size="small">
          <template #header-extra>
            <n-button type="success" @click="changePassword(changePasswordModal.form)" >
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M3 5a2 2 0 0 1 2-2h8.379a2 2 0 0 1 1.414.586l1.621 1.621A2 2 0 0 1 17 6.621V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1v-4.5A1.5 1.5 0 0 1 6.5 10h7a1.5 1.5 0 0 1 1.5 1.5V16a1 1 0 0 0 1-1V6.621a1 1 0 0 0-.293-.707l-1.621-1.621A1 1 0 0 0 13.379 4H13v2.5A1.5 1.5 0 0 1 11.5 8h-4A1.5 1.5 0 0 1 6 6.5V4H5zm2 0v2.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4H7zm7 12v-4.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V16h8z" fill="currentColor"></path></g></svg>
              </template>
              រក្សារទុក
            </n-button>
          </template>
          <!-- Form change password -->
          <div class="crud-create-form w-full border-t">
            <div class=" mx-auto p-4 flex-wrap">
              <div class="crud-form-panel w-full flex flex-wrap ">
                <n-form 
                  class="w-full text-left font-btb text-lg flex flex-wrap" 
                  :label-width="80"
                  :model="changePasswordModal.form"
                  :rules="changePasswordModal.rules"
                  size="large"
                  ref="formRef"
                >
                  <n-form-item label="ពាក្យសម្ងាត់ថ្មី" path="password" class="w-full p-1" >
                    <n-input type="password" show-password-on="mousedown" v-model:value="changePasswordModal.form.password" placeholder="ពាក្យសម្ងាត់ថ្មី" />
                  </n-form-item>
                </n-form>
                <div class="w-1/2 h-8"></div>  
              </div>
            </div>
          </div>
          <!-- End form change password -->
          <template #footer></template>
        </n-card>
      </n-modal>
    </div>
  </div>
</template>
<script>
import { reactive ,ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import UpdateForm from './../../widgets/update.vue'
import DetailForm from './../../widgets/detail.vue'
/**
 * CRUD component form
 */
export default {
  name: "ThumbnailActions" ,
  components: {
    UpdateForm ,
    DetailForm
  } ,
  props: {
    model: {
      type: Object
    },
    record: {
      type: Object
    },
    onClose: {
      type: Function
    }
  },
  setup(props){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    
    const show = ref(false)
    function toggleActions(){
      show.value = !show.value
    }

    function closeDetail(actionStatus){
      detailModal.show = false
    }

    function closeUpdate(actionStatus){
      editModal.show = false
    }

    function closeActions(actionStatus){
      show.value = false
      if( parseInt( actionStatus ) > 0 ) props.onClose( actionStatus )
    }

    var changePasswordModal = reactive({
      show: false ,
      account: null ,
      form: {
        password: ''
      },
      rules: {
        password: {
          required: true,
          message: 'សូមបញ្ចូលពាក្យសម្ងាត់ថ្មី',
          trigger: [ 'blur']
        },
      }
    })

    function activateAccount(record){
      show.value = false
      dialog.warning({
        title: "បិទ ឬ បើក គណនី" ,
        content: "តើអ្នកចង់ " + ( record.active == 1 ? "បិទ" : "បើក" )+ " គណនីនេះមែនទេ ?" ,
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch( props.model.name+'/activate',{
            id: record.id ,
            active: parseInt( record.active ) == 1 ? 0 : 1
          }).then( res => {
            if( res.data.ok ){
              notify.success({
                title: 'ស្ថានភាពគណនី' ,
                description: 'ស្ថានភាពគណនីបានកែប្រែជោគជ័យ។' ,
                duration: 3000
              })
              closeActions( 1 )
            }else{
              notify.error({
                title: 'ស្ថានភាពគណនី' ,
                description: 'មានបញ្ហាក្នុងពេលកែប្រែស្ថានភាពគណនី។' ,
                duration: 3000
              })
            }
          }).catch( err => {
            message.error( err )
          })
          closeActions( 0 )
        },
        onNegativeClick: () => {
          
        }
      })
    }

    var editModal = reactive({show:false})
    var editRecord = reactive({
      id: 0 ,
      username: "" ,
      firstname: "" ,
      lastname: "" ,
      phone: "" ,
      email: "" ,
      person: null ,
      organizations: [] ,
      positions: []
    })
    function showEditModal(record){
      // editRecord.id = record.id
      // editRecord.username = record.username
      // editRecord.firstname = record.firstname
      // editRecord.lastname = record.lastname
      // editRecord.phone = record.phone
      // editRecord.email = record.email
      // editRecord.person = record.person
      // editRecord.organizations = record.organizations
      // editRecord.positions = record.positions
      editModal.show = true
      show.value = false
    }

    var detailModal = reactive({show:false})
    function showDetailModal(record){
      // editRecord.id = record.id
      // editRecord.username = record.username
      // editRecord.firstname = record.firstname
      // editRecord.lastname = record.lastname
      // editRecord.phone = record.phone
      // editRecord.email = record.email
      // editRecord.person = record.person
      // editRecord.organizations = record.organizations
      // editRecord.positions = record.positions
      detailModal.show = true
      show.value = false
    }

    function inputPassword(record){
      changePasswordModal.account = record
      changePasswordModal.form = {
        id: record.id ,
        password: record.password
      }
      changePasswordModal.show = true
      show.value = false
    }
    function changePassword(form){
      if( form.password != "" && form.password != undefined && form.password != null ){
        store.dispatch( props.model.name+'/passwordChange',{
            id: form.id ,
            password: form.password 
          }).then( res => {
            if( res.data.ok ){
              notify.success({
                title: 'ប្ដូរពាក្យសំងាត់' ,
                description: 'បានកែប្រែពាក្យសំងាត់បានជោគជ័យ។' ,
                duration: 3000
              })
              closeActions( 1 )
              changePasswordModal.show = false
              changePasswordModal.form = {
                id : 0 ,
                password: ''
              }
            }else{
              notify.error({
                title: 'ប្ដូរពាក្យសំងាត់' ,
                description: 'មានបញ្ហាក្នុងពេលកែប្រែពាក្យសំងាត់។' ,
                duration: 3000
              })
            }
          }).catch( err => {
            message.error( err )
          })
          closeActions( 0 )
      }else{
        notify.warning({
          title: 'ប្ដូរពាក្យសំងាត់' ,
          description: 'សូមបញ្ចូលពាក្យសំងាត់របស់អ្នក។' ,
          duration: 3000
        })
      }
    }

    function deleteAccount(record){
      show.value = false
      dialog.warning({
        title: "លុបគណនី" ,
        content: "តើអ្នកចង់ លុប គណនីនេះមែនទេ ?" ,
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch(props.model.name+'/delete',{id:record.id}).then( res => {
            if( res.data.ok ){
              notify.success({
                title: 'លុបទិន្នន័យ' ,
                description: 'លុបបានរួចរាល់។' ,
                duration: 3000
              })
              closeActions(1)
            }else{
              notify.success({
                title: 'លុបទិន្នន័យ' ,
                description: 'មានបញ្ហាក្នុងពេលលុបទិន្នន័យ។' ,
                duration: 3000
              })
            }
          }).catch( err => {
            message.error( err )
          })
          closeActions( 0 )
        },
        onNegativeClick: () => {
        }
      })
    }
  
    return {
      /**
       * Variables
       */
      changePasswordModal ,
      /**
       * Editing
       */
      editModal ,
      showEditModal ,
      editRecord ,
      /**
       * Detail modal
       */
      showDetailModal ,
      detailModal ,
      /**
       * Functions
       */
      activateAccount ,
      inputPassword ,
      changePassword ,
      deleteAccount ,
      toggleActions ,
      show ,
      closeActions ,
      closeUpdate ,
      closeDetail
    }
  }
}

</script>
<style type="text/css" scoped >
.vcb-thumbnail .actions {
  @apply flex flex-wrap justify-center absolute left-0 top-0 right-0 bottom-0;
}
.vcb-thumbnail .actions .action-toggle {
  @apply absolute top-1 right-1 w-8 h-8 p-1 rounded-full cursor-pointer ;
}
.vcb-thumbnail .actions .panel {
  @apply bg-white bg-opacity-90 absolute w-full top-0 bottom-0 flex flex-wrap content-center justify-center p-4 ;
}
.vcb-thumbnail .actions .action {
  @apply cursor-pointer w-10 m-1 p-1 bg-white border border-gray-200 rounded-sm ;
}
</style>