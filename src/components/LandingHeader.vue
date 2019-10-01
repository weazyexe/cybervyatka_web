<template>
    <!--<b-navbar type="dark">
        <b-navbar-brand>
            <router-link to="/">
                <img class="logo" src="../assets/logo_clear.png" alt="CV Logo">
            </router-link>

        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-nav-item class="menu-item" to="/teams">Команды</b-nav-item>
            <b-nav-item class="menu-item" to="/games">Расписание</b-nav-item>
            <b-nav-item class="menu-item" to="/groups">Группы</b-nav-item>
            <b-nav-item class="menu-item" to="/playoff">Плей-офф</b-nav-item>
&lt;!&ndash;            <b-nav-item class="menu-item" href="#">Прошлые сезоны</b-nav-item>&ndash;&gt;
            <md-button id="past-seasons-button" class="md-raised m-0 mr-3" @click="toParticipate">Участвовать</md-button>
        </b-navbar-nav>
    </b-navbar>-->
    <div>
        <b-row class="m-0">
            <div class="pl-3 pt-3">
                <router-link to="/">
                    <img class="logo" src="../assets/logo_clear.png" alt="CV Logo">
                </router-link>
            </div>
        </b-row>

        <i class="material-icons menu-button" @click="expandOrCollapseMenu">{{ isExpanded ? 'close' : 'menu' }}</i>

        <div class="expanded-menu" :class="isExpanded ? 'show-menu' : 'hide-menu'">
            <b-container class="pt-20">
                <b-col>
                    <router-link to="/">
                        <p class="bigger-text" :class="isMainActive ? 'active-button' : ''">Главная</p>
                    </router-link>
                    <router-link to="/teams">
                        <p class="bigger-text" :class="isTeamsActive ? 'active-button' : ''">Команды</p>
                    </router-link>
                    <router-link to="/games">
                        <p class="bigger-text" :class="isGamesActive ? 'active-button' : ''">Расписание</p>
                    </router-link>
                    <router-link to="/groups">
                        <p class="bigger-text" :class="isGroupsActive ? 'active-button' : ''">Группы</p>
                    </router-link>
                    <router-link to="/playoff">
                        <p class="bigger-text" :class="isPlayoffActive ? 'active-button' : ''">Плей-офф</p>
                    </router-link>

                    <div class="text-center">
                        <md-button id="past-seasons-button" class="md-raised ml-auto mr-auto" @click="toParticipate">Участвовать</md-button>
                    </div>

                </b-col>
            </b-container>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LandingHeader",
        props: {
            isMainActive: Boolean,
            isTeamsActive: Boolean,
            isGamesActive: Boolean,
            isGroupsActive: Boolean,
            isPlayoffActive: Boolean
        },
        data: function() {
            return {
                isExpanded: false
            }
        },
        methods: {
            toParticipate() {
                this.$router.push('/registration');
            },
            expandOrCollapseMenu() {
                this.isExpanded = !this.isExpanded;
            }
        }
    }
</script>

<style scoped>
    .logo {
        width: 6em;
        height: 6em;
        margin-left: 20%;
        margin-top: 1em;
    }

    .logo:hover {
        cursor: pointer;
    }

    .menu-item {
        margin-right: 3em;
        color: #FFF !important;
    }

    .menu-item:hover {
        color: #000;
    }

    .navbar-dark .navbar-nav .nav-link{
        color:white !important
    }

    .navbar-dark:hover .navbar-nav:hover .nav-link:hover{
        color: #bcbcbc !important
    }

    #past-seasons-button {
        background-color: #D68956;
        color: #FFFFFF;
        border-radius: 2em;
        padding: 0.5em;
        font-size: 1.5em;
        text-transform: none;
        height: auto;
    }

    .menu-button {
        font-size: 2em;
        color: white;
        position: fixed;
        right: 2em;
        top: 2em;
        z-index: 1000;
    }

    .menu-button:hover {
        cursor: pointer;
        color: #CACACA;
    }

    .bigger-text {
        color: #FFFFFF;
        font-size: 1.5em;
        text-align: center;
        margin-bottom: 2em;
    }

    .bigger-text:hover {
        color: #CACACA;
        cursor: pointer;
    }

    .expanded-menu {
        position: fixed;
        left: 0;
        right: 0;
        background: rgba(30, 30, 30, 0.9) center fixed;
        z-index: 999;
        min-height: 115%;
        overflow-y: hidden;
        width: 100%;
        margin-top: -10em;
    }

    .pt-20 {
        padding-top: 17%;
    }

    .active-button {
        text-decoration: underline;
        text-decoration-color: #D68956;
    }

    .hide-menu {
        z-index: -999;
        opacity: 0;
        transition: opacity 0.3s ease-out;
        -moz-transition: opacity 0.3s ease-out;
        -webkit-transition: opacity 0.3s ease-out;
    }

    .show-menu {
        opacity: 1;
        transition: opacity 0.3s ease-in;
        -moz-transition: opacity 0.3s ease-in;
        -webkit-transition: opacity 0.3s ease-in;
    }
</style>