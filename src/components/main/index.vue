<template>
  <div class="relative bg-background bg-gray-50 bg-cover bg-center w-full h-screen overflow-hidden" >
    <div class="top-10 right-0 bottom-0 left-40 fixed p-4 overflow-y-auto">
      <router-view v-slot="{ Component , route}">
        <Transition name="fade" mode="out-in" >
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>
    <Topmenu type="sidebar" />
  </div>
</template>

<script>
import Topmenu from '@components/widgets/menu/topmenu.vue'
export default {
    components: { 
      Topmenu 
    },
    setup() {
      return {
      };
    },
    name: "DashboardPage", 
    data() {
        return {};
    },
    computed: {},
    mounted() {
    },
    methods: {},
}
</script>
<style scoped>
/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>