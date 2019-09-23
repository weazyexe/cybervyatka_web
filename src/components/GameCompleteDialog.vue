<template>
    <div>
        <md-dialog class="game-dialog" :md-active="showDialog">

            <template v-if="isLoading">
                <b-container class="text-center mt-2 mb-2">
                    <md-progress-spinner class="main-color" md-mode="indeterminate"></md-progress-spinner>
                </b-container>
            </template>
            <template v-else>
                <team-dialog :team="currentTeam" :show="showTeamDialog" :show-contacts="false" :on-confirm="onConfirmShow"></team-dialog>

                <b-col class="text-center">
                    <img class="modal-logo rounded-circle" v-if="game.team_first.logo === ''" src="../assets/logo_placeholder.png"
                         alt="team_logo" @click="showTeam(game.team_first)"/>
                    <img class="modal-logo rounded-circle" v-else :src="game.team_first.logo"
                         alt="team_logo" @click="showTeam(game.team_first)"/>

                    <img class="modal-logo rounded-circle" v-if="game.team_second.logo === ''" src="../assets/logo_placeholder.png"
                         alt="team_logo" @click="showTeam(game.team_second)"/>
                    <img class="modal-logo rounded-circle" v-else :src="game.team_second.logo"
                         alt="team_logo" @click="showTeam(game.team_second)"/>

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
                    <b-row>
                        <template v-for="(result, index) in results">
                            <div :key="index">
                                <template v-if="game.discipline === 'CSGO'">
                                    <p class="player-name">{{ result.map }}</p>
                                </template>
                                <template v-else>
                                    <p class="player-name">{{ index }} игра</p>
                                </template>
                                <b-row :key="index" class="field">
                                    <b-col>
                                        <md-field class="ml-0">
                                            <label for="count-1">Счёт {{ game.team_first.title }}</label>
                                            <md-input name="count-1" id="count-1" v-model="result.firstCount"/>
                                        </md-field>
                                    </b-col>
                                    <b-col>
                                        <md-field class="ml-0">
                                            <label for="count-2">Счёт {{ game.team_second.title }}</label>
                                            <md-input name="count-2" id="count-2" v-model="result.secondCount"/>
                                        </md-field>
                                    </b-col>
                                </b-row>
                            </div>
                        </template>
                    </b-row>
                </b-col>

                <md-dialog-actions>
                    <md-button class="md-primary dialog-button" @click="onConfirmPush">ГОТОВО</md-button>
                </md-dialog-actions>
            </template>
        </md-dialog>
    </div>
</template>

<script>
    import TeamDialog from "@/components/TeamDialog";
    import firebase from 'firebase';
    import rules from '../js/playoff-rules';

    export default {
        name: "GameCompleteDialog",
        components: {
            TeamDialog
        },
        props: {
            game: Object,
            playoff: Object,
            showDialog: Boolean,
            onConfirm: Function
        },
        data: function () {
            return {
                maps: [
                    "de_dust2", "de_inferno", "de_nuke", "de_mirage", "de_train", "de_overpass", "de_vertigo"
                ],
                results: [],
                currentTeam: {},
                showTeamDialog: false,
                isLoading: false
            }
        },
        watch: {
            showDialog: function () {
                let results = [];
                this.game.results.forEach((it) => {
                    let res = it.split(':');
                    if (this.game.discipline === 'CSGO') {
                        results.push({map: res[0], firstCount: res[1], secondCount: res[2]});
                    } else {
                        results.push({ firstCount: res[0], secondCount: res[1]});
                    }
                });


                this.results = results;
            }
        },
        computed: {
            parsedDate: function() {
                let game = this.game;

                let day = game.datetime.toDate().getDate();
                if (day < 10) day = '0' + day;

                let month = game.datetime.toDate().getMonth() + 1;
                if (month < 10) month = '0' + month;

                let year = game.datetime.toDate().getFullYear();

                return day + '.' + month + '.' + year;
            }
        },
        methods: {
            showTeam(team) {
                this.currentTeam = team;
                this.showTeamDialog = true;
            },
            onConfirmShow() {
                this.showTeamDialog = false;
            },
            onConfirmPush() {
                //this.isLoading = true;

                let hasNotEndedGames = false;
                let firstCount = 0, secondCount = 0;
                let db = firebase.firestore();

                // Считаем у кого больше побед
                this.results.forEach((it) => {
                    if (parseInt(it.firstCount) > parseInt(it.secondCount)) firstCount++;
                    else if (parseInt(it.firstCount) < parseInt(it.secondCount)) secondCount++;
                });

                if (firstCount + secondCount === this.game.best_of) hasNotEndedGames = false;
                else hasNotEndedGames = !(firstCount > this.game.best_of / 2 || secondCount > this.game.best_of / 2);


                if (!hasNotEndedGames) {
                    // Соответственно присваиваем команды - winner & loser
                    let winner = {}, loser = {};

                    if (firstCount > secondCount) {
                        winner = this.game.team_first;
                        loser = this.game.team_second;
                    } else {
                        winner = this.game.team_second;
                        loser = this.game.team_first;
                    }


                    // Находим индекс игры в плей-офф сетке
                    let from = -1;
                    let games = this.playoff.games;

                    for (let i = 0; i < games.length; i++) {
                        if (games[i] !== null && games[i].uid === this.game.uid) from = i;
                    }

                    // Пушим команду вверх по сетке
                    let indexes = rules.pushNext(winner, loser, from);

                    let gameWinner = this.playoff.games[indexes.winnerTo];
                    let gameLoser = this.playoff.games[indexes.loserTo];

                    console.log("winner game");
                    console.log(gameWinner);
                    console.log("loser game");
                    console.log(gameLoser);

                    // Если победитель есть, то проверяем есть ли уже команда в БД. Если есть - дополняем, если нет - создаём
                    if (indexes.winnerTo !== -1) {
                        if (gameWinner !== null) {
                            gameWinner.team_second = db.doc(`teams/${winner.uid}`);
                            gameWinner.team_first = db.doc(`teams/${gameWinner.team_first.uid}`);

                            console.log("winner game if winnerTo != -1 && gameWinner != null");
                            console.log(gameWinner);
                        } else {
                            gameWinner = this.makeGame(winner, 0);
                            console.log("winner game if gameWinner == null");
                            console.log(gameWinner);
                        }

                        db.doc(`games/${gameWinner.uid}`).set(gameWinner);
                    }

                    // Если проигравший есть, то проверяем есть ли уже команда в БД. Если есть - дополняем, если нет - создаём
                    if (indexes.loserTo !== -1) {
                        if (gameLoser !== null) {
                            gameLoser.team_second = db.doc(`teams/${loser.uid}`);
                            gameLoser.team_first = db.doc(`teams/${gameLoser.team_first.uid}`);

                            console.log("loser game if loserTo != -1 && gameLoser != null");
                            console.log(gameLoser);
                        } else  {
                            gameLoser = this.makeGame(loser, 2);

                            console.log("loser game if gameLoser == null");
                            console.log(gameLoser);
                        }

                        db.doc(`games/${gameLoser.uid}`).set(gameLoser);
                    }

                    this.playoff.games[indexes.winnerTo] = gameWinner;
                    this.playoff.games[indexes.loserTo] = gameLoser;



                    let playoff = this.preparePlayoff();
                    this.writeGame(true);
                    console.log("final playoff");
                    console.log(playoff);

                    db.doc(`playoff/${playoff.uid}`).set(playoff).then(() => {
                        this.onConfirm();
                        this.isLoading = false;
                    });
                } else {
                    this.writeGame(false);
                    this.onConfirm();
                }
            },
            makeGame: function(team, addon) {
                // addon - штучка, чтобы ID разные были. Т.к. программа быстро выполняется
                // и двум новым матчам генерируется одинаковый ID.
                let date = Math.round((Date.now() + addon * 1000) / 1000);
                let uid = date.toString(16).toUpperCase();
                let db = firebase.firestore();

                return {
                    uid: uid,
                    best_of: 1,
                    results: null,
                    discipline: team.discipline,
                    is_ended: false,
                    datetime: new firebase.firestore.Timestamp(Math.round((Date.now() + 86400000) / 1000)),
                    team_first: db.doc(`teams/${team.uid}`),
                    team_second: db.doc(`teams/${team.discipline === 'CSGO' ? '5D825287' : '5D825289'}`),
                };
            },
            preparePlayoff: function() {
                let db = firebase.firestore();
                let playoff = this.playoff;

                for (let i = 0; i < playoff.games.length; i++) {
                    if (playoff.games[i] !== null) {
                        playoff.games[i] = db.doc(`games/${playoff.games[i].uid}`);
                    }
                }

                return playoff;
            },
            writeGame: function (isEnded) {
                let db = firebase.firestore();

                this.game.is_ended = isEnded;
                let results = [];
                this.results.forEach((it) => {
                    if (this.game.discipline === 'CSGO') {
                        results.push(`${it.map}:${it.firstCount}:${it.secondCount}`);
                    } else {
                        results.push(`${it.firstCount}:${it.secondCount}`);
                    }
                });

                if (results.length === 0) results = null;

                this.game.results = results;
                this.game.team_first = db.doc(`teams/${this.game.team_first.uid}`);
                this.game.team_second = db.doc(`teams/${this.game.team_second.uid}`);


                db.doc(`games/${this.game.uid}`).set(this.game);
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

    .field {
        width: 8em;
        margin: 1em;
    }

    .player-name {
        margin-bottom: 0;
        color: #FFFFFF;
    }

    .game-dialog {
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