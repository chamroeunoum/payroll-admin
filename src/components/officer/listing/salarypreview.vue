<template>
  <div class="w-full relative flex flex-wrap" >
    <Transition name="fade" >
      <div v-if="user!=null" class="w-full">
        <div class="flex w-full title-bar border-b border-gray-200 px-4 ">
          <!-- Title of crud -->
          <div class="flex w-64 h-10 py-1 title " >
            <svg class="w-8 h-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="leading-9 font-moul ml-2" v-html="model.title" ></div>
          </div>
          <!-- Actions button of the crud -->
          <div class="flex-grow action-buttons flex-row-reverse flex">
            <!-- New Button -->
            <div class="mt-1 ml-2">
              <!-- <n-button type="default" @click="$router.push('/welcome')" class="mx-2 "  >
                <template #icon>
                  <svg class="text-red-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M6.5 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-.166h.333a1.167 1.167 0 0 0 0-2.334H6.5zm.833 1.334H7V12h.333a.167.167 0 0 1 0 .334zM12 11.499a.5.5 0 0 1 .5-.499h.999a.5.5 0 0 1 0 1h-.5v.335h.5a.5.5 0 1 1 0 1h-.5l.001.164a.5.5 0 0 1-1 .002L12 12.834L12 11.499zM9.498 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5H10a1.5 1.5 0 0 0 0-3h-.502zm.5 2v-1H10a.5.5 0 0 1 0 1h-.002zM4 4a2 2 0 0 1 2-2h4.585a1.5 1.5 0 0 1 1.061.44l3.914 3.914a1.5 1.5 0 0 1 .44 1.06v1.668a1.5 1.5 0 0 1 .998 1.414v4.003A1.5 1.5 0 0 1 16 15.913V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-.087A1.5 1.5 0 0 1 3 14.5v-4.003A1.5 1.5 0 0 1 4 9.082V4zm11 4h-3.5A1.5 1.5 0 0 1 10 6.5V3H6a1 1 0 0 0-1 1v4.996h10V8zM5 15.999A1 1 0 0 0 6 17h8a1 1 0 0 0 1-1.001H5zm6-12.792V6.5a.5.5 0 0 0 .5.5h3.293L11 3.207zM4.5 9.996a.5.5 0 0 0-.5.5v4.003a.5.5 0 0 0 .5.5h10.997a.5.5 0 0 0 .5-.5v-4.003a.5.5 0 0 0-.5-.5H4.501z" fill="currentColor"></path></g></svg>
                </template>
                ស្វែងរកឯកសារ
              </n-button> -->
            </div>
            <div class="w-2/5 relative" ></div>
            <div class="mt-1 ml-2"></div>
          </div>
        </div>
        <!-- End Menu -->    
        <div class="p-8 sm:w-2/3 md:w-3/5 lg:w-2/5 w-4/5 mx-auto border my-8 relative">
          <div class="caption border-b border-gray-200 font-moul pb-2 " >{{  officer != null && officer.people != undefined ? officer.people.lastname + ' ' + officer.people.firstname : '' }}</div>
          <div class="section-attendance text-left" >
            <div class="header border-b border-gray-200 my-5 font-btb-black pb-2 " >វត្តមាន</div>
            <div class="body mt-4 mb-8" ></div>
          </div>
          <div class="section-overtime" >
            <div class="header border-b border-gray-200 my-5 text-left font-btb-black pb-2 " >ការធ្វើការថែមម៉ោង</div>
            <div class="body mt-4 mb-8" ></div>
          </div>
          <div class="section-overtime" >
            <div class="header border-b border-gray-200 my-5 text-left font-btb-black pb-2 " >ប្រាក់រង្វាន់</div>
            <div class="body mt-4 mb-8" ></div>
          </div>
          <div class="section-overtime" >
            <div class="header border-b border-gray-200 my-5 text-left font-btb-black pb-2 " >ការកាត់ប្រាក់ចេញ</div>
            <div class="body mt-4 mb-8" ></div>
          </div>
          <div class="section-overtime" >
            <div class="header border-b border-gray-200 my-5 text-left font-btb-black pb-2 " >សន្តិសុខសង្គម</div>
            <div class="body mt-4 mb-8" ></div>
          </div>
          <div class="section-overtime" >
            <div class="header border-b border-gray-200 my-5 text-left font-btb-black pb-2 " >ការធ្វើការថែមម៉ោង</div>
            <div class="body mt-4 mb-8" ></div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script >
import { isAuth, getUser , authLogout } from './../../../plugins/authentication.js'
import { reactive, ref , computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import FooterComponent from './../../../components/footer/copyright.vue'
import { useMessage, useNotification } from 'naive-ui'

  export default {
    name: 'Profile' ,
    components: {
      FooterComponent
    },
    setup(){
      const router = useRouter()
      const route = useRoute()
      const store = useStore()
      const user = ref(null)
      const message = useMessage()
      const notify = useNotification()

      if( isAuth() ){
        user.value = getUser()
      }else{
        user.value = ref({
          lastname: '' ,
          firstname: '' ,
          phone: '' ,
          username: '' ,
          email: ''
        })
      }

      /**
       * Variables
       */    
      const model = reactive( {
        name: "officer" ,
        title: "ការពីនិត្យការគណនាប្រាក់ខែ"
      })
      
      const officer = ref(null)
      function readRecord(){
        store.dispatch('officer/read' , {id : route.params.id }).then( res => {
          officer.value = res.data.record
        }).catch( err => {
          message.error('មិនអាចទាញយកទិន្នន័យបានទេ')
        })  
      }

      readRecord () 

      return {
        user ,
        model ,
        officer
      }
    }

  }
</script>
<style scoped >
/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>