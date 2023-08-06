import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import UUID from "vue-uuid";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faCheck, faPencil, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faCheck, faPencil, faCircleCheck, faCircleXmark)
/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  UUID,
  render: h => h(App),
}).$mount('#app')