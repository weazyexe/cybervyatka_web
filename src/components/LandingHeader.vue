<template>
    <b-navbar type="dark">
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
            <b-nav-item class="menu-item" href="#">Прошлые сезоны</b-nav-item>
            <md-button id="past-seasons-button" class="md-raised m-0 mr-3" @click="toParticipate">Участвовать</md-button>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
    export default {
        name: "LandingHeader",
        methods: {
            toParticipate() {
                this.$router.push('/participate');
            }
        }
    }
</script>

<style scoped>
    .logo {
        width: 4em;
        height: 4em;
        margin-left: 3em;
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
        font-size: 1em;
        text-transform: none;
        height: auto;
        margin-top: 1em;
    }
</style>