import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import '@vant/touch-emulator';
import './style.css'
import Vant from 'vant'
import 'vant/lib/index.css';
import 'vant/es/toast/style';
import 'vant/es/notify/style'
import { createPinia } from 'pinia'

const app = createApp(App);
app.use(Vant)
app.use(createPinia())
app.use(router);
app.mount('#app')
