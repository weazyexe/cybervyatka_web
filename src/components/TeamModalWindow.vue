<template>
    <md-dialog class="team-dialog" :md-active.sync="showTeamDialog">

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
        name: "TeamModalWindow",
        props: {
            team: Object,
            showTeamDialog: Boolean,
            onConfirm: Function
        }
    }
</script>

<style scoped>

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
    }

    .team-dialog {
        background-color: #252525;
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