<template>
  <div class="top-0 right-0 left-0 fixed flex border-gray-300 bg-blue-500 p-1 border-b h-10 font-pvh overflow-hidden" >
    <div class="flex-none m-1 w-5">
      <img :src="ocmLogoUrl" class="bg-white w-full rounded-full "/>
    </div>
    <div class="flex-grow h-8 font-moul text-left text-xs leading-8 text-white">{{ store.state.system.name }}</div>
    <div class="text-right flex-none pr-2 w-40 h-8 font-moul text-xs leading-9 text-white">{{ username }}</div>
    <div class="flex-none w-8 h-8 cursor-pointer">
      <!-- 
      <n-tooltip trigger="hover" >
        <template #trigger >
          <div class="rounded-full w-8 h-8 overflow-hidden" @click="toggleDock" >
            <svg v-if="profilePicture==null" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <img v-if="profilePicture!==null" :src="profilePicture" />
          </div>
        </template>
        ចុចដើម្បីបង្ហាញមុខងារផ្សេងៗទៀតក្នុងប្រព័ន្ធ
      </n-tooltip>
      -->
      <div class="rounded-full w-8 h-8 overflow-hidden" @click="$router.push( 'profile' )" >
        <svg v-if="profilePicture==null" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <img v-if="profilePicture!==null" :src="profilePicture" />
      </div>
    </div>
  </div>
  <Dock v-if="type=='dock'" v-bind:show="show" :close="function(){show=false}"/>
  <Sidebar v-if="type=='sidebar'" v-bind:show="show" :close="function(){show=false}"/>
</template>

<script >
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { getUser } from '@plugins/authentication'
import Dock from '@components/widgets/Dock.vue'
import Sidebar from '@components/widgets/Sidebar.vue'
import ocmLogoUrl from '@assets/logo.jpg'

export default {
  methods: {
  },
  name: 'Topmenu'  ,
  components: {
    Dock ,
    Sidebar
  },
  props: {
    type: String ,
    default: () => {
      return 'sidebar'
    }
  },
  
  setup(props){
    console.log( props.type )
    const store = useStore()
    const show = ref(false)
    const username = computed(() => {
      let user = getUser()
      return user !== null && user.people != null && user.people != undefined
        ? ( user.people.lastname + " " + user.people.firstname 
          // + ( user.roles != undefined && user.roles != null ? ' (' + user.roles[0].name + ')' : '' ) 
          )
        : "មិនមាន" 
    })

    const profilePicture = computed(() => {
      let user = getUser()
      return user !== null && user.avatar_url !== null ? user.avatar_url : null 
    })
    
    function toggleDock(){
        show.value = true
    }

    return {
      username ,
      profilePicture ,
      store ,
      show ,
      toggleDock ,
      ocmLogoUrl
    }
  }
}
</script>