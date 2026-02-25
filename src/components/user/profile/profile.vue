<template>
  <div class="w-full relative flex flex-wrap" >
    <Transition name="fade" >
      <div v-if="user!=null && visibleHelper == true " class="w-full">
        <div class="profileInformation p-8 sm:w-2/3 md:w-3/5 lg:w-2/5 w-4/5 mx-auto border my-8 relative bg-white rounded ">
          <div class="profileImage border rounded-full border-gray-200 p-2 w-40 h-40 flex-none mx-auto overflow-hidden bg-center bg-no-repeat bg-80% bg-white bg-cover" :style=" 'background-image: url(' + localProfile +');' " ></div>
          <div class="uploader absolute right-0 top-0 w-24flex" >
            <input type="file" placeholder="ឯកសារយោង" @change="fileChange" class="hidden " id="referenceDocument" />
            <div class="cursor-pointer hover:border-green-500 flex flex-wrap"  >
              <n-tooltip trigger="hover">
                <template #trigger>
                  <svg class="changeProfile p-2 m-1 border rounded-full w-10 h-10 border-gray-300" @click="clickUpload" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M350.54 148.68l-26.62-42.06C318.31 100.08 310.62 96 302 96h-92c-8.62 0-16.31 4.08-21.92 10.62l-26.62 42.06C155.85 155.23 148.62 160 140 160H80a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h352a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32h-59c-8.65 0-16.85-4.77-22.46-11.32z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><circle cx="256" cy="272" r="80" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></circle><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M124 158v-22h-24v22"></path></svg>    
                </template>ប្ដូររូបភាពគណនី
              </n-tooltip>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <svg class="saveProfile p-2 m-1 border rounded-full w-10 h-10 border-gray-300" @click="uploadFiles" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-.95A5.469 5.469 0 0 1 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5l1.53.11A2.98 2.98 0 0 1 22 15c0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z" fill="currentColor"></path></svg>
                </template>រក្សារទុករូបភាពថ្មី
              </n-tooltip>
            </div>
          </div>
          <div class="my-12">
            <n-form
            ref="formRef"
            label-placement="left"
            :model="user"
            label-width="120"
            >
              <n-form-item-row label="ឈ្មោះគណនី" >
                <n-input placeholder="ឈ្មោះគណនី" class="text-left" v-model:value="user.username" />
              </n-form-item-row>
              <n-form-item-row label="គោត្តនាម" >
                <n-input placeholder="គោត្តនាម" class="text-left" v-model:value="user.lastname" />
              </n-form-item-row>
              <n-form-item-row label="នាម">
                <n-input placeholder="នាម" class="text-left" v-model:value="user.firstname" />
              </n-form-item-row>
              <n-form-item-row label="ទូរស័ព្ទ">
                <n-input placeholder="ទូរស័ព្ទ" class="text-left" v-model:value="user.phone" />
              </n-form-item-row>
              <n-form-item-row label="អ៊ីមែល" >
                <n-input placeholder="អ៊ីមែល" class="text-left" disabled v-model:value="user.email" />
              </n-form-item-row>
            </n-form>
            <!-- <n-button type="default" class="mx-8 w-32 my-1" @click="$router.push('/welcome')" >បកក្រោយ</n-button> -->
            <n-button type="primary" secondary class="mx-8 w-32 my-1" @click="save()" >រក្សារទុក</n-button>
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
import ocmLogoUrl from './../../../assets/logo.jpg'

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
      const base64Avatar = ref(null)
      const selectedFileType = ref('')
      const visibleHelper = ref(false)
      
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
        name: "UserProfile" ,
        title: "ព័ត៌មានអំពីគណនី"
      })
      
      function save(){
        store.dispatch('user/updateAuth',{
          lastname: user.value.lastname ,
          firstname: user.value.firstname ,
          phone: user.value.phone ,
          username: user.value.username
        }).then( res => {
          notify.success({
            title: 'រក្សារទុករួចរាល់។' ,
            content: res.data.message ,
            duration: 1000
          })
          let tmpUser = getUser()
          tmpUser.lastname = res.data.user.lastname
          tmpUser.firstname = res.data.user.firstname
          tmpUser.phone = res.data.user.phone
          tmpUser.username = res.data.user.username
          localStorage.setItem( 'user' , JSON.stringify( tmpUser ) )
          user.value = getUser()
        }).catch( err => {
          console.log( err )
        })
      }

      function logout(){
        if( isAuth() ){
          authLogout()
        }
        router.push('/')
      }

      const files = ref([])
      /**
       * File upload
       */
      /**
       * On change
       */
      function fileChange(event){
        for(const file of event.target.files ){
          // if( index == 'item' || index == 'length' ) continue;

          // allowed types
          let allowed_mime_types = [ 
            /**
             * Image mime type
             */
            'image/jpeg', 'image/png' 
            /**
             * Application file mime type
             */
            // "application/pdf"
            ];
          
          // allowed max size in MB
          let allowed_size_mb = 5;

          // Validate file type
          if(allowed_mime_types.indexOf(file.type) == -1) {
            notify.error({
              title: "ដាក់រូបភាពអ្នកប្រើប្រាស់" ,
              description: "សូមបញ្ចូលឯកសារជាប្រភេទរូបភាព JPG និង PNG។" ,
              duration: 3000
            })
            return;
          }

          selectedFileType.value = file.type 

          // Validate file size
          if(file.size > allowed_size_mb*1024*1024) {
            notify.error({
              title: "ដាក់រូបភាពអ្នកប្រើប្រាស់" ,
              description: "ទំហំនៃរូបភាពគឺ៖ " + (file.size/1024/1024).toFixed(2) + " មេកាបៃ (MB) លើលទំហំដែលកំណត់គឺ ៥ មេកាបៃ។" ,
              duration: 3000
            })
            return;
          }


          let reader = new FileReader();
          reader.onerror = function(e) {
            console.log('On error');
          };
          reader.onprogress = function(e) {
            console.log('On progress');
          };
          reader.onabort = function(e) {
            console.log('On abort');
          };
          reader.onloadstart = function(e) {
            console.log( "On load start" )
          };
          reader.onload = function(e){
            // Ensure that the progress bar displays 100% at the end.
            console.log( 'On load' )
            /**
             * Read binary string from 'e.target.result' and convert to base64
             */
            base64Avatar.value = "data:"+file.type+";base64," + btoa( e.target.result )
            files.value.push( file )
          }
          // // // Read in the image file as base64 type
          // // reader.readAsDataURL(file);
          reader.readAsBinaryString(file)

          // files.value.push( file )
        }
      }
      /**
       * On click file upload
       */
      function clickUpload(){
        document.getElementById('referenceDocument').click()
      }
      function uploadFiles(){
        console.log( files.value )
        if( files.value.length < 0 ) {
          notify.info({
            title: "រក្សារទុករូបភាពគណនី" ,
            content: "សូមជ្រើសរើសរូបភាពជាមុនសិន។" ,
            duration: 3000
          })
          return false
        }
        notify.info({
          title: 'ដាក់រូបភាពអ្នកប្រើប្រាស់' ,
          description: 'កំពុងដាក់រូបភាព។' ,
          duration: 1000
        })

        console.log( files.value )
        let formData = new FormData()
        formData.append('id', user.value.id )
        formData.append('files',files.value[0],files.value[0].name)
        
        store.dispatch('user/uploadProfilePicture', formData ).then( res => {
          notify.success({
            title: 'ដាក់រូបភាពអ្នកប្រើប្រាស់' ,
            description: 'កំពុងរក្សាទុករូបភាព។' ,
            duration: 1000
          })
          if( res.data.record != null && res.data.record != undefined ){
            // let tmpUser = getUser()
            // tmpUser.avatar_url = res.data.record.avatar_url
            // localStorage.setItem( 'user' , JSON.stringify( tmpUser ) )
            // user.value = getUser()
            // base64Avatar.value = user.value.avatar_url
            formData = new FormData()
            files.value = []
          }
        }).catch( err => {
          console.log( err )
          notify.error({
            title: 'ដាក់រូបភាពអ្នកប្រើប្រាស់' ,
            description: 'មានបញ្ហាក្នុងការរក្សារទុករូបភាព។' ,
            duration: 3000
          })
        })
      }
      /**
       * Update local photo
       */
      const localProfile = computed( () => {
        return base64Avatar.value !== "" && base64Avatar.value !== null ? base64Avatar.value : ( user.value.avatar_url !== "" && user.value.avatar_url !== null ? user.value.avatar_url : "/src/assets/logo.jpg" )
      })

      setTimeout( function(){
        visibleHelper.value = true
      } , 300 )

      return {
        user ,
        logout ,
        save ,
        fileChange ,
        uploadFiles,
        clickUpload ,
        localProfile ,
        model ,
        visibleHelper
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