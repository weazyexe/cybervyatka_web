<template>
    <div>

        <md-dialog class="game-dialog" :md-active="show">
            <div class="horizontal-center">

                <team-dialog :team="currentTeam" :show="showTeamDialog" :show-contacts="false" :on-confirm="onShowConfirm"></team-dialog>

                <b-row>
                    <b-col md="12" class="text-center">
                        <b-row class="text-center mb-2">
                            <b-col md="6" class="ml-auto text-center pl-5">
                                <img class="modal-logo rounded-circle" v-if="game.team_first.logo === ''" src="../assets/logo_placeholder.png"
                                     alt="team_logo" @click="showTeam(game.team_first)"/>
                                <img class="modal-logo rounded-circle" v-else :src="game.team_first.logo"
                                     alt="team_logo" @click="showTeam(game.team_first)"/>
                                <span class="winner-icon mb-auto mr-auto ml-auto" v-if="game.is_ended && rules.whoWin(game) === 'FIRST_TEAM'">WINNER</span>
                                <span class="loser-icon mb-auto mr-auto ml-auto" v-else-if="game.is_ended && rules.whoWin(game) !== 'BEST_OF_EVEN'">LOSER</span>
                            </b-col>
                            <b-col md="6" class="mr-auto text-center pr-5">
                                <img class="modal-logo rounded-circle" v-if="game.team_second.logo === ''" src="../assets/logo_placeholder.png"
                                     alt="team_logo" @click="showTeam(game.team_second)"/>
                                <img class="modal-logo rounded-circle" v-else :src="game.team_second.logo"
                                     alt="team_logo" @click="showTeam(game.team_second)"/>
                                <span class="winner-icon mb-auto mr-auto ml-auto" v-if="game.is_ended && rules.whoWin(game) === 'SECOND_TEAM'">WINNER</span>
                                <span class="loser-icon mb-auto ml-auto mr-auto" v-else-if="game.is_ended && rules.whoWin(game) !== 'BEST_OF_EVEN'">LOSER</span>
                            </b-col>
                        </b-row>

                        <b-col class="team-text">
                            <div @click="showTeam(game.team_first)" class="team-link" >
                                {{ game.team_first.title }}
                            </div>
                            <strong class="versus"> VS </strong>
                            <div @click="showTeam(game.team_second)" class="mb-3 team-link">{{ game.team_second.title }}</div>
                        </b-col>
                        <p class="team-text-small">Best of {{ game.best_of }} • {{ parsedDate }}</p>
                        <p class="game-text-small" v-if="game.discipline === 'CSGO'">CS:GO</p>
                        <p class="game-text-small" v-else>Dota 2</p>

                        <p class="list-header">Результаты</p>
                        <template v-if="game.results">
                            <template v-for="(match, index) in results">
                                <p :key="index" class="player-name">{{ game.discipline === 'CSGO' ? match.map : `${index + 1} игра` }}: <strong class="strong-info-text">{{ match.firstCount }}</strong><strong>:</strong><strong class="strong-info-text">{{ match.secondCount }}</strong></p>
                            </template>
                        </template>
                        <template v-else>
                            <p class="player-name">{{ game.discipline === 'CSGO' ? 'Карты ещё не выбраны' : 'Игры ещё не начались' }} </p>
                        </template>
                    </b-col>
                </b-row>
            </div>

            <md-dialog-actions>
                <md-button class="md-primary dialog-button" @click="onConfirm">OK</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
    import TeamDialog from "@/components/TeamDialog";
    import rules from "@/js/rules";

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
                showTeamDialog : false,
                currentTeam: {},
                rules : rules
            }
        },
        methods: {
            showTeam(team) {
                this.currentTeam = team;
                this.showTeamDialog = true;
            },
            onShowConfirm() {
                this.showTeamDialog = false;
            }
        },
        computed: {
            results: function () {
                let res = [];

                this.game.results.forEach((it) => {
                    let match = it.split(':');
                    if (this.game.discipline === 'CSGO') {
                        res.push({map: match[0], firstCount: match[1], secondCount: match[2]});
                    } else {
                        res.push({firstCount: match[0], secondCount: match[1]});
                    }
                });

                return res;
            },
            parsedDate: function() {
                let game = this.game;

                let day = game.datetime.toDate().getDate();
                if (day < 10) day = '0' + day;

                let month = game.datetime.toDate().getMonth() + 1;
                if (month < 10) month = '0' + month;

                let year = game.datetime.toDate().getFullYear();

                return day + '.' + month + '.' + year;
            }
        }
    }
</script>

<style scoped>

    .winner-icon {
        color: #FFFFFF;
        background-color: #7cbc62;
        border-radius: 0.7em;
        padding: 0.5em 0.8em;
        font-size: 0.5em;
        height: 2.3em;
        width: 6em;
        margin-top: 1em;
        display: block;
    }

    .loser-icon {
        color: #FFFFFF;
        background-color: #bd3221;
        border-radius: 0.7em;
        padding: 0.5em 0.8em;
        font-size: 0.5em;
        height: 2.3em;
        width: 5em;
        margin-top: 1em;
        display: block;
    }

    .strong-info-text {
        color: #D68956;
        font-weight: bold;
    }

    .modal-logo {
        width: 4em;
        height: 4em;
        margin: 1em 1em 0 1em;
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