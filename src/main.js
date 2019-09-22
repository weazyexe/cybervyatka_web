import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import firebase from "firebase/app";
import VueMaterial from 'vue-material'
import Vuelidate from 'vuelidate'
import VueKonva from 'vue-konva'


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
import LandingTeams from "@/components/LandingTeams";
import AdminGames from "@/components/AdminGames";
import AdminGameAddEdit from "@/components/AdminGameAddEdit";
import LandingGames from "@/components/LandingGames";
import AdminGroups from "@/components/AdminGroups";
import AdminGroupAddEdit from "@/components/AdminGroupAddEdit";
import LandingGroups from "@/components/LandingGroups";
import AdminPlayoff from "@/components/AdminPlayoff";



Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueMaterial);
Vue.use(Vuelidate);
Vue.use(VueKonva);



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
    {
        path: '/',
        meta: {
            title: 'CYBERVYATKA - Главная страница'
        },
        component: LandingMain
    },
    { path: '/teams', component: LandingTeams },
    { path: '/games', component: LandingGames },
    { path: '/groups', component: LandingGroups },

    {
        path: '/admin/teams',
        component: AdminTeams,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin/teams/add',
        component: AdminTeamAddEdit,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin/teams/edit',
        component: AdminTeamAddEdit,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/admin/games',
        component: AdminGames,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin/games/add',
        component: AdminGameAddEdit,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin/games/edit',
        component: AdminGameAddEdit,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/admin/groups',
        component: AdminGroups,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin/groups/add',
        component: AdminGroupAddEdit,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin/groups/edit',
        component: AdminGroupAddEdit,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/admin/playoff',
        component: AdminPlayoff,
        meta: {
            requiresAuth: true
        }
    },

    { path: '/auth', component: AdminAuth },
    { path: '/admin', redirect: '/auth' }


];

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser;
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next('auth');
    else next();
});

firebase.auth().onAuthStateChanged(() => {
    new Vue({
        router,
        render: h => h(App),
    }).$mount('#app');
});