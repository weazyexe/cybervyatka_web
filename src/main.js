import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import firebase from "firebase/app";
import VueMaterial from 'vue-material'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css' // This line here
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import LandingMain from "@/components/LandingMain";
import AdminTeams from "@/components/AdminTeams";
import AdminAuth from "@/components/AdminAuth";
import AdminTeamAddEdit from "@/components/AdminTeamAddEdit";



Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueMaterial);


const firebaseConfig = {
  apiKey: "AIzaSyBA0i4H8m7xJA4QdjxjS0gfIojm4vnZ6fw",
  authDomain: "cybervyatka.firebaseapp.com",
  databaseURL: "https://cybervyatka.firebaseio.com",
  projectId: "cybervyatka",
  storageBucket: "cybervyatka.appspot.com",
  messagingSenderId: "339048167856",
  appId: "1:339048167856:web:bd592eefdae06bfe99fe75"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const routes = [
  { path: '/', component: LandingMain },
  { path: '/admin/teams', component: AdminTeams },
  { path: '/auth', component: AdminAuth },
  { path: '/admin/teams/add', component: AdminTeamAddEdit },
  { path: '/admin/teams/edit', component: AdminTeamAddEdit },
  { path: '/admin', redirect: '/auth' }
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app');
});

