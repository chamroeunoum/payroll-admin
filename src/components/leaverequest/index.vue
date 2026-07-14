<template>
  <div class="relative bg-gray-50 w-full min-h-screen" >
    <div class="top-10 right-0 bottom-0 left-40 absolute p-4">
      <router-view v-slot="{ Component , route}">
        <Transition name="slide-fade" >
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>
    <Topmenu type="sidebar" />
  </div>
</template>
<script >
import Topmenu from '@components/widgets/menu/topmenu.vue'
export default {
    components: { Topmenu },
    name: "LeaveRequestPage",
}
</script>
