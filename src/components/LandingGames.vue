<template>
    <div>
        <div class="all-content">
            <landing-header></landing-header>

            <game-dialog :game="currentGame" :on-confirm="onConfirmShow" :show="showGameDialog"></game-dialog>

            <div>
                <b-row class="header">
                    <p class="biggest-text">Расписание</p>

                    <md-field id="select-game">
                        <md-select name="status" id="status" v-model="discipline" md-dense>
                            <md-option value="CSGO">CS:GO</md-option>
                            <md-option value="DOTA2">Dota 2</md-option>
                        </md-select>
                    </md-field>
                </b-row>

            </div>

            <div class="prerect">
                <div class="rectangle"></div>
            </div>
        </div>

        <b-container fluid id="teams-content" :class="discipline === 'CSGO' ? 'csgo-back' : 'dota2-back'">
            <b-col>
                <b-row class="filters">
                    <md-field class="field">
                        <md-icon>people</md-icon>
                        <label for="team">Команда</label>
                        <md-select name="team" id="team" v-model="filter.team" md-dense>
                            <md-option value="">Команда</md-option>
                            <template v-for="(team, index) in teams">
                                <template v-if="team.discipline === discipline && team.status === 'CONFIRMED'">
                                    <md-option :key="index" :value="team.uid">{{ team.title }}</md-option>
                                </template>
                            </template>
                        </md-select>
                    </md-field>

                    <md-datepicker class="field" v-model="filter.date">
                        <label>Дата</label>
                    </md-datepicker>
                </b-row>
                <b-row v-if="isLoading">
                    <b-container class="text-center">
                        <md-progress-spinner class="main-color" md-mode="indeterminate"></md-progress-spinner>
                    </b-container>
                </b-row>
                <b-row>
                    <template v-if="isZeroTeams">
                        <b-container class="text-center">
                            <b-col>
                                <i class="material-icons sad-face">sentiment_dissatisfied</i>
                                <p class="bigger-text">Команд нет</p>
                            </b-col>
                        </b-container>
                    </template>
                    <template v-else v-for="(game, index) in games">
                        <template v-if="game.discipline === discipline && !game.is_ended
                                                    && (isDatesEquals(game) || !(filter.date instanceof Date))
                                                    && (game.team_first.uid === filter.team || game.team_second.uid === filter.team || filter.team === '')">
                            <div :key="index" class="team-button" @click="showGame(game)">
                                <b-row class="logos">
                                    <template v-if="game.team_first.logo === ''">
                                        <img class="small-team-logo rounded-circle" src="../assets/logo_placeholder.png"
                                             alt="team_logo"/>
                                    </template>
                                    <template v-else>
                                        <img class="small-team-logo rounded-circle" :src="game.team_first.logo"
                                             alt="team_logo" />
                                    </template>

                                    <template v-if="game.team_second.logo === ''">
                                        <img class="small-team-logo rounded-circle" src="../assets/logo_placeholder.png"
                                             alt="team_logo"/>
                                    </template>
                                    <template v-else>
                                        <img class="small-team-logo rounded-circle" :src="game.team_second.logo"
                                             alt="team_logo"/>
                                    </template>

                                    <template v-if="game.datetime.toDate().getTime() < Date.now() && !game.is_ended">
                                        <span class="live-icon">LIVE</span>
                                    </template>
                                </b-row>

                                <b-col>
                                    <span class="team-text">{{ game.team_first.title }} VS {{ game.team_second.title }}</span>
                                    <b-row class="game-info">
                                        <span class="game-text">Best of {{ game.best_of }}, </span>
                                        <span class="game-text">{{ $parent.parseDate(game.datetime.toDate()) }} • </span>
                                        <span class="game-text" v-if="game.discipline === 'CSGO'">CS:GO</span>
                                        <span class="game-text" v-else>Dota 2</span>
                                    </b-row>
                                </b-col>
                            </div>
                        </template>
                    </template>
                </b-row>
            </b-col>
        </b-container>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import GameDialog from "@/components/GameDialog";
    import LandingHeader from "@/components/LandingHeader";

    export default {
        name: "LandingGames",
        components: {
            GameDialog,
            LandingHeader
        },
        data: function () {
            return {
                discipline: "CSGO",
                games: [],
                teams: [],
                showGameDialog : false,
                currentGame : {},
                filter: {
                    team : "",
                    date : {}
                },
                isLoading: true
            }
        },
        methods: {
            showGame(game) {
                this.showGameDialog = true;
                this.currentGame = game;
            },
            onConfirmShow() {
                this.showGameDialog = false;
            },
            isDatesEquals(game) {
                let date = new Date(game.datetime.toDate().setHours(0, 0, 0, 0));
                let filterDate = new Date(new Date(this.filter.date).setHours(0, 0, 0 ,0));

                return date.getTime() === filterDate.getTime();
            }
        },
        computed: {
            isZeroTeams() {
                if (this.games) {
                    let games = this.games.filter((game) => game.discipline === this.discipline && !game.is_ended
                        && (this.isDatesEquals(game) || !(this.filter.date instanceof Date))
                        && (game.team_first.uid === this.filter.team || game.team_second.uid === this.filter.team || this.filter.team === ''));

                    return games.length === 0;
                }

                return false;
            }
        },
        watch: {
            discipline: function () {
                this.filter.team = '';
                this.filter.date = {};
            }
        },
        created() {
            this.$material.locale.dateFormat = 'dd.MM.yyyy';
            let db = firebase.firestore();
            this.isLoading = true;

            db.collection("games").get().then((response) => {
                response.forEach((it) => {
                    let game = it.data();

                    let fRef = game.team_first;
                    let sRef = game.team_second;

                    fRef.get().then((firstTeam) => {
                        game.team_first = firstTeam.data();
                        sRef.get().then((secondTeam) => {
                            game.team_second = secondTeam.data();
                            this.games.push(game);

                            this.games.sort((a, b) => {
                                if (a.datetime.seconds > b.datetime.seconds) return 1;
                                else if (a.datetime.seconds < b.datetime.seconds) return -1;
                                else return 0;
                            });

                            this.isLoading = false;
                        });
                    });
                });
            });

            db.collection("teams").get().then((response) => {
                response.forEach((it) => {
                    this.teams.push(it.data());
                });
            });
        }
    }
</script>

<style scoped>
    html, body {
        max-width: 100%;
        overflow-x: hidden;
    }

    #select-game{
        margin-left: 2em;
        margin-top: 15.4em;
        padding-top: 3em;
        width: 5em;
        display: inline;
        position: unset;
    }

    .bigger-text {
        color: #FFFFFF;
        font-size: 1.5em;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 2em;
    }

    .filters {
        margin-left: 1em;
        margin-bottom: 3em;
    }

    .header {
        margin-right: 0;
        margin-left: 0;
    }

    .sad-face {
        color: #FFFFFF;
        text-align: center;
        font-size: 5em;
    }

    .all-content {
        background: url("../assets/main_background.png") center no-repeat;
        background-size: cover;
        max-height: 45em;
    }

    .field {
        color: #D68956;
        margin-right: 2em;
        width: 20em;
    }

    .prerect {
        max-width: 100%;
        min-width: 100%;
        height: 30em;
        margin-top: -5em;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .rectangle {
        background-color: #101010;
        min-width: 110%;
        min-height: 10em;
        transform: rotate(-3deg);
        margin-left: -7em;
        transform-origin: 103%;
        z-index: 1;
    }

    .biggest-text {
        color: #FFFFFF;
        margin-top: 4em;
        font-size: 4em;
        font-weight: bold;
        text-align: left;
        margin-left: 3.5em;
    }

    :root {
        --accent-color-dark: #aa7d64;
        --accent-color: #D68956;
    }

    #teams-content {
        background-color: #101010;
        z-index: 2;
        margin-top: -10em;
        padding: 7em 10% 10% 10%;
    }

    .team-button {
        margin-right: 5em;
        width: 26em;
        margin-bottom: 2em;
        padding: 1em;
    }

    .team-button:hover {
        cursor: pointer;
        border-radius: 1em;
        background: rgba(50, 50, 50, 0.5);
    }

    .csgo-back {
        background: url("../assets/csgo.svg") center no-repeat;
    }

    .dota2-back {
        background: url("../assets/dota2.png") center no-repeat;
    }

    .logos {
        margin-left: 1em;
    }

    .small-team-logo {
        width: 2em;
        height: 2em;
        margin-right: 1em;
    }

    .small-team-logo:hover {
        cursor: pointer;
    }

    .team-text {
        color: #FFFFFF;
        font-size: 1.5em;
    }

    .game-text {
        color: rgba(255, 255, 255, 0.1);
        padding-left: 0.4em;
        font-size: 1em;
    }

    .game-info {
        margin-left: -0.4em;
    }

    .game-text:hover {
        cursor: pointer;
    }

    .team-text:hover {
        color: #a8a8a8;
        cursor: pointer;
    }

    .live-icon {
        color: #FFFFFF;
        background-color: #ff000d;
        border-radius: 0.7em;
        padding: 0.5em 0.8em;
        font-size: 0.5em;
        margin-top: 0.7em;
        margin-bottom: 0.7em;
    }
</style>