// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import router from 'vue-router'
// import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import axios from 'axios';
// import api from '../service/api';

Vue.config.productionTip = false
Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
//生产
Vue.prototype.baseUrl = process.env.NODE_ENV === "production" ? "http://localhost:8800" : "/api";


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  components: { App },
  template: '<App/>'
})
