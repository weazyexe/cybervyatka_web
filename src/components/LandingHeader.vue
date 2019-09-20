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
            <b-nav-item class="menu-item" href="#">Группы</b-nav-item>
            <b-nav-item class="menu-item" href="#">Плей-офф</b-nav-item>
            <b-nav-item class="menu-item" href="#">Прошлые сезоны</b-nav-item>
            <b-button class="menu-item accent-button shadow-none">Участвовать</b-button>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
    export default {
        name: "LandingHeader"
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

    .accent-button, .accent-button-big {
        background: var(--accent-color);
        box-shadow: 0 0.5em 0.5em rgba(0, 0, 0, 0.25);
        border-radius: 2em;
        padding-left: 1em;
        padding-right: 1em;
        border-color: var(--accent-color);
    }

    .accent-button:hover, .accent-button:active, .accent-button.focus,
    .accent-button-big:hover, .accent-button-big:active, .accent-button-big:focus {
        background: var(--accent-color-dark);
        border-color: var(--accent-color-dark);
        outline: none !important;
        box-shadow: none;
    }

    .navbar-dark .navbar-nav .nav-link{
        color:white !important
    }

    .navbar-dark:hover .navbar-nav:hover .nav-link:hover{
        color: #bcbcbc !important
    }
</style>