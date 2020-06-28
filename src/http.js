import axios from 'axios'
import { Message, Loading } from 'element-ui';
import router from './router'

let loading;
function  startLoading() {
    loading=Loading.service({
        lock:true,
        text:'拼命加载中...',
        background:'rbg(0,5,0)'
    })
}
function  endLoading() {
   loading.close();
}
axios.interceptors.request.use(config=>{
    startLoading();
    if (localStorage.loginToken) {
        config.headers.Authorization = localStorage.loginToken;
    }
    return config;
},error=>{
    return Promise.reject(erro);
});
axios.interceptors.response.use(response=>{
    endLoading();
    return response;
},error=>{
    endLoading();
    Message.error(error.response.data);
    //
    const { status } =error.response;
    if (status==401) {
        Message.error("登陆过期,请重新登陆!");
        localStorage.removeItem('loginToken');
        router.push('/login');
    }
    return Promise.reject(error);
})
export default axios