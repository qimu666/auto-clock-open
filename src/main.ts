import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import '@vant/touch-emulator';
import './style.css'
import Vant, {Toast} from 'vant'
import 'vant/lib/index.css';
import baiduMap from 'vue3-baidu-map-gl'
import 'vant/es/toast/style';
import 'vant/es/notify/style'
import { TimePicker } from 'vant';

const app = createApp(App);
app.use(Vant)
app.use(Toast);
app.use(TimePicker);
app.use(baiduMap, {
    ak: 'AhWUzunRTGe2Q8NKrse63W21iinsUmha',
    plugins: ['TrackAnimation']
})
app.use(router);
app.mount('#app')
