import Vue from 'vue';
import App from './App.vue';
import { VLazyImagePlugin } from "v-lazy-image";

Vue.use(VLazyImagePlugin);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
