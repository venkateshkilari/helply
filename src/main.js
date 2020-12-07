import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import BootstrapVue from "bootstrap-vue";
import VeeValidate from "vee-validate";
import {StorePlugin,ComponentsPlugin} from './plugins'
Vue.use(BootstrapVue);
Vue.use(StorePlugin);
Vue.use(ComponentsPlugin);
Vue.use(VeeValidate);
Vue.config.productionTip = false;
Vue.config.devtools = true;


new Vue({

  router,
  store,

  render: h => h(App)
}).$mount('#app')
