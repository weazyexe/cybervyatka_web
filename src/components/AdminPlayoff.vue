<template>
    <div class="container-fluid all">

        <router-link to="/admin/playoff/add">
            <md-button class="md-fab md-primary add-fab">
                <i class="material-icons icon-fab">add</i>
            </md-button>
        </router-link>

        <admin-menu :is-playoff-active="true"></admin-menu>
        <b-container class="content">
            <v-stage :config="configKonva">
                <v-layer>
                    <v-rect :config="configGameCell"></v-rect>
                    <v-text :config="configTeamText"></v-text>
                </v-layer>
            </v-stage>
            <!--<b-row class="mx-0">
                <b-col md="2" class="mt-auto mr-5">
                    <playoff-game-cell :game="playoffs[0].games[8]"></playoff-game-cell>
                    <playoff-game-cell :game="playoffs[0].games[9]"></playoff-game-cell>
                </b-col>
                <b-col md="2" class="mr-5">
                    <playoff-game-cell :game="playoffs[0].games[3]"></playoff-game-cell>
                    <playoff-game-cell :game="playoffs[0].games[4]"></playoff-game-cell>
                    <playoff-game-cell :game="playoffs[0].games[6]"></playoff-game-cell>
                    <playoff-game-cell :game="playoffs[0].games[7]"></playoff-game-cell>
                </b-col>
                <b-col md="2" class="mr-5 mt-auto mb-auto">
                    <playoff-game-cell :game="playoffs[0].games[1]" class="mb-5 pb-5"></playoff-game-cell>
                    <playoff-game-cell :game="playoffs[0].games[5]" class="mt-5 pt-5"></playoff-game-cell>
                </b-col>
                <b-col md="2" class="mr-5 mt-auto mb-auto">
                    <playoff-game-cell :game="playoffs[0].games[0]" class="mb-5 pb-5" :is-final="true"></playoff-game-cell>
                    <playoff-game-cell :game="playoffs[0].games[2]" class="mt-5 pt-5"></playoff-game-cell>
                </b-col>
            </b-row>-->
        </b-container>
    </div>
</template>

<script>
    import AdminMenu from "@/components/AdminMenu";
    import firebase from 'firebase';
    import PlayoffGameCell from "@/components/PlayoffGameCell";

    export default {
        name: "AdminGames",
        components: {
            PlayoffGameCell,
            AdminMenu
        },
        data: function() {
            return {
                playoffs: [],
                teams: [],
                games: [],

                configKonva: {
                    width: 1000,
                    height: 1000
                },
                configCircle: {
                    x: 100,
                    y: 100,
                    radius: 70,
                    fill: "red",
                    stroke: "black",
                    strokeWidth: 4
                },
                configGameCell: {
                    x: 100,
                    y: 100,
                    width: 300,
                    height: 100,
                    cornerRadius: 20,
                    fill: "#303030",
                    opacity: 0.7,
                    shadowBlur: 7
                },
                configTeamText: {
                    text: "pizda",
                    fontSize: 15,
                    x: 10,
                    y: 10,
                    fill: "#FFF",
                }
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

                        if (gameRef !== null) {
                            gameRef.get().then((rawGame) => {
                                let game = rawGame.data();

                                game.team_first.get().then((firstTeam) => {
                                    game.team_first = firstTeam.data();
                                    game.team_second.get().then((secondTeam) => {
                                        game.team_second = secondTeam.data();

                                        games[i] = game;
                                        playoff.games = games;
                                    });
                                });
                            });
                        }
                    }

                    oldGames.forEach((gameRef) => {
                        if (gameRef !== null) {
                            gameRef.get().then((rawGame) => {
                                let game = rawGame.data();

                                game.team_first.get().then((firstTeam) => {
                                    game.team_first = firstTeam.data();
                                    game.team_second.get().then((secondTeam) => {
                                        game.team_second = secondTeam.data();

                                        games.push(game);
                                        playoff.games = games;
                                    });
                                });
                            });
                        }
                    });

                    this.playoffs.push(playoff);
                });
            });
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
</style>