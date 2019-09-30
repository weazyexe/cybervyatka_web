<template>
    <div>
        <md-dialog-alert
                class="bug-report-dialog"
                :md-active.sync="showDialog"
                md-title="Сайт работает некорректно?"
                md-content='Сообщите в Telegram <a href="https://t-do.ru/weazyexe" target="_blank">@weazyexe</a> подробности об ошибке. Отвечаем быстро, исправим оперативно. Будем признательны :)' />

        <b-container fluid class="footer">
            <b-col>
                <b-row class="ml-auto mr-auto text-center pt-4">
                    <p class="text-link ml-auto">О турнире</p>
                    <p class="text-link ml-5 mr-5">Организаторы</p>
                    <p class="text-link mr-auto mr-2" @click="showDialog = true">Баг-репорт</p>
                </b-row>
                <b-row class="ml-auto mr-auto text-center">
                    <p class="wz-link ml-auto mr-auto">with love, <strong>weazy</strong> for cybervyatka, 2019</p>
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

    .text-link {
        color: #303030;
        font-weight: bold;
    }

    .text-link:hover {
        color: #353535;
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
    }

    .wz-logo {
        width: 2em;
    }

    .bug-report-dialog {
        background-color: #303030;
    }
</style>