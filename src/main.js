import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'

import NaiveUI from 'naive-ui'

import store from './store'

import router from './router.js'

import { createApp } from 'vue'

import './style.css'
import App from './App.vue'
import tonumber from './plugins/tonumber.js'
import tokhmer from './plugins/tokhmer.js'


const pinia = createPinia()
const app = createApp(App)

app.config.errorHandler = (err, vm, info) => {
    // handle error
    // `info` is a Vue-specific error info, e.g. which lifecycle hook
    // the error was found in
    console.log( 'App Vue Error Handler' )
    console.log( err )
    console.log( vm )
    console.log( info )
}

window.onerror = function(message, source, lineno, colno, error) {
    // TODO: write any custom logic or logs the error
    console.log( 'Window error : ' )
    console.log( message )
    console.log( source )
    console.log( lineno )
    console.log( colno )
    console.log( error )
};

app.use(pinia)
app.use(store)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios) 
app.use(router)
app.use(NaiveUI)
app.use(tokhmer)
app.use(tonumber)
app.mount('#app')