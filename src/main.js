import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import LandingMain from "@/components/LandingMain";
import AdminTeams from "@/components/AdminTeams";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueRouter);

const routes = [
  { path: '/', component: LandingMain },
  { path: '/admin/teams', component: AdminTeams },
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
