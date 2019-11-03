<template>
    <div class="container-fluid all">

        <game-dialog :game="currentGame" :show="showGameDialog" :on-confirm="onShowConfirm"></game-dialog>
        <game-complete-dialog :game="currentGame" :playoff="currentPlayoff" :show-dialog="showPushDialog" :on-confirm="onConfirmPush"></game-complete-dialog>

        <admin-menu :is-playoff-active="true"></admin-menu>
        <div class="content">
            <template v-for="(playoff, index) in playoffs">
                <b-col :key="index">
                    <p class="table-header-text text-center" :key="index">Сетка {{ playoff.discipline === 'CSGO' ? 'CS:GO' : 'Dota 2' }}</p>
                    <div class="playoff-content text-center" :key="index">
                        <div class="games-line bottom-vertical mt-auto mr-5">
                            <playoff-game-cell :game="playoff.games[8]" :hide-buttons="userRole !== 'ADMIN' && userRole !== 'MODERATOR'"
                                               :on-show="showGame" :on-edit="editGame" :game-id="8" :on-add="addGame"
                                               :on-push="pushGameNext" :playoff="playoff"></playoff-game-cell>
                            <playoff-game-cell :game="playoff.games[9]" :hide-buttons="userRole !== 'ADMIN' && userRole !== 'MODERATOR'"
                                               :on-show="showGame" :on-edit="editGame" :game-id="9" :on-add="addGame"
                                               :on-push="pushGameNext" :playoff="playoff"></playoff-game-cell>
                        </div>

                        <div class="games-line mr-5">
                            <playoff-game-cell :game="playoff.games[3]" :hide-buttons="userRole !== 'ADMIN' && userRole !== 'MODERATOR'"
                                               :on-show="showGame" :on-edit="editGame" :game-id="3" :on-add="addGame"
                                               :on-push="pushGameNext" :playoff="playoff"></playoff-game-cell>
                            <playoff-game-cell :game="playoff.games[4]" :hide-buttons="userRole !== 'ADMIN' && userRole !== 'MODERATOR'"
                                               :on-show="showGame" :on-edit="editGame" :game-id="4" :on-add="addGame"
                                               :on-push="pushGameNext" :playoff="playoff"></playoff-game-cell>
                            <playoff-game-cell :game="playoff.games[6]" :hide-buttons="userRole !== 'ADMIN' && userRole !== 'MODERATOR'"
                                               :on-show="showGame" :on-edit="editGame"
                                               :on-push="pushGameNext" :playoff="playoff"></playoff-game-cell>
                            <playoff-game-cell :game="playoff.games[7]" :hide-buttons="userRole !== 'ADMIN' && userRole !== 'MODERATOR'"
                                               :on-show="showGame" :on-edit="editGame"
                                               :on-push="pushGameNext" :playoff="playoff"></playoff-game-cell>
                        </div>

                        <div class="games-line mr-5 mt-auto mb-auto">
                            <playoff-game-cell :game="playoff.games[1]" :hide-buttons="userRole !== 'ADMIN' && userRole !== 'MODERATOR'" class="mb-5 pb-5"
                                               :on-show="showGame" :on-edit="editGame"
                                               :on-push="pushGameNext" :playoff="playoff"></playoff-game-cell>
                            <playoff-game-cell :game="playoff.games[5]" :hide-buttons="userRole !== 'ADMIN' && userRole !== 'MODERATOR'" class="mt-5 pt-5"
                                               :on-show="showGame" :on-edit="editGame"
                                               :on-push="pushGameNext" :playoff="playoff"></playoff-game-cell>
                        </div>

                        <div class="games-line mr-5 mt-auto mb-auto ml-auto">
                            <playoff-game-cell :game="playoff.games[0]" :hide-buttons="userRole !== 'ADMIN' && userRole !== 'MODERATOR'" :on-edit="editGame"
                                               :on-show="showGame" :on-push="pushGameNext"
                                               class="mb-5 pb-5" :is-final="true" :playoff="playoff"></playoff-game-cell>
                            <playoff-game-cell :game="playoff.games[2]" :hide-buttons="userRole !== 'ADMIN' && userRole !== 'MODERATOR'" :on-edit="editGame"
                                               :on-show="showGame" :on-push="pushGameNext"
                                               class="mt-5 pt-0" :playoff="playoff"></playoff-game-cell>
                        </div>

                    </div>
                </b-col>
            </template>
        </div>
    </div>
</template>

<script>
    import AdminMenu from "@/components/AdminMenu";
    import firebase from 'firebase';
    import PlayoffGameCell from "@/components/PlayoffGameCell";
    import GameDialog from "@/components/GameDialog";
    import GameCompleteDialog from "@/components/GameCompleteDialog";

    export default {
        name: "AdminGames",
        components: {
            GameCompleteDialog,
            PlayoffGameCell,
            AdminMenu,
            GameDialog
        },
        data: function() {
            return {
                playoffs: [],
                teams: [],
                games: [],
                currentGame: {},
                currentPlayoff: {},
                showGameDialog: false,
                showPushDialog: false,
                user: firebase.auth().currentUser,
                userRole: "VIEWER"
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
            editGame(game) {
                this.$router.push({ path: '/admin/games/edit', query: {uid: game.uid} });
            },
            pushGameNext(game, playoff) {
                this.currentGame = game;
                this.currentPlayoff = playoff;
                this.showPushDialog = true;

                //this.$router.push({ path: '/admin/games/edit', query: { playoff: playoff.uid, playoffGameId: game.uid, end: true } });
            },
            onConfirmPush() {
                this.showPushDialog = false;
            },
            addGame(playoff, id) {
                this.$router.push({ path: '/admin/games/add', query: { playoff: playoff.uid, playoffGameId: id } });
            }
        },
        created() {
            document.title = this.$route.meta.title;
            let db = firebase.firestore();

            db.doc(`users/${this.user.uid}`).get().then((response) => {
                let raw = response.data();
                this.userRole = raw.role;
            });

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

                                        this.playoffs[j].games = Array.from(games);
                                    });
                                });
                            });
                        } else {
                            this.playoffs[j].games[i] = null;
                        }
                    }
                }
            });
        }
    }
</script>

<style scoped>
    .playoff-content {
        width: 100%;
        height: 50%;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
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
</style>