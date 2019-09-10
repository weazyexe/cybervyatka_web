<template>
    <div>
        <div class="field">
            <b-navbar type="dark">
                <b-navbar-brand>
                    <img class="logo" src="../assets/logo_clear.png" alt="CV Logo">
                </b-navbar-brand>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item class="menu-item" href="#">Команды</b-nav-item>
                    <b-nav-item class="menu-item" href="#">Расписание</b-nav-item>
                    <b-nav-item class="menu-item" href="#">Группы</b-nav-item>
                    <b-nav-item class="menu-item" href="#">Плей-офф</b-nav-item>
                    <b-nav-item class="menu-item" href="#">Прошлые сезоны</b-nav-item>
                    <b-button class="menu-item accent-button shadow-none">Участвовать</b-button>
                </b-navbar-nav>
            </b-navbar>

            <!--<b-container>
                <b-row>
                    <p class="biggest-text">CYBERVYATKA</p>
                </b-row>
                <b-row>
                    <p class="bigger-text">Киберспортивный турнир в Кирове</p>
                </b-row>
            </b-container>-->

            <div class="rectangle"></div>
        </div>
    </div>

</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .field {
        background: url("../assets/main_background.png") center no-repeat;
        background-size: cover;
    }
    
    .rectangle {
        background-color: #101010;
        min-width: 105%;
        min-height: 20em;
        transform: rotate(-2deg);
        margin-left: -5em;
        transform-origin: 102%;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .biggest-text {
        color: #FFFFFF;
        margin-top: 5em;
        font-size: 4em;
        letter-spacing: 1em;
        font-weight: bold;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }

    .bigger-text {
        color: #FFFFFF;
        font-size: 1.5em;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 2em;
    }

    :root {
        --accent-color-dark: #aa7d64;
        --accent-color: #D68956;
    }

    .logo {
        width: 4em;
        height: 4em;
        margin-left: 3em;
        margin-top: 1em;
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
