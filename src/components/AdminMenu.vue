<template>
    <div class="hamburger-menu fixed-top">
        <b-col class="horizontal-center" md="12">
            <b-row>
                <router-link to="/" class="admin-menu-logo">
                    <img src="../assets/logo_clear.png" alt="Logo">
                </router-link>
            </b-row>

            <router-link to="/admin/info">
                <admin-menu-button button-text="Информация" image="dashboard" :is-active="isInfoActive"></admin-menu-button>
            </router-link>

            <router-link to="/admin/teams">
                <admin-menu-button button-text="Команды" image="people" :is-active="isTeamsActive"></admin-menu-button>
            </router-link>

            <router-link to="/admin/games">
                <admin-menu-button button-text="Игры" image="play_arrow" :is-active="isGamesActive"></admin-menu-button>
            </router-link>

            <router-link to="/admin/groups">
                <admin-menu-button button-text="Групповой этап" image="grid_on" :is-active="isGroupsActive"></admin-menu-button>
            </router-link>

            <router-link to="/admin/playoff">
                <admin-menu-button button-text="Плей-офф" image="call_split" :is-active="isPlayoffActive"></admin-menu-button>
            </router-link>
            <router-link v-if="userRole === 'ADMIN'" to="/admin/settings">
                <admin-menu-button button-text="Настройки" image="tune" :is-active="isSettingsActive"></admin-menu-button>
            </router-link>

            <div id="user-data" class="text-center">
                <md-button @click="logOut" class="main-color">Log out</md-button>
                <p class="username">Signed in as <strong>{{ user.email }}</strong></p>
            </div>
        </b-col>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import AdminMenuButton from "@/components/AdminMenuButton";

    export default {
        name: "AdminMenu",
        components: {
            AdminMenuButton
        },
        props: {
            isInfoActive : Boolean,
            isTeamsActive : Boolean,
            isGamesActive : Boolean,
            isGroupsActive : Boolean,
            isPlayoffActive : Boolean,
            isSettingsActive : Boolean,
        },
        data: function () {
            return {
                user: firebase.auth().currentUser,
                userRole: "VIEWER"
            }
        },
        created() {
            let db = firebase.firestore();

            db.doc(`users/${this.user.uid}`).get().then((response) => {
                let raw = response.data();
                this.userRole = raw.role;
            });
        },
        methods: {
            logOut() {
                firebase.auth().signOut();
                this.$router.push('/auth');
            }
        }
    }
</script>

<style scoped>
    .hamburger-menu {
        background-color: #101010;
        min-height: 100vh;
        padding-left: 0;
        padding-right: 0;
        min-width: 20em;
        width: 20em;
        box-shadow: 0 0.2em 1em rgba(0, 0, 0, 0.18);
    }

    .admin-menu-logo {
        width: 6em;
        height: 6em;
        margin: 2em auto 6em;
    }

    .horizontal-center {
        margin-left: auto;
        margin-right: auto;
    }

    #user-data {
        margin-top: 50%;
        font-size: 0.7em;
    }

    .username {
        color: #606060;
    }

    .main-color {
        color: #484848;
    }
</style>