<template>
  <div class="actions" >
    <Transition name="slide-fade" >
      <div v-if="show" class="panel" >
        <!-- <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-blue-500" @click="showDetailModal(record)"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184s184-82.39 184-184S349.61 64 248 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M220 220h32v116"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M208 340h88"></path><path d="M248 130a26 26 0 1 0 26 26a26 26 0 0 0-26-26z" fill="currentColor"></path></svg>
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
            <svg class="action text-blue-600" @click="showProfileModal(record)" 
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3z" fill="currentColor"></path><path d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.899 11.899 0 0 1-12 0zm13.992-1.451A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z" fill="currentColor"></path></svg>
          </template>
          ប្ដូររូបភាព
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-green-700" @click="goToSalaryPreview" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M7 7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7zm2-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5H9zm-.75 8a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5zm1.25 2.75a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0zm6.25-2.75a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5zM17 17.25a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0zm-5-2.75a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5zm1.25 2.75a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0zM7.25 2A3.25 3.25 0 0 0 4 5.25v13.5A3.25 3.25 0 0 0 7.25 22h9.5A3.25 3.25 0 0 0 20 18.75V5.25A3.25 3.25 0 0 0 16.75 2h-9.5zM5.5 5.25c0-.966.784-1.75 1.75-1.75h9.5c.966 0 1.75.784 1.75 1.75v13.5a1.75 1.75 0 0 1-1.75 1.75h-9.5a1.75 1.75 0 0 1-1.75-1.75V5.25z" fill="currentColor"></path></g></svg>
          </template>
          ពិនិត្យការគណនាប្រាក់ខែ
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-red-500" @click="deleteAccount(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path><path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M184 176l8 224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M328 176l-8 224"></path></svg>              
          </template>
          លុបព័ត៌មាននេះ
        </n-tooltip>
      </div>
    </Transition>
    <n-tooltip v-if="!show" trigger="hover">
      <template #trigger>
        <div class="action-toggle bg-gray-200 hover:bg-blue-500 duration-500 hover:text-gray-50" @click="toggleActions" >
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><circle cx="8" cy="16" r="2" fill="currentColor"></circle><circle cx="16" cy="16" r="2" fill="currentColor"></circle><circle cx="24" cy="16" r="2" fill="currentColor"></circle></svg>
        </div>
      </template>
      មុខងារផ្សេងៗ
    </n-tooltip>
    <n-tooltip v-if="show" trigger="hover">
      <template #trigger>
        <div class="action-toggle  text-blue-500" @click="toggleActions" >
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 320l128-128"></path></svg>
        </div>
      </template>
      បិទមុខងារផ្សេងៗ
    </n-tooltip>
    <!-- Form update account -->
    <update-form v-bind:model="model" v-bind:record="record" v-bind:show="editModal.show" :onClose="closeUpdate"/>
    <!-- Form update account -->
    <detail-form v-bind:model="model" v-bind:record="record" v-bind:show="detailModal.show" :onClose="closeDetail"/>
    <!-- Form Profile -->
    <profile-form v-bind:model="model" v-bind:record="record" v-bind:show="profileModal.show" :onClose="closeProfileModal"/>
  </div>
</template>
<script>
import { reactive ,ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import UpdateForm from '../../widgets/update.vue'
import DetailForm from '../../widgets/detail.vue'
import ProfileForm from '../../widgets/profile.vue'
import dateFormat from 'dateformat'
/**
 * CRUD component form
 */
export default {
  name: "ThumbnailActions" ,
  components: {
    UpdateForm ,
    DetailForm ,
    ProfileForm
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
    const router = useRouter()
    
    const show = ref(false)
    function toggleActions(){
      show.value = !show.value
    }

    function closeDetail(actionStatus){
      detailModal.show = false
      props.onClose( parseInt( actionStatus ) )
    }

    function closeUpdate(actionStatus){
      editModal.show = false
      props.onClose( parseInt( actionStatus ) )
    }

    function closePreviewCard(actionStatus){
      previewCardModal.show = false
      props.onClose( parseInt( actionStatus ) )
    }

    function closeProfileModal(actionStatus){
      profileModal.show = false
      props.onClose( parseInt( actionStatus ) )
    }

    function closeActions(actionStatus){
      show.value = false
      if( parseInt( actionStatus ) > 0 ) props.onClose( actionStatus )
    }

    var editModal = reactive({show:false})

    function showEditModal(record){
      editModal.show = true
      show.value = false
    }

    var previewCardModal = reactive({show:false})
    function showPreviewCardModal(record){
      previewCardModal.show = true
      show.value = false
    }

    var profileModal = reactive({show:false})
    function showProfileModal(record){
      profileModal.show = true
      show.value = false
    }

    var officialCardModal = reactive({show:false})
    function showOfficialCardModal(record){
      officialCardModal.show = true
      show.value = false
    }
    function closeOfficialCard(actionStatus){
      officialCardModal.show = false
      props.onClose( parseInt( actionStatus ) )
    }
    var detailModal = reactive({show:false})
    function showDetailModal(record){
      detailModal.show = true
      show.value = false
    }

    function goToSalaryPreview(){
      router.push({ name: "OfficerSalaryPreview" , params: { id : props.record.id } })
    }

    // const date = ref( new Date().getTime() )
    // const officer_id = ref(null)
    // function generateSalary(){
    //   store.dispatch('officer/generateSalary',{ date: dateFormat( new Date( date.value ) , 'dd-mm-yyyy' ) , officer_id : props.record.id } ).then( res => {
    //     console.log( res.data )
    //     filterMonth.value = new Date( date.value ).getTime()
    //   }).catch( err => {
    //     console.log( err )
    //   })
    // }

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
      
      /**
       * Editing
       */
      editModal ,
      showEditModal ,
      /**
       * Detail modal
       */
      showDetailModal ,
      detailModal ,
      /**
       * Functions
       */
      deleteAccount ,
      toggleActions ,
      // generateSalary ,
      goToSalaryPreview ,
      show ,
      closeActions ,
      closeUpdate ,
      closeDetail ,
      //
      showPreviewCardModal ,
      closePreviewCard,
      previewCardModal ,
      //
      showOfficialCardModal ,
      closeOfficialCard,
      officialCardModal , 
      // 
      showProfileModal ,
      profileModal ,
      closeProfileModal
    }
  }
}

</script>
<style type="text/css" scoped >
.vcb-thumbnail .actions {
  @apply flex flex-wrap justify-center absolute w-96 top-0 right-0 bottom-0;
}
.vcb-thumbnail .actions .action-toggle {
  @apply absolute top-1 right-1 w-5 h-5 p-0 rounded-full cursor-pointer ;
}
.vcb-thumbnail .actions .panel {
  @apply bg-white/95 absolute w-full top-0 bottom-0 flex flex-wrap content-center justify-center p-2 rounded-l;
}
.vcb-thumbnail .actions .action {
  @apply cursor-pointer w-6 m-1 p-1 bg-white border border-gray-200 rounded ;
}
</style>