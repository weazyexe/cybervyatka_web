<template>
    <div class="container-fluid all">

        <game-dialog :game="currentGame" :show="showGameDialog" :on-confirm="onShowConfirm"></game-dialog>

        <router-link to="/admin/games/add">
            <md-button class="md-fab md-primary add-fab">
                <md-icon>add</md-icon>
            </md-button>
        </router-link>

        <admin-menu :is-games-active="true"></admin-menu>
        <div class="right-side">
            <div class="content">
                <template v-if="games.length === 0">
                    <b-container class="text-center">
                        <md-progress-spinner class="main-color" md-mode="indeterminate"></md-progress-spinner>
                    </b-container>
                </template>
                <template v-else>
                    <template>
                        <div class="rect">
                            <p class="rect-header">Предстоящие игры</p>
                            <template v-for="(game, index) in games">
                                <template v-if="!game.is_ended">
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
                    <template>
                        <div class="rect">
                            <p class="rect-header">Прошедшие игры</p>
                            <template v-for="(game, index) in games">
                                <template v-if="game.is_ended">
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

    export default {
        name: "AdminGames",
        components: {
            GameDialog,
            AdminGameEntry,
            AdminMenu
        },
        data: function () {
            return {
                games: [],
                currentGame : {},
                showGameDialog : false
            }
        },
        created() {
            let db = firebase.firestore();

            db.collection("games").get().then((response) => {

                response.forEach((doc) => {
                    let game = doc.data();

                    let fRef = game.team_first;
                    let sRef = game.team_second;

                    fRef.get().then((firstTeam) => {
                        game.team_first = firstTeam.data();

                        sRef.get().then((secondTeam) => {
                            game.team_second = secondTeam.data();
                            this.games.push(game);
                        });
                    });


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
            deleteGame(game) {
                // eslint-disable-next-line no-console
                console.log(game);
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
</style>