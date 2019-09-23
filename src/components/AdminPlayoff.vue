<template>
    <div class="container-fluid all">

        <game-dialog :game="currentGame" :show="showGameDialog" :on-confirm="onShowConfirm"></game-dialog>
        <game-complete-dialog :game="currentGame" :playoff="currentPlayoff" :show-dialog="showPushDialog" :on-confirm="onConfirmPush"></game-complete-dialog>

        <admin-menu :is-playoff-active="true"></admin-menu>
        <div class="content">
            <div class="playoff-content text-center">

                <div class="games-line bottom-vertical mt-auto mr-5">
                    <playoff-game-cell :game="playoffs[0].games[8]" :hide-buttons="false"
                                       :on-show="showGame" :on-edit="editGame"
                                       :on-push="pushGameNext" :playoff="playoffs[0]"></playoff-game-cell>
                    <playoff-game-cell :game="playoffs[0].games[9]" :hide-buttons="false"
                                       :on-show="showGame" :on-edit="editGame"
                                       :on-push="pushGameNext" :playoff="playoffs[0]"></playoff-game-cell>
                </div>

                <div class="games-line mr-5">
                    <playoff-game-cell :game="playoffs[0].games[3]" :hide-buttons="false"
                                       :on-show="showGame" :on-edit="editGame"
                                       :on-push="pushGameNext" :playoff="playoffs[0]"></playoff-game-cell>
                    <playoff-game-cell :game="playoffs[0].games[4]" :hide-buttons="false"
                                       :on-show="showGame" :on-edit="editGame"
                                       :on-push="pushGameNext" :playoff="playoffs[0]"></playoff-game-cell>
                    <playoff-game-cell :game="playoffs[0].games[6]" :hide-buttons="false"
                                       :on-show="showGame" :on-edit="editGame"
                                       :on-push="pushGameNext" :playoff="playoffs[0]"></playoff-game-cell>
                    <playoff-game-cell :game="playoffs[0].games[7]" :hide-buttons="false"
                                       :on-show="showGame" :on-edit="editGame"
                                       :on-push="pushGameNext" :playoff="playoffs[0]"></playoff-game-cell>
                </div>

                <div class="games-line mr-5 mt-auto mb-auto">
                    <playoff-game-cell :game="playoffs[0].games[1]" :hide-buttons="false" class="mb-5 pb-5"
                                       :on-show="showGame" :on-edit="editGame"
                                       :on-push="pushGameNext" :playoff="playoffs[0]"></playoff-game-cell>
                    <playoff-game-cell :game="playoffs[0].games[5]" :hide-buttons="false" class="mt-5 pt-5"
                                       :on-show="showGame" :on-edit="editGame"
                                       :on-push="pushGameNext" :playoff="playoffs[0]"></playoff-game-cell>
                </div>

                <div class="games-line mr-5 mt-auto mb-auto ml-auto">             
                    <playoff-game-cell :game="playoffs[0].games[0]" :hide-buttons="false" :on-edit="editGame"
                                       :on-show="showGame" :on-push="pushGameNext"
                                       class="mb-5 pb-5" :is-final="true" :playoff="playoffs[0]"></playoff-game-cell>
                    <playoff-game-cell :game="playoffs[0].games[2]" :hide-buttons="false" :on-edit="editGame"
                                       :on-show="showGame" :on-push="pushGameNext"
                                       class="mt-5 pt-0" :playoff="playoffs[0]"></playoff-game-cell>
                </div>

            </div>
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
                showPushDialog: false
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
            },
            onConfirmPush() {
                this.showPushDialog = false;
            }
        },
        created() {
            let db = firebase.firestore();

            db.collection("playoff").get().then((response) => {
                response.forEach((rawPlayoff) => {
                    let playoff = rawPlayoff.data();


                    let oldGames = playoff.games;
                    let games = [];

                    for (let i = 0; i < oldGames.length; i++) {
                        games.push(null);
                        let gameRef = oldGames[i];

                        console.log(gameRef);

                        if (gameRef !== null) {
                            gameRef.get().then((rawGame) => {
                                let game = rawGame.data();



                                game.team_first.get().then((firstTeam) => {
                                    game.team_first = firstTeam.data();
                                    game.team_second.get().then((secondTeam) => {
                                        game.team_second = secondTeam.data();

                                        games[i] = game;
                                        playoff.games = games;

                                        this.playoffs.push(playoff);

                                        console.log(this.playoffs);
                                    });
                                });
                            });
                        } else {
                            playoff.games[i] = null;
                            this.playoffs.push(playoff);
                        }
                    }
                });
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
</style>