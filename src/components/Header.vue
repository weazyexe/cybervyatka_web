<template>
    <b-navbar type="dark">
        <b-navbar-brand>
            <img class="logo" src="../assets/logo_clear.png" alt="CV Logo">
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-nav-item active class="menu-item" href="#">Команды</b-nav-item>
            <b-nav-item active class="menu-item" href="#">Расписание</b-nav-item>
            <b-dropdown active class="menu-item menu-item-dropdown bg-transparent" href="#" text="Турнир">
                <b-dropdown-item href="#">Групповой этап</b-dropdown-item>
                <b-dropdown-item href="#">Плей-офф</b-dropdown-item>
            </b-dropdown>
            <b-nav-item active class="menu-item" href="#">Прошлые сезоны</b-nav-item>
            <b-button class="menu-item accent-button shadow-none">Участвовать</b-button>
        </b-navbar-nav>
    </b-navbar>
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

    .menu-item-dropdown {
        background-color: transparent;
        color: transparent;
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
        color: #FAFAFA;
    }

    .accent-button {
        background: var(--accent-color);
        box-shadow: 0 0.5em 0.5em rgba(0, 0, 0, 0.25);
        border-radius: 2em;
        padding-left: 1em;
        padding-right: 1em;
        border-color: var(--accent-color);
    }

    .accent-button:hover, .accent-button:active, .accent-button.focus {
        background: var(--accent-color-dark);
        border-color: var(--accent-color-dark);
        outline: none !important;
        box-shadow: none;
    }
</style>
