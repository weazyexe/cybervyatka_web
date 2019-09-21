<template>
    <md-dialog class="game-dialog" :md-active="show">

        <team-dialog :team="currentTeam" :show="showTeamDialog" :show-contacts="false" :on-confirm="onShowConfirm"></team-dialog>

        <div class="horizontal-center">
            <b-row>
                <b-col md="12" class="text-center">
                    <b-row class="text-center">
                        <b-col class="mx-auto">
                            <div class="text-center">
                                <img class="modal-logo rounded-circle" v-if="game.team_first.logo === ''" src="../assets/logo_placeholder.png"
                                     alt="team_logo" @click="showTeam(game.team_first)"/>
                                <img class="modal-logo rounded-circle" v-else :src="game.team_first.logo"
                                     alt="team_logo" @click="showTeam(game.team_first)"/>

                                <img class="modal-logo rounded-circle" v-if="game.team_second.logo === ''" src="../assets/logo_placeholder.png"
                                     alt="team_logo" @click="showTeam(game.team_second)"/>
                                <img class="modal-logo rounded-circle" v-else :src="game.team_second.logo"
                                     alt="team_logo" @click="showTeam(game.team_second)"/>
                            </div>
                        </b-col>
                    </b-row>

                    <div class="team-text">
                        <div @click="showTeam(game.team_first)" class="team-link" >
                            {{ game.team_first.title }}
                        </div>
                        <strong class="versus"> VS </strong>
                        <div @click="showTeam(game.team_second)" class="team-link">{{ game.team_second.title }}</div>
                    </div>
                    <p class="team-text-small">Best of {{ game.best_of }} • {{ parsedDate }}</p>
                    <p class="game-text-small" v-if="game.discipline === 'CSGO'">CS:GO</p>
                    <p class="game-text-small" v-else>Dota 2</p>

                    <p class="list-header">Результаты</p>
                    <template v-if="game.discipline === 'CSGO'">
                        <template v-if="game.results">
                            <template v-for="(map, index) in Object.keys(game.results)">
                                <p :key="index" class="player-name">{{ map }}: {{ game.results[map] }}</p>
                            </template>
                        </template>
                        <template v-else>
                            <p class="player-name">Карты ещё не выбраны</p>
                        </template>
                    </template>
                    <template v-else>
                        <template v-if="game.results[0] !== '0:0'">
                            <template v-for="(result, index) in game.results">
                                <p :key="index" class="player-name" v-if="result === '1:0'">{{ index + 1 }} игра: {{ game.team_first }}</p>
                                <p :key="index" class="player-name" v-else-if="result === '0:1'">{{ index + 1 }} игра: {{ game.team_second }}</p>
                            </template>
                        </template>
                        <template v-else>
                            <p class="player-name">Игры ещё не начались</p>
                        </template>
                    </template>
                </b-col>
            </b-row>
        </div>

        <md-dialog-actions>
            <md-button class="md-primary dialog-button" @click="onConfirm">OK</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script>
    import TeamDialog from "@/components/TeamDialog";
    export default {
        name: "GameDialog",
        components: {TeamDialog},
        props: {
            show: Boolean,
            game: Object,
            onConfirm: Function
        },
        data: function () {
            return {
                parsedDate : "",
                showTeamDialog : false,
                currentTeam: {}
            }
        },
        created() {
            let game = this.game;

            let day = game.datetime.toDate().getDate();
            if (day < 10) day = '0' + day;

            let month = game.datetime.toDate().getMonth() + 1;
            if (month < 10) month = '0' + month;

            let year = game.datetime.toDate().getFullYear();

            this.parsedDate = day + '.' + month + '.' + year;
        },
        methods: {
            showTeam(team) {
                this.currentTeam = team;
                this.showTeamDialog = true;
            },
            onShowConfirm() {
                this.showTeamDialog = false;
            }
        }
    }
</script>

<style scoped>
    .modal-logo {
        width: 4em;
        height: 4em;
        margin: 1em;
    }

    .modal-logo:hover {
        cursor: pointer;
    }

    .dialog-button {
        color: #D68956;
    }

    .player-name {
        margin-bottom: 0;
        color: #FFFFFF;
    }

    .game-dialog {
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
        margin-bottom: 0;
        margin-left: 1em;
        margin-right: 1em;
    }

    .team-text-small {
        color: #CACACA;
        font-size: 1em;
    }

    .list-header {
        margin-bottom: 0.5em;
        color: #FFFFFF;
        font-weight: 700;
    }

    .players-list {
        margin-bottom: 1em;
    }

    .team-link {
        display: inline-block;
    }

    .team-link:hover {
        cursor: pointer;
        color: #CACACA;
    }

    .versus {
        display: inline-block;
        margin-left: 0.5em;
        margin-right: 0.5em;
    }
</style>