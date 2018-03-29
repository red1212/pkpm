import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
//引入路由
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
Vue.prototype.$http = axios;
new Vue({
  el: '#app',
  router, //注入到根实例中
  render: h => h(App)
})
