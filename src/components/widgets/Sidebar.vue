<template>
  <div class="flex flex-wrap content-center z-50" >
    <!-- Start transaction of the apps -->
        <!-- Apps -->
        <Transition  name="slide-fade" >
          <div v-if="true" class="fixed top-10 bottom-0 left-0 w-40 z-40 flex flex-wrap content-start bg-opacity-95 shadow-md">
              <!-- Search -->
              <!-- <div class='absolute top-0 left-0 right-0 flex flex-wrap content-center w-2/5 py-4 m-auto md:w-2/5 xl:w-1/5 lg:w-1/5 ' >
                  <n-input 
                    suffix="ios-search" 
                    placeholder="Search ..." 
                    clearable 
                    v-model:value="search" 
                    @keyup="filterApps()"  
                  >
                    <template #prefix>
                      <svg class="w-4 h-4 text-gray-400 " 
                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29zM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9z" fill="currentColor"></path></svg>
                    </template>
                  </n-input>
              </div> -->
              <!-- End search -->
              <!-- Apps -->
              <div class="sidebar bg-blue-800 ">
                <div v-for="(app, index) in matchedApps" :key="index" class="sidebar-item">
                  <div class='item-content ' @click="toggleAppFunc(app.url);$router.push(app.url)"  >
                    <div class="item-icon " v-html="app.svg" ></div>
                    <div class="item-label font-btb text-xs " v-html="app.name" ></div>
                    <svg class="absolute right-2 h-4 w-2 mt-1  text-gray-500 " 
                    v-if="app.children != undefined && app.children.length > 0"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31a.996.996 0 0 0 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z" fill="currentColor"></path></svg>
                  </div>
                  <!-- children -->
                  <div class="sidebar-children" >
                    <div class="sidebar-children-item" 
                      v-for="(childApp , cIndex ) in app.children" :key="cIndex" >
                      <div class='child-item-content ' @click="toggleAppFunc(app.url);$router.push(childApp.url)"  >
                        <div class="child-item-icon " v-html="childApp.svg" ></div>
                        <div class="child-item-label font-btb text-xs " v-html="childApp.name" ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div @click="logout()" class="sidebar-item">
                  <div class='item-content ' >
                    <div class="item-icon " >
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10.5 2.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0v-6zM13.743 4a.5.5 0 1 0-.499.867a6.5 6.5 0 1 1-6.494.004a.5.5 0 1 0-.5-.866A7.5 7.5 0 1 0 13.743 4z" fill="currentColor"></path></g></svg>
                    </div>
                    <div class="item-label font-btb text-xs " >ចេញ</div>
                  </div>
                </div>
                <!-- <div class="py-4 px-8 duration-300 transform hover:scale-110 text-center p-2 m-4  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg">
                    <div @click="logout()" class='w-full dashboard-widget-link' >
                      <div class="text-gray-100 w-16 mx-auto my-2 " >
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10.5 2.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0v-6zM13.743 4a.5.5 0 1 0-.499.867a6.5 6.5 0 1 1-6.494.004a.5.5 0 1 0-.5-.866A7.5 7.5 0 1 0 13.743 4z" fill="currentColor"></path></g></svg>
                      </div>
                      <div class="font-pvh p-2 m-auto text-xs text-center text-gray-100" >ចេញ</div>
                    </div>
                </div> -->
              </div>
              <!-- End apps -->
              <!-- Apps launcher -->
              <!-- <div class='fixed -bottom-14 h-14 left-0 right-0 z-50 flex flex-wrap justify-center w-full py-4' >
                <div class="w-12 h-12 p-1 -mt-20 mx-auto text-center bg-white rounded-full shadow-md border border-gray-300 cursor-pointer duration-300 transform hover:scale-110" >
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z" fill="currentColor"></path></svg>
                </div>
                <div v-if="!showLuncher" @click="toggleAppFunc()" class="w-14 h-14 p-2 -mt-20 mx-2 ml-8 text-center bg-white rounded-full shadow-md border border-gray-300 cursor-pointer " >
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><rect x="64" y="64" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="216" y="64" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="368" y="64" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="64" y="216" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="216" y="216" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="368" y="216" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="64" y="368" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="216" y="368" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="368" y="368" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect></svg>
                </div>
                <div v-if="!showLuncher" @click="logout()" class="w-14 h-14 p-2 -mt-20 mx-2 ml-8 text-center text-red-600 bg-white rounded-full shadow-md border border-gray-300 cursor-pointer " >
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10.5 2.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0v-6zM13.743 4a.5.5 0 1 0-.499.867a6.5 6.5 0 1 1-6.494.004a.5.5 0 1 0-.5-.866A7.5 7.5 0 1 0 13.743 4z" fill="currentColor"></path></g></svg>
                </div>
              </div> -->
          </div>
        </Transition>
        <!-- <Transition  name="slide-fade" >
          <div v-if="!toggleApps" @click="toggleAppFunc()" class="absolute left-0 top-12 p-2 w-8 bg-gray-600 text-white shadow-sm rounded-tr-md rounded-br-md cursor-pointer " >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></g></svg>
          </div>
        </Transition>
        <Transition  name="slide-fade" >
          <div v-if="toggleApps" @click="toggleAppFunc()" class="absolute left-40 top-12 p-2 w-8 bg-blue-600 text-white shadow-sm rounded-tr-md rounded-br-md cursor-pointer " >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><path d="M9 4v16"></path><path d="M15 10l-2 2l2 2"></path></g></svg>
          </div>
        </Transition> -->
    <!-- End transaction of the apps -->
  </div>
</template>

<script>
import { reactive, ref , computed, onMounted } from 'vue'
import { isAuth, authLogout , isAdmin , getUser } from '../../plugins/authentication'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useDialog , useMessage } from 'naive-ui'
export default {  
  components: {
  } ,
  name: 'dock' ,
  props: {
    show : false ,
    showLuncher: false ,
    close: {
      type: Function
    } ,
  },
  setup(props){
    
    let search = ref(null)
    let apps = ref([
      {
          url: '/dashboard' ,
          icon: 'SpeedometerOutline' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M326.1 231.9l-47.5 75.5a31 31 0 0 1-7 7a30.11 30.11 0 0 1-35-49l75.5-47.5a10.23 10.23 0 0 1 11.7 0a10.06 10.06 0 0 1 2.3 14z" fill="currentColor"></path><path d="M256 64C132.3 64 32 164.2 32 287.9a223.18 223.18 0 0 0 56.3 148.5c1.1 1.2 2.1 2.4 3.2 3.5a25.19 25.19 0 0 0 37.1-.1a173.13 173.13 0 0 1 254.8 0a25.19 25.19 0 0 0 37.1.1l3.2-3.5A223.18 223.18 0 0 0 480 287.9C480 164.2 379.7 64 256 64z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 128v32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M416 288h-32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M128 288H96"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M165.49 197.49l-22.63-22.63"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M346.51 197.49l22.63-22.63"></path></svg>' ,
          name: 'សង្ខេបព័ត៌មាន',
          roles: [
            1, // Super
            2, // Administrator
            3, // backend
          ]
      },
      {
        url: '/attendance' ,
        icon: 'CoPresentOutlined' ,
        svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8h14v2H16z" fill="currentColor"></path><path d="M6 10.59L3.41 8L2 9.41l4 4l8-8L12.59 4L6 10.59z" fill="currentColor"></path><path d="M16 22h14v2H16z" fill="currentColor"></path><path d="M6 24.59L3.41 22L2 23.41l4 4l8-8L12.59 18L6 24.59z" fill="currentColor"></path></svg>' ,
        name: 'វត្តមាន',
        roles: [
          1, // Super
          2, // Administrator
          // 3, // backend
        ]
      },
      {
        url: '/officer' ,
        icon: 'ContactCard32Regular' ,
        svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><g fill="none"><path d="M18 13a1 1 0 0 1 1-1h6a1 1 0 0 1 0 2h-6a1 1 0 0 1-1-1zm1 4a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2h-6zm-6-4a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm-6 4.5A1.5 1.5 0 0 1 8.5 16h5a1.5 1.5 0 0 1 1.5 1.5s0 3.5-4 3.5s-4-3.5-4-3.5zM2 7.25A3.25 3.25 0 0 1 5.25 4h21.5A3.25 3.25 0 0 1 30 7.25v17.5A3.25 3.25 0 0 1 26.75 28H5.25A3.25 3.25 0 0 1 2 24.75V7.25zM5.25 6C4.56 6 4 6.56 4 7.25v17.5c0 .69.56 1.25 1.25 1.25h21.5c.69 0 1.25-.56 1.25-1.25V7.25C28 6.56 27.44 6 26.75 6H5.25z" fill="currentColor"></path></g></svg>' ,
        name: 'បុគ្គលិក',
        roles: [
          1, // Super
          2, // Administrator
          // 3, // backend
        ]
      },
      {
        url: '/usersalaryadjustment' ,
        icon: 'Organization20Regular' ,
        svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M10.5 7a3 3 0 1 0 0 6a3 3 0 0 0 0-6zM9 10a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0zM2 6.25A2.25 2.25 0 0 1 4.25 4h12.5A2.25 2.25 0 0 1 19 6.25V11h-1.5V8.5h-.75a2.25 2.25 0 0 1-2.25-2.25V5.5h-8v.75A2.25 2.25 0 0 1 4.25 8.5H3.5v3h.75a2.25 2.25 0 0 1 2.25 2.25v.75H14V16H4.25A2.25 2.25 0 0 1 2 13.75v-7.5zm2.25-.75a.75.75 0 0 0-.75.75V7h.75A.75.75 0 0 0 5 6.25V5.5h-.75zM17.5 7v-.75a.75.75 0 0 0-.75-.75H16v.75c0 .414.336.75.75.75h.75zm-14 6.75c0 .414.336.75.75.75H5v-.75a.75.75 0 0 0-.75-.75H3.5v.75zm.901 3.75H14V19H7c-1.11 0-2.08-.603-2.599-1.5zM22 11V9c0-1.11-.603-2.08-1.5-2.599V11H22zm-5.5 1a1.5 1.5 0 0 0-1.5 1.5v8a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.5-1.5v-8a1.5 1.5 0 0 0-1.5-1.5h-5zm.5 4.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm3 0h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm-3 2h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm3 0h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm-3 2h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm3 0h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zM16.5 14a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1z" fill="currentColor"></path></g></svg>' ,
        name: 'គោលការណ៍ប្រាក់ខែ',
        roles: [
          1, // Super
          2, // Administrator
          3, // backend
        ]
      },
      {
        url: '/salary' ,
        icon: 'MoneyHand20Regular' ,
        svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5V15a.5.5 0 0 0-.5-.5c-.413 0-.677-.102-.856-.236c-.183-.137-.322-.342-.424-.623c-.214-.588-.22-1.367-.22-2.141a.5.5 0 0 0-.147-.354l-.286-.287l-1.213-1.213c-.467-.467-.604-.78-.63-.955c-.02-.14.022-.234.122-.33c.214-.205.367-.344.54-.386c.103-.026.338-.044.76.378l3 3a.5.5 0 0 0 .708-.707L13 9.793V6.707l2.56 2.56a1.5 1.5 0 0 1 .44 1.061V17.5a.5.5 0 0 0 1 0v-7.172a2.5 2.5 0 0 0-.732-1.767L13 5.293V3.5A1.5 1.5 0 0 0 11.5 2h-7zM12 5.5v3.293l-1.146-1.147c-.579-.578-1.154-.777-1.705-.643a1.517 1.517 0 0 0-.313.115A3.001 3.001 0 0 0 5 10a3 3 0 0 0 5.007 2.23c.017.578.075 1.21.273 1.753c.148.407.384.796.764 1.08l.006.006A1.5 1.5 0 0 0 10 16.5v.5H6v-.5A1.5 1.5 0 0 0 4.5 15H4V5h.5A1.5 1.5 0 0 0 6 3.5V3h4v.5A1.5 1.5 0 0 0 11.5 5h.5v.5zm0 11v.009a.5.5 0 0 1-.5.491H11v-.5a.5.5 0 0 1 .5-.5h.5v.5zM6 10a2 2 0 0 1 1.874-1.996c-.124.23-.187.51-.139.833c.071.482.378.983.911 1.516l.907.907A2 2 0 0 1 6 10zM5 3v.5a.5.5 0 0 1-.5.5H4v-.5a.5.5 0 0 1 .5-.5H5zM4 16h.5a.5.5 0 0 1 .5.5v.5h-.5a.5.5 0 0 1-.5-.5V16zm8-12h-.5a.5.5 0 0 1-.5-.5V3h.5a.5.5 0 0 1 .5.5V4z" fill="currentColor"></path></g></svg>' ,
        name: 'ប្រាក់បៀវដ្ត',
        roles: [
          1, // Super
          2, // Administrator
          3, // backend
        ]
      },
      {
          url: '/setting' ,
          icon: 'Settings20Regular' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M1.91 7.383a8.491 8.491 0 0 1 1.78-3.08a.5.5 0 0 1 .54-.135l1.918.686a1 1 0 0 0 1.32-.762l.366-2.006a.5.5 0 0 1 .388-.4a8.532 8.532 0 0 1 3.555 0a.5.5 0 0 1 .387.4l.367 2.006a1 1 0 0 0 1.32.762l1.918-.686a.5.5 0 0 1 .54.136a8.491 8.491 0 0 1 1.78 3.079a.5.5 0 0 1-.152.535l-1.555 1.32a1 1 0 0 0 0 1.524l1.555 1.32a.5.5 0 0 1 .152.535a8.491 8.491 0 0 1-1.78 3.08a.5.5 0 0 1-.54.135l-1.918-.686a1 1 0 0 0-1.32.762l-.367 2.007a.5.5 0 0 1-.387.399a8.53 8.53 0 0 1-3.555 0a.5.5 0 0 1-.388-.4l-.365-2.006a1 1 0 0 0-1.32-.762l-1.919.686a.5.5 0 0 1-.54-.136a8.49 8.49 0 0 1-1.78-3.079a.5.5 0 0 1 .153-.535l1.554-1.32a1 1 0 0 0 0-1.524l-1.554-1.32a.5.5 0 0 1-.153-.535zm1.061-.006l1.294 1.098a2 2 0 0 1 0 3.05L2.97 12.623c.292.782.714 1.51 1.245 2.152l1.596-.57a2 2 0 0 1 2.64 1.525l.305 1.668a7.556 7.556 0 0 0 2.485 0l.305-1.67a1.998 1.998 0 0 1 2.64-1.524l1.597.571a7.492 7.492 0 0 0 1.245-2.152l-1.294-1.098a1.998 1.998 0 0 1 0-3.05l1.294-1.098a7.491 7.491 0 0 0-1.245-2.152l-1.596.57a2 2 0 0 1-2.64-1.524l-.306-1.669a7.555 7.555 0 0 0-2.485 0l-.304 1.669a2 2 0 0 1-2.641 1.525l-1.596-.571a7.491 7.491 0 0 0-1.245 2.152zM7.5 10a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0zm1 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 0 0-3 0z" fill="currentColor"></path></g></svg>' ,
          name: 'ការកំណត់',
          roles: [
            1, // Super
            2, // Administrator
            // 3, // backend
          ]
          , children: [
            {
              url: '/profile' ,
              icon: 'UserAvatar' ,
              svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3z" fill="currentColor"></path><path d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.899 11.899 0 0 1-12 0zm13.992-1.451A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z" fill="currentColor"></path></svg>' ,
              name: 'ព័ត៌មានផ្ទាល់ខ្លួន',
              roles: [
                // 1, // Super
                2, // Administrator
                3, // backend
              ]
            },
            {
              url: '/user' ,
              icon: 'SupervisedUserCircleOutlined' ,
              svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M12.5 10c0-1.65-1.35-3-3-3s-3 1.35-3 3s1.35 3 3 3s3-1.35 3-3zm-3 1c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1zm6.5 2c1.11 0 2-.89 2-2c0-1.11-.89-2-2-2c-1.11 0-2.01.89-2 2c0 1.11.89 2 2 2zM11.99 2.01c-5.52 0-10 4.48-10 10s4.48 10 10 10s10-4.48 10-10s-4.48-10-10-10zM5.84 17.12c.68-.54 2.27-1.11 3.66-1.11c.07 0 .15.01.23.01c.24-.64.67-1.29 1.3-1.86A9.05 9.05 0 0 0 9.5 14c-1.3 0-3.39.45-4.73 1.43c-.5-1.04-.78-2.2-.78-3.43c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.2-.27 2.34-.75 3.37c-1-.59-2.36-.87-3.24-.87c-1.52 0-4.5.81-4.5 2.7v2.78a7.935 7.935 0 0 1-5.66-2.86z" fill="currentColor"></path></svg>' ,
              name: 'គណនី',
              roles: [
                1, // Super
                2, // Administrator
                // 3, // backend
              ]
            },
            {
              url: '/position' ,
              icon: 'Organization20Regular' ,
              svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M28.07 21L22 15l6.07-6l1.43 1.41L24.86 15l4.64 4.59L28.07 21z" fill="currentColor"></path><path d="M22 30h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7z" fill="currentColor"></path><path d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7z" fill="currentColor"></path></svg>' ,
              name: 'តួនាទី',
              roles: [
                1, // Super
                2, // Administrator
                // 3, // backend
              ]
            },
            {
              url: '/organization' ,
              icon: 'Organization20Regular' ,
              svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M9 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H10v1a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2h1v-1a5.002 5.002 0 0 1 4-4.9V2.5zm7 9.5h-1.5a.5.5 0 0 1-.5-.5V10a4 4 0 0 0-8 0v1.5a.5.5 0 0 1-.5.5H4a1 1 0 0 0-1 1v4h5v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h5v-4a1 1 0 0 0-1-1zM6 13.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zm9 0a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM8.5 9a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zm3.5.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM9 17h2v-2H9v2z" fill="currentColor"></path></g></svg>' ,
              name: 'ផ្នែក',
              roles: [
                1, // Super
                2, // Administrator
                // 3, // backend
              ]
            },
            {
              url: '/holiday' ,
              icon: 'Organization20Regular' ,
              svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><rect fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" x="48" y="80" width="416" height="384" rx="48"></rect><circle cx="296" cy="232" r="24" fill="currentColor"></circle><circle cx="376" cy="232" r="24" fill="currentColor"></circle><circle cx="296" cy="312" r="24" fill="currentColor"></circle><circle cx="376" cy="312" r="24" fill="currentColor"></circle><circle cx="136" cy="312" r="24" fill="currentColor"></circle><circle cx="216" cy="312" r="24" fill="currentColor"></circle><circle cx="136" cy="392" r="24" fill="currentColor"></circle><circle cx="216" cy="392" r="24" fill="currentColor"></circle><circle cx="296" cy="392" r="24" fill="currentColor"></circle><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" stroke-linecap="round" d="M128 48v32"></path><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" stroke-linecap="round" d="M384 48v32"></path><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" d="M464 160H48"></path></svg>' ,
              name: 'ថ្ងៃឈប់សម្រាកប្រចាំឆ្នាំ',
              roles: [
                1, // Super
                2, // Administrator
                // 3, // backend
              ]
            },
            {
              url: '/salarypolicy' ,
              icon: 'Organization20Regular' ,
              svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M10.5 7a3 3 0 1 0 0 6a3 3 0 0 0 0-6zM9 10a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0zM2 6.25A2.25 2.25 0 0 1 4.25 4h12.5A2.25 2.25 0 0 1 19 6.25V11h-1.5V8.5h-.75a2.25 2.25 0 0 1-2.25-2.25V5.5h-8v.75A2.25 2.25 0 0 1 4.25 8.5H3.5v3h.75a2.25 2.25 0 0 1 2.25 2.25v.75H14V16H4.25A2.25 2.25 0 0 1 2 13.75v-7.5zm2.25-.75a.75.75 0 0 0-.75.75V7h.75A.75.75 0 0 0 5 6.25V5.5h-.75zM17.5 7v-.75a.75.75 0 0 0-.75-.75H16v.75c0 .414.336.75.75.75h.75zm-14 6.75c0 .414.336.75.75.75H5v-.75a.75.75 0 0 0-.75-.75H3.5v.75zm.901 3.75H14V19H7c-1.11 0-2.08-.603-2.599-1.5zM22 11V9c0-1.11-.603-2.08-1.5-2.599V11H22zm-5.5 1a1.5 1.5 0 0 0-1.5 1.5v8a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.5-1.5v-8a1.5 1.5 0 0 0-1.5-1.5h-5zm.5 4.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm3 0h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm-3 2h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm3 0h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm-3 2h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm3 0h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zM16.5 14a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1z" fill="currentColor"></path></g></svg>' ,
              name: 'កំណត់គោលការណ៍ប្រាក់ខែ',
              roles: [
                1, // Super
                2, // Administrator
                3, // backend
              ]
            },
            {
              url: '/generalsetting' ,
              icon: 'CalendarSettings16Regular' ,
              svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M14 4.5A2.5 2.5 0 0 0 11.5 2h-7A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h1.757a5.507 5.507 0 0 1-.657-1H4.5A1.5 1.5 0 0 1 3 11.5V6h4.337c.895-.63 1.986-1 3.163-1c1.33 0 2.55.472 3.5 1.257V4.5zm-3.5.5H3v-.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5V5h-2.5zM6.635 9.92a2 2 0 0 0 1.43-2.478l-.155-.557c.254-.195.529-.362.821-.497l.338.358a2 2 0 0 0 2.91.001l.324-.343c.298.14.578.314.835.518l-.126.422a2 2 0 0 0 1.456 2.519l.349.082a4.698 4.698 0 0 1 .01 1.017l-.46.118a2 2 0 0 0-1.431 2.478l.156.556c-.254.196-.53.363-.822.498l-.338-.358a2 2 0 0 0-2.909-.002l-.325.345a4.322 4.322 0 0 1-.835-.518l.127-.423a2 2 0 0 0-1.456-2.519l-.35-.083a4.702 4.702 0 0 1-.01-1.016l.461-.118zm4.865.58a1 1 0 1 0-2 0a1 1 0 0 0 2 0z" fill="currentColor"></path></g></svg>' ,
              name: 'កំណត់ទូទៅ',
              roles: [
                1, // Super
                2, // Administrator
                3, // backend
              ]
            },
            // {
            //   url: '/Attendancepolicy' ,
            //   icon: 'Door' ,
            //   svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 12v.01"></path><path d="M3 21h18"></path><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"></path></g></svg>' ,
            //   name: 'គោលការណ៍វត្តមាន',
            //   roles: [
            //     1, // Super
            //     2, // Administrator
            //     3, // backend
            //   ]
            // },
          ]
      },
    ])
    /** End app metadata */
    let toggleApps = ref(false)
    let user = reactive({})

    let matchedApps = ref([])
    function filterApps(){
      matchedApps.value = []
      /**
       * Filter the apps base on the search string
       */
      matchedApps.value = ( search.value != null && search.value.trim() != '' ) 
      ? apps.value.filter( app => app.name.indexOf( search.value ) != -1 )
      : apps.value
      /**
       * Filter the apps base on the user role
       */
      let userRoleIds = ( getUser() != null && getUser().roles != undefined && Array.isArray( getUser().roles ) ) ? getUser().roles.map(r=>r.id) : false
      
      /**
       * Error getting user role
       */
      matchedApps.value = matchedApps.value.filter( 
        app => app.roles.find( 
          role => userRoleIds.includes(role)
        ) 
      )
    }
    
    function toggleAppFunc(url){
      // if( url == route.path ) props.close()
      toggleApps.value = !toggleApps.value
      props.close()
    }

    function logoutConfirmation(){
        console.log( "confirm before logout" )
    }

    const dialog = useDialog();
    const message = useMessage();
    const store = useStore();
    const router = useRouter()
    const route = useRoute()

    async function logout(){
      const d = dialog.warning({
        title: 'ចាកចេញ',
        content: 'តើអ្នកចង់ចាកចេញមែនទេ?',
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          /**
           * Check whether the user has logged out already
           */
          if( isAuth() ) {
            /**
             * Show confirm dialog
             */
            d.loading = true
            store.dispatch('auth/logout').then( res => {
              message.success("អ្នកបានចាកចេញដោយជោគជ័យ។")
              d.loading = false
            }).catch( err => {
              console.log( err )
            })
            authLogout()
            window.location.href = '/'
          }else{
            window.location.href = '/login'
          }
        },
        // onNegativeClick: () => {
        //   message.error('Not Sure')
        // }
      })
    }
    function isAdminAccount(){
      return isAdmin()
    }

    filterApps()

    return {
      logout ,
      search ,
      matchedApps ,
      apps ,
      toggleApps ,
      user ,
      filterApps ,
      toggleAppFunc ,
      logoutConfirmation ,
      isAdminAccount 
    }
  }
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

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

/**
Parent Menu
 */
.sidebar {
  @apply flex flex-wrap;
}
.sidebar .sidebar-item {
  @apply relative bg-gray-50 w-full border-b border-gray-200 cursor-pointer  ;
}
.sidebar .sidebar-item:hover {
  @apply border-b  border-blue-500 bg-blue-50 duration-300;
}
.sidebar .sidebar-item:hover .sidebar-children {
  display: block;
  @apply transform-gpu duration-300;
}
.sidebar .sidebar-item:hover .item-icon , .sidebar .sidebar-item:hover .item-label {
  @apply text-blue-600 duration-300 ;
}
.item-content {
  @apply w-full flex h-10 p-2 ;
}
.item-icon {
  @apply text-gray-600 w-5 flex-none h-5 ;
}
.item-label {
  @apply h-6 text-left text-gray-900 flex-grow leading-6 pl-2  ;
}
/**
Child
*/
.sidebar-children {
  display: none;
  @apply absolute left-40 top-0 w-40 bg-gray-50 shadow-sm;
}
.sidebar-children-item {
  @apply border-b border-gray-200 cursor-pointer ;
}
.sidebar-children-item:hover {
  @apply border-b border-blue-500 bg-blue-50 duration-300;
}

.child-item-content {
  @apply w-full flex h-10 border-gray-200 p-2 ;
}
.child-item-content:hover .child-item-icon , .child-item-content:hover .child-item-label {
  @apply text-blue-600 duration-300 ;
}
.child-item-icon {
  @apply text-gray-600 w-5 flex-none h-5 ;
}
.child-item-label {
  @apply h-6 text-left text-gray-900 flex-grow leading-6 pl-2  ;
}
</style>