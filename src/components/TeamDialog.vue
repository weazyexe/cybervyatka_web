<template>
    <md-dialog class="team-dialog" :md-active="show">

        <div class="horizontal-center">
            <b-row>
                <b-col md="12" class="text-center">
                    <img class="modal-logo rounded-circle img-fluid" v-if="team.logo === ''" src="../assets/logo_placeholder.png"
                         alt="team_logo"/>
                    <img class="modal-logo rounded-circle img-fluid" v-else :src="team.logo"
                         alt="team_logo"/>
                    <p class="team-text">{{ team.title }}</p>
                    <p class="game-text-small" v-if="team.discipline === 'CSGO'">CS:GO</p>
                    <p class="game-text-small" v-else>Dota 2</p>

                    <template v-if="team.isInvited">
                        <div class="mb-3 mt-m-1">
                            <span class="live-icon mb-auto mr-auto ">INVITED</span>
                            <md-tooltip md-direction="bottom">Это приглашенная команда, занявшая призовое место в прошлом сезоне</md-tooltip>
                        </div>
                    </template>

                    <div v-if="showContacts" class="players-list">
                        <p class="player-name">E-mail: <a :href="'mailto:' + team.contacts.email" target="_blank">{{ team.contacts.email }}</a></p>
                        <p class="player-name">Телефон: <a :href="'callto:' + team.contacts.phone" target="_blank">{{ team.contacts.phone }}</a></p>
                        <template v-if="team.contacts.vk !== ''">
                            <p class="player-name">VK: <a :href="team.contacts.vk.includes('http') ? team.contacts.vk : `https://${team.contacts.vk}`" target="_blank">{{ team.contacts.vk }}</a></p>
                        </template>
                        <template v-if="team.contacts.telegram !== ''">
                            <p class="player-name">Telegram: <a :href="'https://t-do.ru/' + team.contacts.telegram" target="_blank">{{ team.contacts.telegram }}</a></p>
                        </template>
                    </div>

                    <div class="players-list">
                        <p class="list-header">Игроки:</p>
                        <p class="player-name" v-for="(player, index) in team.players" v-bind:key="index">
                            {{ player }}
                        </p>
                    </div>

                    <div v-if="team.standins != null" class="players-list">
                        <p class="list-header">Стенд-ины:</p>
                        <p class="player-name" v-for="(player, index) in team.standins" v-bind:key="index">
                            {{ player }}
                        </p>
                    </div>
                </b-col>
            </b-row>
        </div>

        <md-dialog-actions>
            <md-button class="md-primary dialog-button" @click="onConfirm">OK</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script>
    export default {
        name: "TeamDialog",
        props: {
            team: Object,
            show: Boolean,
            onConfirm: Function,
            showContacts : Boolean
        },
        destroyed() {
            this.show = false;
        }
    }
</script>

<style scoped>

    .live-icon {
        color: #FFFFFF;
        background-color: #5e91ff;
        border-radius: 0.7em;
        padding: 0.5em 0.8em;
        font-size: 0.5em;
        height: 2.3em;
        margin-top: -1em;
    }

    .mt-m-1 {
        margin-top: -1em;
    }

    .modal-logo {
        width: 8em;
        height: 8em;
        margin: 1em;
    }

    .dialog-button {
        color: #D68956;
    }

    .player-name {
        margin-bottom: 0;
        color: #FFFFFF;
        margin-left: 1em;
        margin-right: 1em;
    }

    .team-dialog {
        background-color: #252525;
        overflow-y: auto;
    }

    .game-text-small {
        color: rgba(255, 255, 255, 0.1);
        font-size: 0.7em;
        margin-top: -1em;
    }

    .team-text {
        color: #FFFFFF;
        font-size: 1.5em;
    }

    .list-header {
        margin-bottom: 0.5em;
        color: #FFFFFF;
        font-weight: 700;
    }

    .players-list {
        margin-bottom: 1em;
    }
</style>