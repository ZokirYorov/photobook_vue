import { createApp } from 'vue';
import './style.css';
import { createPinia } from "pinia";
import router from './router';
import App from './App.vue';
import clickOutside from "@/directives/clickOutside";
import Toast from "vue-toastification";
import 'vue-toastification/dist/index.css';
import axios from "axios";
axios.defaults.baseURL = "";

const pinia = createPinia()
createApp(App)
    .use(router)
    .use(pinia)
    .use(Toast)
    .directive("clickOutside", clickOutside)
    .mount('#app')
