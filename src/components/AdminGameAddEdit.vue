<template>
    <div class="container-fluid all">

        <admin-menu :is-games-active="true"></admin-menu>
        <div class="right-side">
            <div class="content">
                <div class="rect">
                    <template v-if="sending">
                        <b-container id="add-edit-loader" class="text-center">
                            <md-progress-spinner class="main-color" md-mode="indeterminate"></md-progress-spinner>
                        </b-container>
                    </template>
                    <template v-else>
                        <form novalidate @submit.prevent="saveChanges">
                            <div class="all-fields">
                                <b-col>
                                    <p class="rect-header">Основная информация</p>
                                    <b-row class="fields-row">

                                        <md-field class="field" :class="getValidationClass('bestOf')" >
                                            <label for="best-of">Best of</label>
                                            <md-select name="best-of" id="best-of" v-model="bestOf" md-dense :disabled="isEndGame">
                                                <md-option :value="1">Best of 1</md-option>
                                                <md-option :value="2">Best of 2</md-option>
                                                <md-option :value="3">Best of 3</md-option>
                                                <md-option :value="5">Best of 5</md-option>
                                            </md-select>
                                            <span class="md-error" v-if="!$v.bestOf.required">Выберите количество матчей</span>
                                        </md-field>

                                        <template v-if="isEndGame">
                                            <md-field class="field">
                                                <label for="count-1">Начало матча</label>
                                                <!--FIXME: господи что это за ужас (оно работает, но надо исправить)-->
                                                <md-input name="count-1" :disabled="true" v-model="new Date(dateNumber).toString()"/>
                                            </md-field>
                                        </template>
                                        <template v-else>
                                            <md-datepicker id="datetime" class="field" :class="getValidationClass('dateNumber')" v-model="dateNumber">
                                                <label>Начало матча</label>
                                                <span class="md-error" v-if="!$v.dateNumber.required">Выберите дату начала матча</span>
                                            </md-datepicker>
                                        </template>

                                        <md-field class="field" >
                                            <label for="discipline">Дисциплина</label>
                                            <md-select name="discipline" id="discipline" v-model="game.discipline" md-dense :disabled="isEndGame || isAddToPlayoff || userRole !== 'ADMIN'">
                                                <md-option value="CSGO">CS:GO</md-option>
                                                <md-option value="DOTA2">Dota 2</md-option>
                                            </md-select>
                                        </md-field>

                                        <md-field class="field" :class="getValidationClass('is_ended')" >
                                            <label for="best-of">Статус игры</label>
                                            <md-select name="best-of" id="best-of" v-model="game.is_ended" md-dense :disabled="isEndGame">
                                                <md-option value="true">Игра окончена</md-option>
                                                <md-option value="false">Игра не началась</md-option>
                                            </md-select>
                                            <span class="md-error" v-if="!$v.game.is_ended.required">Статус игры не выбран</span>
                                        </md-field>
                                    </b-row>
                                    <p class="rect-header">Команды</p>
                                    <b-row class="fields-row">
                                        <md-field class="field" :class="getValidationClass('firstTeam')" >
                                            <label for="team-first">Первая команда</label>
                                            <md-select name="team-first" id="team-first" v-model="firstTeam" md-dense :disabled="isEndGame">
                                                <template v-for="(team, index) in teams">
                                                    <template v-if="team.discipline === game.discipline && (team.status === 'CONFIRMED' || team.invisible)">
                                                        <md-option v-if="team.uid !== secondTeam.uid" :value="team.uid" :key="index">
                                                            {{ team.title }}
                                                        </md-option>
                                                    </template>
                                                </template>
                                            </md-select>
                                            <span class="md-error" v-if="!$v.firstTeam.required">Первая команда не выбрана</span>
                                        </md-field>
                                        <md-field class="field" :class="getValidationClass('secondTeam')" >
                                            <label for="team-second">Вторая команда</label>
                                            <md-select name="team-second" id="team-second" v-model="secondTeam" md-dense :disabled="isEndGame">
                                                <template v-for="(team, index) in teams">
                                                    <template v-if="team.discipline === game.discipline && (team.status === 'CONFIRMED' || team.invisible)">
                                                        <md-option v-if="team.uid !== firstTeam.uid" :value="team.uid" :key="index">
                                                            {{ team.title }}
                                                        </md-option>
                                                    </template>
                                                </template>
                                            </md-select>
                                            <span class="md-error" v-if="!$v.secondTeam.required">Вторая команда не выбрана</span>
                                        </md-field>
                                    </b-row>
                                    <p class="rect-header">Игры</p>
                                    <b-row class="fields-row">
                                        <template v-for="n in bestOf">
                                            <div class="field mr-5" :key="n">
                                                <template v-if="game.discipline === 'CSGO'">
                                                    <b-col class="p-0">
                                                        <md-field class="ml-0">
                                                            <label for="map">Карта</label>
                                                            <md-select name="map" id="map" v-model="results[n - 1].map" md-dense>
                                                                <template v-for="(map, index) in maps">
                                                                    <template v-if="!containsMap(map)" >
                                                                        <md-option :value="map" :key="index">
                                                                            {{ map }}
                                                                        </md-option>
                                                                    </template>
                                                                </template>
                                                            </md-select>
                                                        </md-field>
                                                    </b-col>
                                                </template>
                                                <template v-else>
                                                    <p class="player-name">{{ n }} игра</p>
                                                </template>
                                                <b-row :key="n">
                                                    <b-col md="6">
                                                        <md-field class="ml-0">
                                                            <label for="count-1">Счёт 1</label>
                                                            <md-input name="count-1" id="count-1" v-model="results[n - 1].firstCount"/>
                                                        </md-field>
                                                    </b-col>
                                                    <b-col md="6">
                                                        <md-field class="ml-0">
                                                            <label for="count-2">Счёт 2</label>
                                                            <md-input name="count-2" id="count-2" v-model="results[n - 1].secondCount"/>
                                                        </md-field>
                                                    </b-col>
                                                </b-row>
                                            </div>
                                        </template>
                                    </b-row>
                                </b-col>
                            </div>

                            <md-button @click="saveChanges" type="submit" class="md-fab md-primary done-fab">
                                <i class="material-icons icon-fab">done</i>
                            </md-button>

                        </form>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from "firebase/app";
    import {validationMixin} from 'vuelidate';
    import {required} from 'vuelidate/lib/validators';
    import AdminMenu from "@/components/AdminMenu";
    import rules from '../js/rules';

    export default {
        name: "AdminGameAddEdit",
        mixins: [validationMixin],
        components: {
            AdminMenu
        },
        data: function() {
            return {
                game : {},
                bestOf: 1,
                dateNumber: {},
                sending: false,
                teams: [],
                firstTeam : "",
                secondTeam : "",
                maps: rules.maps,
                playoff: {},
                playoffGameId: 0,
                isAddToPlayoff: false,
                isEndGame: false,
                user: firebase.auth().currentUser,
                userRole: "VIEWER"
            }
        },
        created() {
            document.title = this.$route.meta.title;
            this.$material.locale.dateFormat = "dd.MM.yyyy HH:mm";
            let query = this.$route.query;
            let db = firebase.firestore();

            db.doc(`users/${this.user.uid}`).get().then((response) => {
                let raw = response.data();
                this.userRole = raw.role;

                if (this.userRole === 'ADMIN' || this.userRole === 'MODERATOR') {
                    // Если в query нет параметров - редирект на добавление команды
                    if (Object.keys(query).length === 0) {
                        this.$router.replace('/admin/games/add');

                        let game = {};

                        let date = Math.round(Date.now() / 1000);
                        game.uid = date.toString(16).toUpperCase();

                        game.is_ended = false;
                        game.discipline = 'CSGO';

                        let results = [];
                        results.push({map: '', firstCount: '0', secondCount: '0'});
                        game.results = results;
                        this.results = results;

                        this.game = game;
                    } else if (query.uid && !query.end && !query.isGroups) { // Если нажата кнопка "Редактировать команду"
                        let uid = query.uid;

                        db.doc("games/" + uid).get().then((response) => {
                            let game = response.data();

                            let fRef = game.team_first;
                            let sRef = game.team_second;

                            let results = [];

                            if (game.results !== null) {
                                game.results.forEach((it) => {
                                    let counts = it.split(":");
                                    if (game.discipline === 'CSGO') {
                                        results.push({map: counts[0], firstCount: counts[1], secondCount: counts[2]});
                                    } else {
                                        results.push({map: '', firstCount: counts[0], secondCount: counts[1]});
                                    }
                                });
                            } else {
                                for (let i = 0; i < game.best_of; i++) {
                                    results.push({map: '', firstCount: 0, secondCount: 0});
                                }
                            }

                            game.results = results;
                            this.results = results;

                            fRef.get().then((firstTeam) => {
                                this.firstTeam = firstTeam.data().uid;

                                sRef.get().then((secondTeam) => {
                                    this.secondTeam = secondTeam.data().uid;
                                    this.bestOf = game.best_of;
                                    this.dateNumber = game.datetime.seconds * 1000;
                                    this.game = game;
                                });
                            });
                        });
                    } else if (query.uid && query.end || query.playoff && query.playoffGameId && query.end) { // Если нажата кнопка "Закончить матч"
                        let uid = query.uid ? query.uid : query.playoffGameId;
                        this.isEndGame = true;

                        db.doc(`playoff/${query.playoff}`).get().then((response) => {
                            this.playoff = response.data();
                            this.game.discipline = this.playoff.discipline;
                        });

                        db.doc("games/" + uid).get().then((response) => {
                            let game = response.data();

                            let fRef = game.team_first;
                            let sRef = game.team_second;

                            let results = [];

                            if (game.results !== null) {
                                game.results.forEach((it) => {
                                    let counts = it.split(":");
                                    if (game.discipline === 'CSGO') {
                                        results.push({map: counts[0], firstCount: counts[1], secondCount: counts[2]});
                                    } else {
                                        results.push({map: '', firstCount: counts[0], secondCount: counts[1]});
                                    }
                                });
                            } else {
                                for (let i = 0; i < game.best_of; i++) {
                                    results.push({map: '', firstCount: 0, secondCount: 0});
                                }
                            }

                            game.results = results;
                            game.is_ended = true;
                            this.results = results;

                            fRef.get().then((firstTeam) => {
                                this.firstTeam = firstTeam.data().uid;

                                sRef.get().then((secondTeam) => {
                                    this.secondTeam = secondTeam.data().uid;
                                    this.bestOf = game.best_of;
                                    this.dateNumber = game.datetime.seconds * 1000;
                                    this.game = game;
                                });
                            });
                        });
                    } else { // Иначе случай при добавлении команды в плей-офф
                        let game = {};

                        this.isAddToPlayoff = true;

                        let date = Math.round(Date.now() / 1000);
                        game.uid = date.toString(16).toUpperCase();

                        game.is_ended = false;

                        let results = [];
                        results.push({map: '', firstCount: '0', secondCount: '0'});
                        game.results = results;
                        this.results = results;

                        this.game = game;

                        let playoffUid = query.playoff;
                        let gameId = query.playoffGameId;
                        let db = firebase.firestore();

                        this.playoffGameId = gameId;

                        db.doc(`playoff/${playoffUid}`).get().then((response) => {
                            this.playoff = response.data();
                            this.game.discipline = this.playoff.discipline;
                        });
                    }

                    db.collection("teams").get().then((response) => {
                        response.forEach((it) => {
                            this.teams.push(it.data());
                        });
                    });
                } else {
                    this.$router.push('/404');
                }
            });
        },
        methods: {
            getValidationClass (fieldName) {
                let field = this.$v.game[fieldName];

                if (!field) field = this.$v[fieldName];

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            containsMap(map) {
                this.results.forEach((it) => {
                    if (it.map === map) {
                        return true;
                    }
                });

                return false;
            },
            saveGame() {
                let game = this.game;
                let db = firebase.firestore();

                game.datetime = new firebase.firestore.Timestamp(this.dateNumber / 1000, 0);
                game.best_of = parseInt(this.bestOf, 10);
                game.team_first = db.doc(`teams/${this.firstTeam}`);
                game.team_second = db.doc(`teams/${this.secondTeam}`);

                if (!this.isEndGame) {
                    game.is_ended = game.is_ended === "true";
                }

                let countOfZeros = 0;
                let results = [];
                this.results.forEach((it) => {
                    if (game.discipline === 'CSGO') {
                        if (it.map === "") {
                            countOfZeros++;
                        } else {
                            results.push(`${it.map}:${it.firstCount}:${it.secondCount}`);
                        }
                    } else {
                        if (it.firstCount === 0 && it.secondCount === 0) {
                            countOfZeros++;
                        } else {
                            results.push(`${it.firstCount}:${it.secondCount}`);
                        }
                    }
                });

                if (countOfZeros === game.best_of) {
                    game.results = null;
                } else {
                    game.results = results;
                }

                let query = this.$route.query;
                if (query.playoff && query.playoffGameId && this.isAddToPlayoff) {
                    let id = query.playoffGameId;
                    game.isPlayoff = true;
                    // FIXME: Лютый хардкод. Добавлять матчи можно только в первые матчи в сетке
                    if (id === 8 || id === 9 || id === 3 || id === 4) {
                        let playoff = this.playoff;
                        playoff.games[id] = db.doc(`games/${game.uid}`);

                        db.doc(`playoff/${playoff.uid}`).set(playoff);
                    }
                } else if (query.playoff && query.playoffGameId && query.end && !this.isAddToPlayoff) {
                    /*neNadoZapisivatIgruBlyad = true;
                    let result = rules.whoWin(game);
                    let winner = {}, loser = {};

                    console.log(this.game);
                    console.log(this.playoff);

                    switch (result) {
                        case "FIRST_TEAM": {
                            winner = this.game.team_first;
                            loser = this.game.team_second;
                            break;
                        }
                        case "SECOND_TEAM": {
                            winner = this.game.team_second;
                            loser = this.game.team_first;
                            break;
                        }
                        default: break;
                    }

                    // Находим индекс игры в плей-офф сетке
                    let from = -1;
                    let games = this.playoff.games;

                    for (let i = 0; i < games.length; i++) {
                        if (games[i] !== null && games[i].id === this.game.uid) from = i;
                    }

                    // Пушим команду вверх по сетке
                    let indexes = rules.pushNext(from, this.game.discipline);

                    console.log(indexes);

                    let gameWinner = this.playoff.games[indexes.winnerTo];
                    let gameLoser = this.playoff.games[indexes.loserTo];

                    console.log(gameWinner);
                    console.log(gameLoser);

                    // Если победитель есть, то проверяем есть ли уже команда в БД. Если есть - дополняем, если нет - создаём
                    if (indexes.winnerTo !== -1) {
                        if (gameWinner !== null) {
                            /!*gameWinner.team_second = db.doc(`teams/${winner.uid}`);
                            gameWinner.team_first = db.doc(`teams/${gameWinner.team_first.uid}`);*!/
                            gameWinner.team_second = winner;
                            gameWinner.team_first = db.doc(`teams/${gameWinner.team_first.uid}`);
                        } else {
                            gameWinner = this.makeGame(winner, 0);
                        }

                        //db.doc(`games/${gameWinner.uid}`).set(gameWinner);
                    }

                    // Если проигравший есть, то проверяем есть ли уже команда в БД. Если есть - дополняем, если нет - создаём
                    if (indexes.loserTo !== -1) {
                        if (gameLoser !== null) {
                            gameLoser.team_second = loser;
                            gameLoser.team_first = db.doc(`teams/${gameLoser.team_first.uid}`);
                        } else  {
                            gameLoser = this.makeGame(loser, 2);
                        }

                        //db.doc(`games/${gameLoser.uid}`).set(gameLoser);
                    }

                    this.playoff.games[indexes.winnerTo] = gameWinner;
                    this.playoff.games[indexes.loserTo] = gameLoser;

                    //console.log(this.playoff);
                    console.log(gameWinner);
                    console.log(gameLoser);
                    console.log(this.game);*/

                    /*let playoff = this.preparePlayoff();
                    this.writeGame(true);

                    db.doc(`playoff/${playoff.uid}`).set(playoff).then(() => {
                        this.$router.push('/admin/playoff');
                    });*/
                } else if (game.results !== null && this.isEndGame) {
                    let result = rules.whoWin(game);

                    // FIXME: Опять трешовый код
                    switch (result) {
                        case "FIRST_TEAM": {
                            db.doc(`teams/${this.firstTeam}`).get().then(response => {
                                let team = response.data();
                                team.wins++;
                                db.doc(`teams/${team.uid}`).update(team);
                            });

                            db.doc(`teams/${this.secondTeam}`).get().then(response => {
                                let team = response.data();
                                team.loses++;
                                db.doc(`teams/${team.uid}`).update(team);
                            });

                            break;
                        }
                        case "SECOND_TEAM": {
                            db.doc(`teams/${this.firstTeam}`).get().then(response => {
                                let team = response.data();
                                team.loses++;
                                db.doc(`teams/${team.uid}`).update(team);
                            });

                            db.doc(`teams/${this.secondTeam}`).get().then(response => {
                                let team = response.data();
                                team.wins++;
                                db.doc(`teams/${team.uid}`).update(team);
                            });

                            break;
                        }

                        case "BEST_OF_EVEN": {

                            let res = rules.whoWinBestOfEven(game);

                            switch (res) {
                                case "FIRST_TEAM": {
                                    db.doc(`teams/${this.firstTeam}`).get().then(response => {
                                        let team = response.data();
                                        team.wins+=2;
                                        db.doc(`teams/${team.uid}`).update(team);
                                    });

                                    db.doc(`teams/${this.secondTeam}`).get().then(response => {
                                        let team = response.data();
                                        team.loses+=2;
                                        db.doc(`teams/${team.uid}`).update(team);
                                    });

                                    break;
                                }
                                case "SECOND_TEAM": {
                                    db.doc(`teams/${this.firstTeam}`).get().then(response => {
                                        let team = response.data();
                                        team.loses+=2;
                                        db.doc(`teams/${team.uid}`).update(team);
                                    });

                                    db.doc(`teams/${this.secondTeam}`).get().then(response => {
                                        let team = response.data();
                                        team.wins+=2;
                                        db.doc(`teams/${team.uid}`).update(team);
                                    });
                                    break;
                                }

                                case "TIE": {
                                    db.doc(`teams/${this.firstTeam}`).get().then(response => {
                                        let team = response.data();
                                        team.loses++;
                                        team.wins++;
                                        db.doc(`teams/${team.uid}`).update(team);
                                    });

                                    db.doc(`teams/${this.secondTeam}`).get().then(response => {
                                        let team = response.data();
                                        team.wins++;
                                        team.loses++;
                                        db.doc(`teams/${team.uid}`).update(team);
                                    });
                                }
                            }
                            break;
                        }
                        default: break;
                    }
                }

                db.doc(`games/${game.uid}`).set(game).then(() => {
                    this.$router.push('/admin/games');
                });
            },
            saveChanges() {
                this.$v.$touch();

                if (!this.$v.$invalid) {
                    this.sending = true;
                    this.saveGame();
                }
            },
            preparePlayoff: function() {
                let db = firebase.firestore();
                let playoff = this.playoff;

                for (let i = 0; i < playoff.games.length; i++) {
                    if (playoff.games[i] !== null) {
                        playoff.games[i] = db.doc(`games/${playoff.games[i].id}`);
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
                this.game.team_first = db.doc(`teams/${this.game.team_first.id}`);
                this.game.team_second = db.doc(`teams/${this.game.team_second.id}`);


                db.doc(`games/${this.game.uid}`).set(this.game);
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
                    team_first: team,
                    team_second: db.doc(`teams/${this.game.discipline === 'CSGO' ? '5D825287' : '5D825289'}`),
                };
            },
        },
        watch: {
            bestOf: function (val) {
                let res = [];
                for (let i = 0; i < val; i++) {
                    if (i >= this.game.results.length) {
                        res.push({map: '', firstCount: '0', secondCount: '0'});
                    } else {
                        res.push(this.game.results[i]);
                    }
                }

                this.results = res;
            }
        },
        validations: {
            game: {
                discipline: {
                    required
                },
                is_ended: {
                    required
                }
            },
            firstTeam: {
                required,
            },
            secondTeam: {
                required
            },
            bestOf: {
                required
            },
            dateNumber: {
                required
            }
        },
    }
</script>

<style scoped>
    .player-name {
        margin-bottom: 0;
        color: #FFFFFF;
    }

    .all-fields {
        padding: 1em 2em;
    }

    .rect-header {
        margin-left: -1em;
    }

    .field {
        color: #D68956;
        margin-right: 2em;
        width: 20em;
    }

    .fields-row {
        margin-bottom: 2em;
    }

    .done-fab {
        position: fixed;
        bottom: 3em;
        right: 3em;
        background-color: #D68956;
    }

    .icon-fab {
        color: #FFFFFF;
        margin-top: 0.2em;
    }

    #add-edit-loader {
        padding-bottom: 1.5em;
    }
</style>