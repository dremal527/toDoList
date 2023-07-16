import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import UUID from "vue-uuid";

Vue.config.productionTip = false

new Vue({
  store,
  UUID,
  render: h => h(App),
}).$mount('#app')