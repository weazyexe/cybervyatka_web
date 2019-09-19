<template>
    <div class="hamburger-menu fixed-top">
        <b-col class="horizontal-center" md="12">
            <b-row>
                <img class="admin-menu-logo" src="../assets/logo_clear.png" alt="Logo">
            </b-row>
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
        </b-col>
    </div>
</template>

<script>
    import AdminMenuButton from "@/components/AdminMenuButton";

    export default {
        name: "AdminMenu",
        components: {
            AdminMenuButton
        },
        props: {
            isTeamsActive : Boolean,
            isGamesActive : Boolean,
            isGroupsActive : Boolean,
            isPlayoffActive : Boolean,
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
</style>