<template>
    <div class="container-fluid all">

        <game-dialog :game="currentGame" :show="showGameDialog" :on-confirm="onShowConfirm"></game-dialog>
        <admin-delete-dialog type="game" deletee=""
                             :show-delete-dialog="showDeleteDialog" :on-confirm="onDeleteConfirm" :on-cancel="onDeleteCancel"></admin-delete-dialog>

        <router-link to="/admin/games/add">
            <md-button class="md-fab md-primary add-fab">
                <i class="material-icons icon-fab">add</i>
            </md-button>
        </router-link>

        <admin-menu :is-games-active="true"></admin-menu>
        <div class="right-side">
            <div class="content">
                <b-container>
                    <b-row>
                        <md-field class="field">
                            <md-icon>games</md-icon>
                            <label for="discipline">Дисциплина</label>
                            <md-select name="discipline" id="discipline" v-model="filter.discipline" md-dense>
                                <md-option value="CSGO">CS:GO</md-option>
                                <md-option value="DOTA2">Dota 2</md-option>
                            </md-select>
                        </md-field>

                        <md-field class="field">
                            <md-icon>people</md-icon>
                            <label for="team">Команда</label>
                            <md-select name="team" id="team" v-model="filter.team" md-dense>
                                <md-option value="">Команда</md-option>
                                <template v-for="(team, index) in teams">
                                    <template v-if="(team.discipline === filter.discipline || filter.discipline === '') && team.status === 'CONFIRMED'">
                                        <md-option :key="index" :value="team.uid">{{ team.title }}</md-option>
                                    </template>
                                </template>
                            </md-select>
                        </md-field>

                        <md-datepicker class="field" v-model="filter.date">
                            <label>Дата</label>
                        </md-datepicker>
                    </b-row>
                </b-container>

                <template v-if="isLoading">
                    <b-container class="text-center">
                        <md-progress-spinner class="main-color" md-mode="indeterminate"></md-progress-spinner>
                    </b-container>
                </template>
                <template v-else-if="games.length === 0">
                    <b-container class="text-center">
                        <b-col>
                            <i class="material-icons sad-face">sentiment_dissatisfied</i>
                            <p class="bigger-text">Игр не найдено</p>
                        </b-col>
                    </b-container>
                </template>
                <template v-else>
                    <template v-if="games.filter(it => it.is_ended === false).length !== 0">
                        <div class="rect">
                            <p class="rect-header">Предстоящие игры</p>
                            <template v-for="(game, index) in sortedGamesByDate">
                                <template v-if="!game.is_ended && (filter.team === game.team_first.uid
                                            || filter.team === game.team_second.uid || filter.team === '')
                                            && (filter.discipline === game.discipline || filter.discipline === '')
                                            && (isDatesEquals(game) || !(filter.date instanceof Date))">
                                    <div class="team" v-bind:key="index">
                                        <admin-game-entry :on-edit="editGame"
                                                          :on-delete="deleteGame"
                                                          :on-show="showGame"
                                                          :on-complete="endGame"
                                                          :game="game">
                                        </admin-game-entry>
                                    </div>
                                </template>
                            </template>
                        </div>
                    </template>

                    <template v-if="containsEnded">
                        <div class="rect">
                            <p class="rect-header">Прошедшие игры</p>
                            <template v-for="(game, index) in sortedGamesByDate">
                                <template v-if="game.is_ended && (filter.team === game.team_first.uid
                                            || filter.team === game.team_second.uid || filter.team === '')
                                            && (filter.discipline === game.discipline || filter.discipline === '')
                                            && (isDatesEquals(game) || !(filter.date instanceof Date))">
                                    <div class="team" v-bind:key="index">
                                        <admin-game-entry :on-edit="editGame"
                                                          :on-delete="deleteGame"
                                                          :on-show="showGame"
                                                          :game="game">
                                        </admin-game-entry>
                                    </div>
                                </template>
                            </template>
                        </div>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import AdminMenu from "@/components/AdminMenu";
    import AdminGameEntry from "@/components/AdminGameEntry";
    import firebase from 'firebase';
    import GameDialog from "@/components/GameDialog";
    import AdminDeleteDialog from "@/components/AdminDeleteDialog";

    export default {
        name: "AdminGames",
        components: {
            AdminDeleteDialog,
            GameDialog,
            AdminGameEntry,
            AdminMenu
        },
        data: function () {
            return {
                games: [],
                currentGame : {},
                showGameDialog : false,
                showDeleteDialog : false,
                filter: {
                    discipline : "CSGO",
                    team: "",
                    date: Number
                },
                teams: [],
                isLoading: true
            }
        },
        created() {
            document.title = this.$route.meta.title;
            this.$material.locale.dateFormat = "dd.MM.yyyy";
            let db = firebase.firestore();

            db.collection("games").get().then((response) => {

                if (response.docs.length === 0) {
                    this.isLoading = false;
                } else {
                    response.forEach((doc) => {
                        let game = doc.data();

                        let fRef = game.team_first;
                        let sRef = game.team_second;

                        fRef.get().then((firstTeam) => {
                            game.team_first = firstTeam.data();

                            sRef.get().then((secondTeam) => {
                                game.team_second = secondTeam.data();
                                this.games.push(game);
                                this.isLoading = false;

                                this.games = this.games.sort((a, b) => {
                                    if (a.datetime.seconds > b.datetime.seconds) return 1;
                                    else if (a.datetime.seconds < b.datetime.seconds) return -1;
                                    else return 0;
                                });
                            });
                        });
                    });
                }
            });

            db.collection("teams").get().then((response) => {
                response.forEach((it) => {
                    this.teams.push(it.data());
                });
            });
        },
        methods: {
            editGame(game) {
                this.currentGame = game;
                this.$router.push({ path: '/admin/games/edit',  query : { uid: game.uid } });
            },
            showGame(game) {
                this.currentGame = game;
                this.showGameDialog = true;
            },
            onShowConfirm() {
               this.showGameDialog = false;
            },
            endGame(game) {
                let uid = game.uid;

                this.$router.push({
                    path: '/admin/games/edit',
                    query: {
                        uid: uid,
                        end: true,
                        isGroups: true
                    }
                });
            },
            deleteGame(game) {
                this.currentGame = game;
                this.showDeleteDialog = true;
            },
            onDeleteConfirm() {
                this.showDeleteDialog = false;
                let db = firebase.firestore();

                this.games = this.games.filter((it) => it.uid !== this.currentGame.uid);

                db.doc(`games/${this.currentGame.uid}`).delete();
            },
            onDeleteCancel() {
                this.showDeleteDialog = false;
            },
            isDatesEquals(game) {
                let date = new Date(game.datetime.toDate().setHours(0, 0, 0, 0));
                let filterDate = new Date(new Date(this.filter.date).setHours(0, 0, 0 ,0));

                return date.getTime() === filterDate.getTime();
            }
        },
        computed: {
            containsEnded: function () {
                if (typeof(this.games) !== undefined || this.games !== null) {
                    for (let i = 0; i < this.games.length; i++) {
                        if (this.games[i].is_ended) {
                            return true;
                        }
                    }
                }
                return false;
            },
            sortedGamesByDate: function () {
                if (typeof(this.games) !== undefined || this.games !== null) {
                    let games = this.games;
                    return games.sort((a, b) => {
                        if (a.datetime.seconds > b.datetime.seconds) return 1;
                        else if (a.datetime.seconds < b.datetime.seconds) return -1;
                        else return 0;
                    });
                }

                return [];
            }
        }
    }
</script>

<style scoped>
    .add-fab {
        position: fixed;
        bottom: 3em;
        right: 3em;
        background-color: #D68956;
        color: #FFFFFF;
    }

    .rect {
        margin: 2em;
    }

    .icon-fab {
        color: #FFFFFF;
        margin-top: 0.2em;
    }

    .field {
        color: #D68956;
        margin-right: 2em;
        width: 20em;
    }

    .bigger-text {
        color: #FFFFFF;
        font-size: 1.5em;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 2em;
    }

    .sad-face {
        color: #FFFFFF;
        text-align: center;
        font-size: 5em;
    }
</style>