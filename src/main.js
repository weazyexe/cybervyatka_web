import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import Vuelidate from 'vuelidate'
import * as firebase from 'firebase';
import VuePageTransition from 'vue-page-transition'
import VueYandexMetrika from 'vue-yandex-metrika';

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css' // This line here
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

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
import LandingPlayoff from "@/components/LandingPlayoff";
import LandingParticipate from "@/components/LandingParticipate";
import NotFound from "@/components/NotFound";
import LandingOrgs from "@/components/LandingOrgs";
import LandingAbout from "@/components/LandingAbout";
import AdminSettings from "@/components/AdminSettings";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueMaterial);
Vue.use(Vuelidate);
Vue.use(VuePageTransition);

const firebaseConfig = {
    apiKey: "AIzaSyBA0i4H8m7xJA4QdjxjS0gfIojm4vnZ6fw",
    authDomain: "cybervyatka.ru",
    databaseURL: "https://cybervyatka.firebaseio.com",
    projectId: "cybervyatka",
    storageBucket: "cybervyatka.appspot.com",
    messagingSenderId: "339048167856",
    appId: "1:339048167856:web:bd592eefdae06bfe99fe75",
    measurementId: "G-7TRFDM2EK7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const routes = [
    {
        path: '/',
        meta: {
            title: 'Главная страница - CYBERVYATKA'
        },
        component: LandingMain
    },
    {
        path: '/teams',
        component: LandingTeams,
        meta: {
            title: 'Команды - CYBERVYATKA'
        }
    },
    {
        path: '/games',
        component: LandingGames,
        meta: {
            title: 'Расписание - CYBERVYATKA'
        }
    },
    {
        path: '/groups',
        component: LandingGroups,
        meta: {
            title: 'Группы - CYBERVYATKA'
        }
    },
    {
        path: '/playoff',
        component: LandingPlayoff,
        meta: {
            title: 'Плей-офф сетки - CYBERVYATKA'
        }
    },
    {
        path: '/registration',
        component: LandingParticipate,
        meta: {
            title: 'Участвовать в турнире - CYBERVYATKA'
        }
    },
    {
        path: '/our_squad',
        component: LandingOrgs,
        meta: {
            title: 'Организаторы - CYBERVYATKA'
        }
    },
    {
        path: '/about',
        component: LandingAbout,
        meta: {
            title: 'О турнире - CYBERVYATKA'
        }
    },

    {
        path: '/404',
        component: NotFound,
        meta: {
            title: 'Что-то пошло не так'
        }
    },
    { path: '*', redirect: '/404' },

    {
        path: '/admin/teams',
        component: AdminTeams,
        meta: {
            requiresAuth: true,
            title: "Команды - CV.Admin"
        }
    },
    {
        path: '/admin/teams/add',
        component: AdminTeamAddEdit,
        meta: {
            requiresAuth: true,
            title: "Добавить команду - CV.Admin"
        }
    },
    {
        path: '/admin/teams/edit',
        component: AdminTeamAddEdit,
        meta: {
            requiresAuth: true,
            title: "Редактировать команду - CV.Admin"
        }
    },

    {
        path: '/admin/games',
        component: AdminGames,
        meta: {
            requiresAuth: true,
            title: "Игры - CV.Admin"
        }
    },
    {
        path: '/admin/games/add',
        component: AdminGameAddEdit,
        meta: {
            requiresAuth: true,
            title: "Добавить игру - CV.Admin"
        }
    },
    {
        path: '/admin/games/edit',
        component: AdminGameAddEdit,
        meta: {
            requiresAuth: true,
            title: "Редактировать игру - CV.Admin"
        }
    },

    {
        path: '/admin/groups',
        component: AdminGroups,
        meta: {
            requiresAuth: true,
            title: "Группы - CV.Admin"
        }
    },
    {
        path: '/admin/groups/add',
        component: AdminGroupAddEdit,
        meta: {
            requiresAuth: true,
            title: "Добавить группу - CV.Admin"
        }
    },
    {
        path: '/admin/groups/edit',
        component: AdminGroupAddEdit,
        meta: {
            requiresAuth: true,
            title: "Редактировать группу - CV.Admin"
        }
    },

    {
        path: '/admin/playoff',
        component: AdminPlayoff,
        meta: {
            requiresAuth: true,
            title: "Плей-офф сетка - CV.Admin"
        }
    },

    {
        path: '/admin/settings',
        component: AdminSettings,
        meta: {
            requiresAuth: true,
            title: "Настройки - CV.Admin"
        }
    },

    {
        path: '/auth',
        component: AdminAuth,
        title: "Авторизация - CV.Admin"
    },
    { path: '/admin', redirect: '/admin/teams' }


];

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

Vue.use(VueYandexMetrika, {
    router: router,
    id: 55660069,
    env: process.env.NODE_ENV
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