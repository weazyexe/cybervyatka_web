<template>
    <div>
        <md-dialog-alert
                class="bug-report-dialog"
                :md-active.sync="showDialog"
                md-title="Сайт работает некорректно?"
                md-content='Сообщите в Telegram <a href="https://t-do.ru/weazyexe" target="_blank">@weazyexe</a> подробности об ошибке. Отвечаем быстро, исправим оперативно. Будем признательны :)' />

        <b-container fluid class="footer">
            <b-col>
                <b-row class="ml-auto mr-auto text-center pt-4 links">
                    <router-link to="/about" class="ml-auto mr-auto">
                        <p class="text-link">О турнире</p>
                    </router-link>
                    <router-link to="/our_squad" class="ml-auto mr-auto">
                        <p class="text-link">Организаторы</p>
                    </router-link>
                    <p class="text-link ml-auto mr-auto" @click="showDialog = true">Баг-репорт</p>
                </b-row>
                <b-row class="ml-auto mr-auto text-center">
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="ml-auto mr-auto" target="_blank">
                        <p class="wz-link">with love, <strong>weazy</strong> for cybervyatka, 2019</p>
                    </a>
                </b-row>
                <b-row class="ml-auto mr-auto text-center">
                    <img src="../assets/logo_clear.png" alt="cv logo" class="footer-logo ml-auto mb-3">
                    <img src="../assets/wz.png" alt="cv logo" class="wz-logo ml-2 mr-auto mb-3">
                </b-row>
            </b-col>

        </b-container>
    </div>
</template>

<script>
    export default {
        name: "LandingFooter",
        data: function () {
            return {
                showDialog: false
            }
        }
    }
</script>

<style scoped>
    .footer {
        background-color: #171717;
    }

    .links {
        width: 40%;
    }

    a:hover {
        text-decoration: none;
    }

    .text-link:hover {
        color: #808080;
        cursor: pointer;
    }

    .wz-link {
        color: #303030;
        font-size: 0.7em;
    }

    .wz-link:hover {
        cursor: pointer;
    }

    .footer-logo {
        width: 1.2em;
        height: 1.2em;
    }

    .wz-logo {
        width: 2em;
        height: 1.2em;
    }

    .bug-report-dialog {
        background-color: #303030;
    }

    @media only screen and (max-width: 460px) {
        .text-link {
            color: #606060;
            font-size: 0.7em;
            font-weight: bold;
        }
    }

    @media only screen and (min-width: 460px) {
        .text-link {
            color: #606060;
            font-weight: bold;
        }
    }
</style>