<template >
    <Transition name="slide-fade" >
        <div v-if="toggleDashboardWidgets" >
            <div class="border-gray-200 border-b w-full h-10 font-pvh text-sm leading-10" >សង្ខេបព័ត៌មាន</div>
            <div class="flex flex-wrap justify-center p-4 text-md">
                <!-- <div v-if="isBackendManagement()" @click="$router.push('/contract')" class="widget-thumbnail-tln hover:scale-105 transform-gpu duration-300">
                    <svg class="m-auto mb-4 h-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 384 512"><path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM64 72c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8V72zm0 64c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16zm192.81 248H304c8.84 0 16 7.16 16 16s-7.16 16-16 16h-47.19c-16.45 0-31.27-9.14-38.64-23.86c-2.95-5.92-8.09-6.52-10.17-6.52s-7.22.59-10.02 6.19l-7.67 15.34a15.986 15.986 0 0 1-14.31 8.84c-.38 0-.75-.02-1.14-.05c-6.45-.45-12-4.75-14.03-10.89L144 354.59l-10.61 31.88c-5.89 17.66-22.38 29.53-41 29.53H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h12.39c4.83 0 9.11-3.08 10.64-7.66l18.19-54.64c3.3-9.81 12.44-16.41 22.78-16.41s19.48 6.59 22.77 16.41l13.88 41.64c19.77-16.19 54.05-9.7 66 14.16c2.02 4.06 5.96 6.5 10.16 6.5zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z" fill="currentColor"></path></svg>
                    <div class="m-auto mb-2 font-pvh">កិច្ចសន្យា</div>
                    <div class="m-auto mb-2 font-bold text-blue-600" v-html=" $toKhmer( totalContracts )" ></div>
                </div>
                <div v-if="isBackendManagement()" @click="$router.push('/room')" class="widget-thumbnail-tln hover:scale-105 transform-gpu duration-300">
                    <svg class="m-auto mb-4 h-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 12v.01"></path><path d="M3 21h18"></path><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"></path></g></svg>
                    <div class="m-auto mb-2 font-pvh">អាផាមិន</div>
                    <div class="m-auto mb-2 font-bold text-blue-600" v-html=" $toKhmer( totalRooms )" ></div>
                </div> -->
                <div v-if="isBackendManagement()" @click="$router.push('/officer')" class="widget-thumbnail-tln hover:scale-105 transform-gpu duration-300">
                    <svg class="m-auto mb-4 h-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><g fill="none"><path d="M18 13a1 1 0 0 1 1-1h6a1 1 0 0 1 0 2h-6a1 1 0 0 1-1-1zm1 4a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2h-6zm-6-4a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm-6 4.5A1.5 1.5 0 0 1 8.5 16h5a1.5 1.5 0 0 1 1.5 1.5s0 3.5-4 3.5s-4-3.5-4-3.5zM2 7.25A3.25 3.25 0 0 1 5.25 4h21.5A3.25 3.25 0 0 1 30 7.25v17.5A3.25 3.25 0 0 1 26.75 28H5.25A3.25 3.25 0 0 1 2 24.75V7.25zM5.25 6C4.56 6 4 6.56 4 7.25v17.5c0 .69.56 1.25 1.25 1.25h21.5c.69 0 1.25-.56 1.25-1.25V7.25C28 6.56 27.44 6 26.75 6H5.25z" fill="currentColor"></path></g></svg>
                    <div class="m-auto mb-2 font-pvh">បុគ្គលិក</div>
                    <div class="m-auto mb-2 font-bold text-blue-600" v-html=" $toKhmer( totalStaffs )" ></div>
                </div>
            </div>
        </div>
    </Transition>
</template>
<script >
import { useDialog, useMessage, useNotification } from 'naive-ui'
import { ref , reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { authLogout, isAdmin , isSuper } from './../../plugins/authentication'


export default {
    name: 'Dashboard',
    components: {
    },
    name: 'dashboard' ,
    setup() {
        const router = useRouter()
        const store = useStore()
        const dialog = useDialog()
        const message = useMessage()
        const notify = useNotification()

        const toggleDashboardWidgets = ref(false)
        onMounted( () => {
            toggleDashboardWidgets.value = true
        })

        function isBackendManagement(){
            return isAdmin() || isSuper()
        }

        const totalStaffs = ref(0)
        function getStaffs(){
            store.dispatch( 'officer/list',{
                search: '' ,
                page: 1 , 
                perPage: 10
            } ).then( res => {
                console.log( res.data.pagination )
                totalStaffs.value = res.data.pagination.totalRecords 
            }).catch( err => {
                console.log( err )
            })
        }

        const totalContracts = ref(0)
        function getContracts(){
            store.dispatch( 'contract/list',{
                search: '' ,
                page: 1 , 
                perPage: 10
            } ).then( res => {
                console.log( res.data.pagination )
                totalContracts.value = res.data.pagination.totalRecords 
            }).catch( err => {
                console.log( err )
            })
        }

        const totalRooms = ref(0)
        function getRooms(){
            store.dispatch( 'room/list',{
                search: '' ,
                page: 1 , 
                perPage: 10
            } ).then( res => {
                console.log( res.data.pagination )
                totalRooms.value = res.data.pagination.totalRecords 
            }).catch( err => {
                console.log( err )
            })
        }

        getStaffs()
        getRooms()
        getContracts()
        

        /**
         * Initial
         */
        function initial(){

        }

        return {
            toggleDashboardWidgets ,
            isBackendManagement ,
            totalStaffs ,
            totalContracts ,
            totalRooms
        }
    }
}
</script>
<style scoped>
    .widget-thumbnail-tln {
        @apply bg-white hover:bg-yellow-50  hover:border-yellow-400 hover:shadow m-4 px-8 py-4 border rounded duration-500 cursor-pointer ;
    }
</style>