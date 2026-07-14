<template>
  <div class="actions" >
    <Transition name="slide-fade" >
      <div v-if="show" class="panel" >
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-blue-500" @click="approveRequest(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></g></svg>
          </template>
          អនុម័ត
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-red-500" @click="deleteAccount(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path><path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M184 176l8 224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M328 176l-8 224"></path></svg>              
          </template>
          លុប
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
        <div class="action-toggle text-blue-500" @click="toggleActions" >
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 320l128-128"></path></svg>
        </div>
      </template>
      បិទមុខងារផ្សេងៗ
    </n-tooltip>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useDialog, useMessage, useNotification } from 'naive-ui'

export default {
  name: "LeaveRequestActions",
  props: {
    model: { type: Object },
    record: { type: Object },
    onClose: { type: Function }
  },
  setup(props){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    const show = ref(false)

    function toggleActions(){ show.value = !show.value }
    function closeActions(actionStatus){ show.value = false; if( parseInt( actionStatus ) > 0 ) props.onClose( actionStatus ) }

    function approveRequest(record){
      show.value = false
      dialog.warning({
        title: "អនុម័តសំណើរ",
        content: "តើអ្នកចង់អនុម័តសំណើរឈប់សម្រាកនេះមែនទេ?",
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch('leaverequest/approve',{id: record.id, approved: 1}).then( res => {
            if( res.data.ok ){
              notify.success({ title: 'អនុម័ត', description: 'បានអនុម័តរួចរាល់។', duration: 3000 })
              closeActions(1)
            }
          }).catch( err => { message.error( err ) })
          closeActions(0)
        }
      })
    }

    function deleteAccount(record){
      show.value = false
      dialog.warning({
        title: "លុបសំណើរ",
        content: "តើអ្នកចង់លុបសំណើរឈប់សម្រាកនេះមែនទេ?",
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch('leaverequest/delete',{id:record.id}).then( res => {
            if( res.data.ok ){
              notify.success({ title: 'លុបទិន្នន័យ', description: 'លុបបានរួចរាល់។', duration: 3000 })
              closeActions(1)
            }
          }).catch( err => { message.error( err ) })
          closeActions(0)
        }
      })
    }

    return { show, toggleActions, closeActions, approveRequest, deleteAccount }
  }
}
</script>
<style scoped>
.vcb-thumbnail .actions { @apply flex flex-wrap justify-center absolute w-96 top-0 right-0 bottom-0; }
.vcb-thumbnail .actions .action-toggle { @apply absolute top-5 right-1 w-8 h-8 p-0 rounded-full cursor-pointer ; }
.vcb-thumbnail .actions .panel { @apply bg-white/95 absolute w-full top-0 bottom-0 flex flex-wrap content-center justify-center p-2 rounded-l; }
.vcb-thumbnail .actions .action { @apply cursor-pointer w-10 m-1 p-1 bg-white border border-gray-200 rounded ; }
</style>
