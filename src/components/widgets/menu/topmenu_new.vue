<template>
  <div class="font-pvh fixed top-0 left-0 right-0 flex flex-warp" >
    <div @click="toggleDock" class="flex rounded-br-lg p-2 pr-4 hover:bg-yellow-100 duration-500 cursor-pointer">
      <div class="w-10 h-10 mr-2 bg-contain bg-no-repeat bg-center p-2" style=" background-image: url('/src/assets/logo.jpg'); " ></div>
      <div class="flex-none text-left h-10 text-xs flex flex-wrap font-moul pt-3">{{ store.state.system.name }}</div>
    </div>
  </div>
  <Dock v-bind:show="show" :close="function(){show=false}"/>
</template>

<script >
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { getUser } from './../../plugins/authentication'
import Dock from '../widgets/Dock.vue'
import Footer from './../footer/copyright.vue'
export default {
  name: 'Topmenu'  ,
  components: {
    Dock ,
    Footer
  },
  setup(){
    const store = useStore()
    const show = ref(false)
    const username = computed(() => {
      let user = getUser()
      return user !== null 
        ? ( user.lastname + " " + user.firstname 
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
      toggleDock
    }
  }
}
</script>