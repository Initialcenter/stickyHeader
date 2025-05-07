import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VxeUITable from "vxe-table";
import "vxe-table/lib/style.css";

Vue.config.productionTip = false;
Vue.use(VxeUITable);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
