import { createApp } from 'vue'
import App from './App.vue'
import AOS from 'aos'

import 'aos/dist/aos.css'
import './assets/scss/style.scss'

createApp(App).mount('#app');

document.addEventListener('DOMContentLoaded',()=>{
    AOS.init();
});