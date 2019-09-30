<template>
    <div class="parallax">
        <game-dialog :game="currentGame" :show="showGameDialog" :on-confirm="onShowConfirm"></game-dialog>
        <div class="all-content parallax__layer parallax__layer--back"></div>

        <div class="parallax__layer parallax__layer--base">
            <landing-header :is-playoff-active="true"></landing-header>
            <b-row class="header">
                <p class="biggest-text">Плей-офф</p>

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
                <b-container v-if="isLoading" class="text-center">
                    <md-progress-spinner class="main-color" md-mode="indeterminate"></md-progress-spinner>
                </b-container>
                <template v-else-if="!isOpen">
                    <b-container class="text-center">
                        <b-col>
                            <i class="material-icons sad-face">sentiment_dissatisfied</i>
                            <p class="bigger-text">Сетка плей-офф не сформирована</p>
                        </b-col>
                    </b-container>
                </template>
                <template v-else v-for="(playoff, index) in playoffs">
                    <b-col v-if="playoff.discipline === discipline" :key="index">
                            <div class="playoff-content text-center" :key="index">
                                <scrollable-container label="Лист. вправо" :size="100" theme="dark">
                                <div class="games-line bottom-vertical mt-auto mr-5">
                                    <playoff-game-cell :game="playoff.games[8]" :hide-buttons="true"
                                                       :playoff="playoff" :on-show="showGame"></playoff-game-cell>
                                    <playoff-game-cell :game="playoff.games[9]" :hide-buttons="true"
                                                       :playoff="playoff" :on-show="showGame"></playoff-game-cell>
                                </div>

                                <div class="games-line mr-5">
                                    <playoff-game-cell :game="playoff.games[3]" :hide-buttons="true"
                                                       :playoff="playoff" :on-show="showGame"></playoff-game-cell>
                                    <playoff-game-cell :game="playoff.games[4]" :hide-buttons="true"
                                                       :playoff="playoff" :on-show="showGame"></playoff-game-cell>
                                    <playoff-game-cell :game="playoff.games[6]" :hide-buttons="true"
                                                       :playoff="playoff" :on-show="showGame"></playoff-game-cell>
                                    <playoff-game-cell :game="playoff.games[7]" :hide-buttons="true"
                                                       :playoff="playoff" :on-show="showGame"></playoff-game-cell>
                                </div>

                                <div class="games-line mr-5 mt-auto mb-auto">
                                    <playoff-game-cell :game="playoff.games[1]" :hide-buttons="true" class="mb-5 pb-5"
                                                       :playoff="playoff" :on-show="showGame"></playoff-game-cell>
                                    <playoff-game-cell :game="playoff.games[5]" :hide-buttons="true" class="mt-5 pt-5"
                                                       :playoff="playoff" :on-show="showGame"></playoff-game-cell>
                                </div>

                                <div class="games-line mr-5 mt-auto mb-auto ml-auto">
                                    <playoff-game-cell :game="playoff.games[0]" :hide-buttons="true" :on-show="showGame"
                                                       class="mb-5 pb-5" :is-final="true" :playoff="playoff"></playoff-game-cell>
                                    <playoff-game-cell :game="playoff.games[2]" :hide-buttons="true" :on-show="showGame"
                                                       class="mt-5 pt-0" :playoff="playoff"></playoff-game-cell>
                                </div>
                                </scrollable-container>
                            </div>
                    </b-col>
                </template>
            </b-container>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import LandingHeader from "@/components/LandingHeader";
    import PlayoffGameCell from "@/components/PlayoffGameCell";
    import GameDialog from "@/components/GameDialog";
    import ScrollableContainer from 'vue-scrollable-container';

    export default {
        name: "LandingPlayoff",
        components: {
            LandingHeader,
            PlayoffGameCell,
            GameDialog,
            ScrollableContainer
        },
        data: function () {
            return {
                discipline: 'CSGO',
                playoffs: [],
                showGameDialog: false,
                currentGame: {},
                isLoading: true,
                isOpen: true
            }
        },
        methods: {
            showGame(game) {
                this.currentGame = game;
                this.showGameDialog = true;
            },
            onShowConfirm() {
                this.showGameDialog = false;
            },
        },
        created() {
            document.title = this.$route.meta.title;
            let db = firebase.firestore();

            db.doc('tournament/settings').get().then((settingsRaw) => {
                this.isOpen = settingsRaw.data().isPlayoffOpen;

                if (this.isOpen) {
                    db.collection("playoff").get().then((response) => {
                        for (let j = 0; j < response.size; j++) {
                            let playoff = response.docs[j].data();

                            let oldGames = playoff.games;
                            let games = [];

                            this.playoffs.push(playoff);
                            for (let i = 0; i < oldGames.length; i++) {
                                games.push(null);
                                let gameRef = oldGames[i];

                                if (gameRef !== null) {
                                    gameRef.get().then((rawGame) => {
                                        let game = rawGame.data();

                                        game.team_first.get().then((firstTeam) => {
                                            game.team_first = firstTeam.data();
                                            game.team_second.get().then((secondTeam) => {
                                                game.team_second = secondTeam.data();

                                                games[i] = game;

                                                this.playoffs[j].games = games;

                                                // Без этого не все команды выводит))))
                                                this.currentGame = game;
                                            });
                                        });
                                    });
                                } else {
                                    this.playoffs[j].games[i] = null;
                                }
                            }
                        }

                        if (response.size === 0) {
                            this.playoffs = [];
                            this.isLoading = false;
                        }
                    });
                }

                this.playoffs = [];
                this.isLoading = false;
            });
        }
    }
</script>

<style scoped>
    html, body {
        max-width: 100%;
        overflow-x: hidden;
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
        min-width: 110%;
        min-height: 12em;
        transform: rotate(-3deg);
        margin-left: -7em;
        transform-origin: 103%;
    }

    .all-content {
        background: url("../assets/main_background.png") center no-repeat;
        background-size: cover;
        max-height: 45em;
        z-index: -1;
        margin-top: -4%;
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

    @media only screen and (max-width: 720px) {
        .biggest-text {
            color: #FFFFFF;
            margin-top: 5.5em;
            font-size: 3em;
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

    .playoff-content {
        width: 100%;
        height: 50%;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
    }

    #select-game{
        margin-left: 2em;
        margin-top: 15.4em;
        padding-top: 3em;
        width: 5em;
        display: inline;
        position: unset;
    }

    .games-line {
        display: inline-block;
        vertical-align: middle;
    }

    .games-line.bottom-vertical {
        vertical-align: bottom;
    }

    .table-header-text {
        margin-bottom: 0;
        font-weight: bold;
        color: #D68956;
        font-size: 2em;
        padding-top: 2em;
        padding-bottom: 1em;
    }

    .header {
        margin-right: 0;
        margin-left: 0;
    }

    .sad-face {
        color: #FFFFFF;
        text-align: center;
        font-size: 5em;
        margin-top: 1em;
    }

    :root {
        --accent-color-dark: #aa7d64;
        --accent-color: #D68956;
    }

    .csgo-back {
        background: url("../assets/csgo.svg") center no-repeat;
    }

    .dota2-back {
        background: url("../assets/dota2.png") center no-repeat;
    }

    .bigger-text {
        color: #FFFFFF;
        font-size: 1.5em;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 2em;
    }

</style>