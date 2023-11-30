// Add a request interceptor
import axios from "axios";
import {showFailToast} from "vant";
import router from "../router";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        const {data} = response
        const {code} = data;
        console.log(data.data,'response')
        if (data && code === 0) {
            return response;
        } else {
            switch (code) {
                case 40001:
                case 40100: {
                    showFailToast(data.message)
                    router.push('/login')
                }
                    break;
                default:
                    showFailToast(data.message)
                    break;
            }
        }
        return response;
    },

    function (error) {
        return Promise.reject(error);
    }
)
;

// 拦截响应数据，进行个性化处理
