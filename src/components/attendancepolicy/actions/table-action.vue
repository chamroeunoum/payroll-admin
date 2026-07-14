<template>
  <div class="actions" >
    <Transition name="slide-fade" >
      <div v-if="show" class="panel" >
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg @click="setAttendanceType('AL')" class="action text-red-700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M18 23h-2v-2a3.003 3.003 0 0 0-3-3H9a3.003 3.003 0 0 0-3 3v2H4v-2a5.006 5.006 0 0 1 5-5h4a5.006 5.006 0 0 1 5 5z" fill="currentColor"></path><path d="M11 6a3 3 0 1 1-3 3a3 3 0 0 1 3-3m0-2a5 5 0 1 0 5 5a5 5 0 0 0-5-5z" fill="currentColor"></path><path d="M2 26h28v2H2z" fill="currentColor"></path><path d="M31.966 11.741a1 1 0 0 0-1.225-.707l-3.086.826L24 7l-1 .268l1.458 5.448l-2.766.74L20 11.206l-1 .268l.934 3.488a1 1 0 0 0 1.224.708l10.1-2.704a1 1 0 0 0 .708-1.225z" fill="currentColor"></path></svg>
          </template>
          ច្បាប់សម្រាកប្រចាំឆ្នាំ
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg @click="setAttendanceType('ML')" class="action text-red-700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M9 4c0-1.11.89-2 2-2s2 .89 2 2s-.89 2-2 2s-2-.89-2-2zm7 9a3.285 3.285 0 0 0-2-3c0-1.66-1.34-3-3-3s-3 1.34-3 3v7h2v5h3v-5h3v-4z" fill="currentColor"></path></svg>
          </template>
          ច្បាប់មាតុភាព
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg @click="setAttendanceType('SL')" class="action text-red-700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M7.32 10.56L8.38 9.5L7.32 8.44l1.06-1.06L10.5 9.5l-2.12 2.12l-1.06-1.06zM4.5 9c.03 0 .05.01.08.01A8.002 8.002 0 0 1 12 4c2.19 0 4.16.88 5.61 2.3c.15-.6.45-1.29.81-1.96A9.965 9.965 0 0 0 11.99 2c-4.88 0-8.94 3.51-9.81 8.14C2.74 9.44 3.59 9 4.5 9zM21 10.5c-.42 0-.82-.09-1.19-.22c.12.55.19 1.13.19 1.72c0 4.42-3.58 8-8 8c-3.36 0-6.23-2.07-7.42-5.01c-.03 0-.05.01-.08.01c-.52 0-1.04-.14-1.5-.4c-.32-.18-.59-.42-.82-.7c.89 4.61 4.93 8.1 9.8 8.1C17.52 22 22 17.52 22 12c0-.55-.06-1.09-.14-1.62a3.5 3.5 0 0 1-.86.12zM21 3s-2 2.9-2 4s.9 2 2 2s2-.9 2-2s-2-4-2-4zm-5.38 4.38L13.5 9.5l2.12 2.12l1.06-1.06l-1.06-1.06l1.06-1.06l-1.06-1.06zM8.56 17c.69-1.19 1.97-2 3.44-2s2.75.81 3.44 2h1.68c-.8-2.05-2.79-3.5-5.12-3.5c-.87 0-1.7.2-2.43.57L5.99 12c0-.52-.26-1.02-.74-1.29c-.72-.41-1.63-.17-2.05.55c-.41.72-.17 1.63.55 2.05c.48.28 1.05.25 1.49 0l2.97 1.72c-.57.53-1.03 1.21-1.33 1.97h1.68z" fill="currentColor"></path></svg>
          </template>
          ច្បាប់ឈឺ
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg @click="setAttendanceType('OL')" class="action text-red-700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M7.32 10.56L8.38 9.5L7.32 8.44l1.06-1.06L10.5 9.5l-2.12 2.12l-1.06-1.06zM4.5 9c.03 0 .05.01.08.01A8.002 8.002 0 0 1 12 4c2.19 0 4.16.88 5.61 2.3c.15-.6.45-1.29.81-1.96A9.965 9.965 0 0 0 11.99 2c-4.88 0-8.94 3.51-9.81 8.14C2.74 9.44 3.59 9 4.5 9zM21 10.5c-.42 0-.82-.09-1.19-.22c.12.55.19 1.13.19 1.72c0 4.42-3.58 8-8 8c-3.36 0-6.23-2.07-7.42-5.01c-.03 0-.05.01-.08.01c-.52 0-1.04-.14-1.5-.4c-.32-.18-.59-.42-.82-.7c.89 4.61 4.93 8.1 9.8 8.1C17.52 22 22 17.52 22 12c0-.55-.06-1.09-.14-1.62a3.5 3.5 0 0 1-.86.12zM21 3s-2 2.9-2 4s.9 2 2 2s2-.9 2-2s-2-4-2-4zm-5.38 4.38L13.5 9.5l2.12 2.12l1.06-1.06l-1.06-1.06l1.06-1.06l-1.06-1.06zM8.56 17c.69-1.19 1.97-2 3.44-2s2.75.81 3.44 2h1.68c-.8-2.05-2.79-3.5-5.12-3.5c-.87 0-1.7.2-2.43.57L5.99 12c0-.52-.26-1.02-.74-1.29c-.72-.41-1.63-.17-2.05.55c-.41.72-.17 1.63.55 2.05c.48.28 1.05.25 1.49 0l2.97 1.72c-.57.53-1.03 1.21-1.33 1.97h1.68z" fill="currentColor"></path></svg>
          </template>
          ច្បាប់មានធុរៈ
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg @click="setAttendanceType('AB')" class="action text-red-700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M7.5 2a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7zm0 1a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5zm7 6a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5zM13 6.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0zm-1.695 3.523A2.025 2.025 0 0 0 11 10H4a2 2 0 0 0-2 2v1.5C2 15.554 4.088 17 7.5 17c.732 0 1.404-.067 2.006-.192a5.46 5.46 0 0 1-.336-.947A9.35 9.35 0 0 1 7.5 16C4.579 16 3 14.907 3 13.5V12a1 1 0 0 1 1-1h6.257c.305-.37.657-.698 1.048-.977zM10 14.5a4.5 4.5 0 1 0 9 0a4.5 4.5 0 0 0-9 0zm2.404 2.803l4.9-4.9a3.5 3.5 0 0 1-4.9 4.9zm-.707-.707a3.5 3.5 0 0 1 4.9-4.9l-4.9 4.9z" fill="currentColor"></path></g></svg>
          </template>
          អវត្តមាន
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-blue-500" @click="showDetail" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28"><g fill="none"><path d="M15 11.75a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm.75 3.25a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5zm-4.5-3.25a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0zM7 14.5h5a1 1 0 0 1 1 1v.5s-.5 2.5-3.5 2.5S6 16 6 16v-.5a1 1 0 0 1 1-1zM2.004 6.75A2.75 2.75 0 0 1 4.754 4H23.25A2.75 2.75 0 0 1 26 6.75v14.5A2.75 2.75 0 0 1 23.25 24H4.755a2.75 2.75 0 0 1-2.75-2.75V6.75zm2.75-1.25c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25H23.25c.69 0 1.25-.56 1.25-1.25V6.75c0-.69-.56-1.25-1.25-1.25H4.755z" fill="currentColor"></path></g></svg>
          </template>
          ព័ត៌មានលម្អិត
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg class="action text-red-500" @click="deleteRecord(record)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path><path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path></svg>
          </template>
          លុប
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
  </div>
</template>
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useDialog, useMessage, useNotification } from 'naive-ui'

export default {
  name: "AttendancePolicyTableActions",
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

    function deleteRecord(record){
      show.value = false
      dialog.warning({
        title: "លុបទិន្នន័យ",
        content: "តើអ្នកចង់លុបទិន្នន័យនេះមែនទេ?",
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch(props.model.name+'/delete',{id:record.id}).then( res => {
            if( res.data.ok ){
              notify.success({ title: 'លុប', description: 'លុបបានរួចរាល់។', duration: 3000 })
              closeActions(1)
            }
          }).catch( err => { message.error( err ) })
          closeActions(0)
        }
      })
    }

    function setAttendanceType(attnType){
      store.dispatch(props.model.name+'/update',{ id: props.record.id, type: attnType }).then( res => {
        closeActions(1)
      }).catch( err => { console.log( err ) })
    }

    function showDetail(){
      closeActions(0)
    }

    return { show, toggleActions, closeActions, deleteRecord, setAttendanceType, showDetail }
  }
}
</script>
<style scoped>
.vcb-thumbnail .actions {
  @apply flex flex-wrap justify-center absolute top-0 right-0 bottom-0 w-60;
}
.vcb-thumbnail .actions .action-toggle {
  @apply absolute top-1 right-1 w-4 h-4 rounded-full cursor-pointer;
}
.vcb-thumbnail .actions .panel {
  @apply bg-white bg-opacity-90 absolute w-full top-0 bottom-0 flex flex-wrap content-center justify-center pr-5 pt-0 rounded;
}
.vcb-thumbnail .actions .action {
  @apply cursor-pointer w-4 m-1 bg-white;
}
</style>
