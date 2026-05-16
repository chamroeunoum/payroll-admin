<template>
  <div class="actions" >
    <Transition name="slide-fade" >
      <div v-if="show" class="panel" >
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-blue-500" @click="showDetailModal(record)"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184s184-82.39 184-184S349.61 64 248 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M220 220h32v116"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M208 340h88"></path><path d="M248 130a26 26 0 1 0 26 26a26 26 0 0 0-26-26z" fill="currentColor"></path></svg>
          </template>
          ព័ត៌មានលម្អិត
        </n-tooltip>
        <!-- <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-blue-500 " @click="showEditModal(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M4 15h5.986c-.227.3-.4.639-.51 1H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5.232c-.326.14-.631.343-.897.609L15 9.944V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1zm8-9.5a.5.5 0 0 1 1 0v6.444l-.88.88A.498.498 0 0 1 12 12.5v-7zm-7 2a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0v-5zM9 9a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-3A.5.5 0 0 0 9 9zm1.98 6.377l4.83-4.83a1.87 1.87 0 1 1 2.645 2.646l-4.83 4.829a2.197 2.197 0 0 1-1.02.578l-1.498.374a.89.89 0 0 1-1.079-1.078l.375-1.498c.096-.386.296-.74.578-1.02z" fill="currentColor"></path></g></svg>
          </template>
          កែប្រែ
        </n-tooltip> -->
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-blue-600" @click="$router.push('/payroll/'+record.id+'/salary')" 
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M5 6.25A2.25 2.25 0 0 1 7.25 4h8.5A2.25 2.25 0 0 1 18 6.25V14h3.5v3.25a3.25 3.25 0 0 1-3.25 3.25H13V19h3.5V6.25a.75.75 0 0 0-.75-.75h-8.5a.75.75 0 0 0-.75.75V14H5V6.25zM18 19h.25A1.75 1.75 0 0 0 20 17.25V15.5h-2V19zm-3.75-2.5H13a2.49 2.49 0 0 0-.5-1.5h1.75a.75.75 0 0 1 0 1.5zM8 8.75A.75.75 0 0 1 8.75 8h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 8 8.75zm0 3.5a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM1 16.5A1.5 1.5 0 0 1 2.5 15h8a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 1 20.5v-4zm10 .5a1 1 0 0 1-1-1H9a2 2 0 0 0 2 2v-1zm0 2a2 2 0 0 0-2 2h1a1 1 0 0 1 1-1v-1zm-8-3a1 1 0 0 1-1 1v1a2 2 0 0 0 2-2H3zm1 5a2 2 0 0 0-2-2v1a1 1 0 0 1 1 1h1zm4.25-2.5a1.75 1.75 0 1 0-3.5 0a1.75 1.75 0 0 0 3.5 0z" fill="currentColor"></path></g></svg>
          </template>
          ព័ត៌មានលម្អិត
        </n-tooltip>
        <!-- <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-red-500" @click="deleteAccount(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path><path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M184 176l8 224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M328 176l-8 224"></path></svg>              
          </template>
          លុបព័ត៌មាននេះ
        </n-tooltip> -->
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
    <!-- <update-form v-bind:model="model" v-bind:record="record" v-bind:show="editModal.show" :onClose="closeUpdate"/> -->
    <!-- Form update account -->
    <!-- <detail-form v-bind:model="model" v-bind:record="record" v-bind:show="detailModal.show" :onClose="closeDetail"/> -->
    <!-- Form Profile -->
    <!-- <profile-form v-bind:model="model" v-bind:record="record" v-bind:show="profileModal.show" :onClose="closeProfileModal"/> -->
  </div>
</template>
<script>
import { reactive ,ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useDialog, useMessage, useNotification } from 'naive-ui'
// import UpdateForm from '../../widgets/update.vue'
// import DetailForm from '../../widgets/detail.vue'
// import ProfileForm from '../../widgets/profile.vue'
/**
 * CRUD component form
 */
export default {
  name: "ThumbnailActions" ,
  components: {
    // UpdateForm ,
    // DetailForm ,
    // ProfileForm
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
      console.log( record.countesy )
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
  @apply absolute top-2 right-1 w-4 h-4 p-0 rounded-full cursor-pointer ;
}
.vcb-thumbnail .actions .panel {
  @apply bg-white/95 absolute w-full top-0 bottom-0 flex flex-wrap content-center justify-center p-2 rounded-l;
}
.vcb-thumbnail .actions .action {
  @apply cursor-pointer w-6 m-1 p-1 bg-white border border-gray-200 rounded ;
}
</style>