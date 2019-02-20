import Vue from 'vue';
import App from './App';
import router from './router.js';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

let vm = new Vue({
  el: '#app',
  router: router,
  components: {App},
  template: '<App></App>'
});

window.vueVm = vm;
