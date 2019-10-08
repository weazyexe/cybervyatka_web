<template>
    <div class="parallax">
        <game-dialog :game="currentGame" :on-confirm="onConfirmShow" :show="showGameDialog"></game-dialog>
        <div class="all-content parallax__layer parallax__layer--back"></div>

        <div class="parallax__layer parallax__layer--base">
            <landing-header :is-games-active="true"></landing-header>
            <b-row class="header">
                <p class="biggest-text">Расписание</p>

                <md-field id="select-game">
                    <md-select name="status" id="status" v-model="discipline" md-dense>
                        <md-option value="CSGO">CS:GO</md-option>
                        <md-option value="DOTA2">Dota 2</md-option>
                    </md-select>
                </md-field>
            </b-row>

            <div class="prerect">
                <div class="rectangle"></div>
            </div>

            <b-container fluid id="teams-content" :class="discipline === 'CSGO' ? 'csgo-back' : 'dota2-back'">

                    <b-col class="p-0 text-center">
                        <b-row class="filters ml-auto mr-auto text-center">
                            <md-field class="field mlr-auto">
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

                            <md-field class="field mlr-auto">
                                <md-icon>done_all</md-icon>
                                <label for="is-ended">Статус матча</label>
                                <md-select name="is-ended" id="is-ended" v-model="filter.is_ended" md-dense>
                                    <md-option value="false">Предстоящие матчи</md-option>
                                    <md-option value="true">Оконченные матчи</md-option>
                                </md-select>
                            </md-field>

                            <md-datepicker class="field mlr-auto" v-model="filter.date">
                                <label>Дата</label>
                            </md-datepicker>
                        </b-row>
                        <b-row class="text-center">
                            <b-container v-if="isLoading" class="text-center">
                                <md-progress-spinner class="main-color" md-mode="indeterminate"></md-progress-spinner>
                            </b-container>
                            <template v-else-if="isZeroTeams || !showGames">
                                <b-container class="text-center">
                                    <b-col>
                                        <i class="material-icons sad-face">sentiment_dissatisfied</i>
                                        <p class="bigger-text">Игр не найдено</p>
                                    </b-col>
                                </b-container>
                            </template>
                            <template v-else v-for="(game, index) in games">
                                <template v-if="game.discipline === discipline && (game.is_ended.toString() === filter.is_ended)
                                                    && (isDatesEquals(game) || !(filter.date instanceof Date))
                                                    && (game.team_first.uid === filter.team || game.team_second.uid === filter.team || filter.team === '')">
                                    <div :key="index" class="team-button mlr-auto" @click="showGame(game)">
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
                                                <span class="game-text">{{ parseDate(game.datetime.toDate()) }} • </span>
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

            <landing-footer></landing-footer>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import GameDialog from "@/components/GameDialog";
    import LandingHeader from "@/components/LandingHeader";
    import LandingFooter from "@/components/LandingFooter";

    export default {
        name: "LandingGames",
        components: {
            GameDialog,
            LandingHeader,
            LandingFooter
        },
        data: function () {
            return {
                discipline: "CSGO",
                games: [],
                teams: [],
                showGameDialog : false,
                currentGame : {},
                filter: {
                    team : '',
                    date : {},
                    is_ended: "false"
                },
                isLoading: true,
                showGames: false
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
            },
            parseDate(date) {
                let day = date.getDate();
                if (day < 10) day = '0' + day;

                let month = date.getMonth() + 1;
                if (month < 10) month = '0' + month;

                let year = date.getFullYear();

                return day + '.' + month + '.' + year;
            }
        },
        computed: {
            isZeroTeams: function() {
                if (this.games) {
                    let games = this.games.filter((game) => game.discipline === this.discipline && (game.is_ended.toString() === this.filter.is_ended)
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
                this.filter.is_ended = "false";
            }
        },
        created() {
            document.title = this.$route.meta.title;
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

                if (response.size === 0) {
                    this.isLoading = false;
                    this.games = [];
                }
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
    html {
        height: 100%;
        overflow: hidden;
    }

    .prerect {
        max-width: 100%;
        min-width: 100%;
        height: 30em;
        overflow-x: hidden;
        overflow-y: hidden;
        z-index: -1;
        position: relative;
    }

    .rectangle {
        background-color: #101010;
        min-width: 130%;
        min-height: 12em;
        transform: rotate(-3deg);
        margin-left: -3em;
        transform-origin: 103%;
    }

    .all-content {
        background: url("../assets/main_background.png") center no-repeat;
        background-size: cover;
        max-height: 45em;
        z-index: -1;
        margin-top: -4%;
    }

    @media only screen and (max-width: 350px) {
        .biggest-text {
            color: #FFFFFF;
            margin-top: 3em;
            font-size: 1.5em;
            font-weight: bold;
            text-align: left;
            margin-left: 10.5%;
        }

        #select-game{
            margin-left: 0.5em;
            margin-top: 1.8em;
            padding-top: 3em;
            width: 5.2em;
            display: inline;
            position: unset;
        }
    }

    @media only screen and (min-width: 350px) {
        .biggest-text {
            color: #FFFFFF;
            margin-top: 5em;
            font-size: 2em;
            font-weight: bold;
            text-align: left;
            margin-left: 10.5%;
        }

        #select-game{
            margin-left: 1em;
            margin-top: 7.8em;
            padding-top: 3em;
            width: 5.2em;
            display: inline;
            position: unset;
        }
    }

    @media only screen and (min-width: 400px) {
        .biggest-text {
            color: #FFFFFF;
            margin-top: 6.8em;
            font-size: 2.5em;
            font-weight: bold;
            text-align: left;
            margin-left: 10.5%;
        }

        #select-game{
            margin-left: 2em;
            margin-top: 15.4em;
            padding-top: 3em;
            width: 5.2em;
            display: inline;
            position: unset;
        }
    }

    @media only screen and (min-width: 721px) {
        .biggest-text {
            color: #FFFFFF;
            margin-top: 4em;
            font-size: 4em;
            font-weight: bold;
            text-align: left;
            margin-left: 10.5%;
        }
    }

    #teams-content {
        background-color: #101010;
        margin-top: -23em;
        padding: 3% 10% 10% 10%;
        min-height: 30em;
    }

    .parallax {
        perspective: 1px;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .parallax__layer {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .parallax__layer--base {
        transform: translateZ(0);
    }

    .parallax__layer--back {
        transform: translateZ(-1px) scale(2.7);
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

    .field {
        color: #D68956;
        width: 15em;
    }

    :root {
        --accent-color-dark: #aa7d64;
        --accent-color: #D68956;
    }

    .team-button {
        width: 26em;
        text-align: start;
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

    .md-field::after {
        height: 0;
    }

    .md-field::before {
        height: 0;
    }

    .md-field > .md-icon::after {
        width: 0;
        height: 0;
    }

    .md-field>.md-icon:after {
        content: none;
    }

    .md-select {
        margin-left: 0.7em;
    }
</style>