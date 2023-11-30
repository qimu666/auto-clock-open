import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import '@vant/touch-emulator';
import './style.css'
import Vant from 'vant'
import 'vant/lib/index.css';
import 'vant/es/toast/style';
import 'vant/es/notify/style'
import '../src/plugins/myAxios'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App);
app.use(Vant)
app.use(pinia)
app.use(router);
app.mount('#app')
