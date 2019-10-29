<template>
    <div class="post-content">
        <div class="background">
            <b-container fluid>
                <div class="ml-auto mr-auto">
                    <b-row class="ml-auto mr-auto py-5">
                        <img v-if="discipline === 'CSGO'" src="../assets/csgo-white.png" alt="csgo logo" class="logo ml-auto ml-auto mr-5">
                        <img v-else src="../assets/dota2-white.png" alt="dota 2 logo" class="logo ml-auto ml-auto mr-5">
                        <img src="../assets/logo_clear.png" alt="cv logo" class="logo mr-auto ml-1">
                    </b-row>
                    <b-row>
                        <div class="text-center ml-auto mr-auto">
                            <div class="games-line bottom-vertical mt-auto mr-5">
                                <playoff-game-cell :game="playoff.games[8]" :hide-buttons="true" :game-id="8"></playoff-game-cell>
                                <playoff-game-cell :game="playoff.games[9]" :hide-buttons="true" :game-id="9"></playoff-game-cell>
                            </div>

                            <div class="games-line mr-5">
                                <playoff-game-cell :game="playoff.games[3]" :hide-buttons="true" :game-id="3"></playoff-game-cell>
                                <playoff-game-cell :game="playoff.games[4]" :hide-buttons="true" :game-id="4"></playoff-game-cell>
                                <playoff-game-cell :game="playoff.games[6]" :hide-buttons="true"></playoff-game-cell>
                                <playoff-game-cell :game="playoff.games[7]" :hide-buttons="true"></playoff-game-cell>
                            </div>

                            <div class="games-line mr-5 mt-auto mb-auto">
                                <playoff-game-cell :game="playoff.games[1]" :hide-buttons="true" class="mb-5 pb-5"></playoff-game-cell>
                                <playoff-game-cell :game="playoff.games[5]" :hide-buttons="true" class="mt-5 pt-5"></playoff-game-cell>
                            </div>

                            <div class="games-line mr-5 mt-auto mb-auto ml-auto">
                                <playoff-game-cell :game="playoff.games[0]" :hide-buttons="true" class="mb-5 pb-5" :is-final="true"></playoff-game-cell>
                                <playoff-game-cell :game="playoff.games[2]" :hide-buttons="true" class="mt-5 pt-0"></playoff-game-cell>
                            </div>

                        </div>
                    </b-row>
                    <b-row class="ml-auto mr-auto py-5">
                        <div class="ml-auto mr-auto">
                            <a href="https://vk.com/krdparen_kirov" target="_blank"><img src="../assets/kp.png" alt="krdprn" class="ml-auto mr-3 logo"></a>
                            <img src="../assets/vyatsu.png" alt="vyatsu" class="mx-3 logo">
                            <a href="https://vk.com/pizzaforfriends" target="_blank"><img src="../assets/hleb-and-pizza.png" alt="hleb and pizza" class="mx-3 logo"></a>
                            <img src="../assets/profkom.png" alt="profkom" class="mx-3 logo">
                            <a href="https://vk.com/coffeelike43" target="_blank"><img src="../assets/coffeelike.png" alt="coffee like" class="mx-3 logo"></a>
                            <img src="../assets/adrenalin43.png" alt="adrenalin43" class="ml-2 mr-auto logo">
                        </div>
                    </b-row>
                </div>
            </b-container>
        </div>
    </div>
</template>

<script>

    import firebase from 'firebase';
    import PlayoffGameCell from "@/components/PlayoffGameCell";

    export default {
        name: "AdminPlayoffForPost",
        components: {
            PlayoffGameCell
        },
        data: function () {
            return {
                playoff : {},
                discipline : "CSGO",
                currentGame : {}
            }
        },
        created() {
            let db = firebase.firestore();

            let query = this.$route.query;
            this.discipline = query.discipline;

            db.collection("playoff").get().then((response) => {
                for (let j = 0; j < response.size; j++) {
                    let playoff = response.docs[j].data();

                    if (playoff.discipline === this.discipline) {
                        let oldGames = playoff.games;
                        let games = [];

                        this.playoff = playoff;
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

                                            this.playoff.games = Array.from(games);

                                            this.currentGame = game;
                                        });
                                    });
                                });
                            } else {
                                this.playoff.games[i] = null;
                            }
                        }
                    }
                }
            });
        }
    }
</script>

<style scoped>
    .post-content {
        overflow: hidden;
    }

    .background {
        background: url("../assets/groups-background.jpg") no-repeat;
        background-size: cover;
    }

    .logo {
        height: 3em;
    }

    .playoff-content {
        width: 100%;
        height: 50%;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
    }

    .table-team-text {
        margin-bottom: 0;
        color: #FFFFFF;
        text-align: start;
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