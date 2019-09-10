<template>
    <div class="all">
        <b-row >
            <b-col class="hamburger-menu" md="2">

            </b-col>
            <b-col class="right-side" md="10">
                <b-row class="header-menu">
                    <p style="color: white">
                        Header
                    </p>
                </b-row>
                <div class="content">
                    <p style="color: white">
                        Keko
                    </p>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "AdminTeams"
    }
</script>

<style scoped>
    .all {
        min-height: 100%;
        min-width: 100%;
    }

    .hamburger-menu {
        background-color: #101010;
        padding-right: 0;
        min-height: 100%;
    }

    .header-menu {
        background-color: #161616;

    }

    .content {
        background-color: #212121;
    }

    .right-side {
        padding-left: 0;
    }

    body {
        background-color: #212121;
    }
</style>