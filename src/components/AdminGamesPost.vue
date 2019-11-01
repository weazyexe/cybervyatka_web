<template>
    <div class="post-content">
        <div class="background">
            <b-container>
                <div class="ml-auto mr-auto">
                    <b-row class="ml-auto mr-auto py-5">
                        <img v-if="discipline === 'CSGO'" src="../assets/csgo-white.png" alt="csgo logo" class="game-logo ml-auto ml-auto mr-5">
                        <img v-else src="../assets/dota2-white.png" alt="dota 2 logo" class="game-logo ml-auto ml-auto mr-5">
                        <img src="../assets/logo_clear.png" alt="cv logo" class="game-logo mr-auto ml-1">
                    </b-row>
                    <b-col>
                        <template v-for="(game, index) in games"> {
                            <div :key="index">
                                <b-row class="mb-4">
                                    <b-col md="4">
                                        <b-row>
                                            <p class="mr-4 ml-auto mt-auto mb-auto" :class="game.team_first.title.length >= 16 ? 'team-name-small' : 'team-name'">{{ game.team_first.title }}</p>
                                            <img v-if="game.team_first.logo === null || game.team_first.logo === ''" src="../assets/logo_placeholder.png" alt="logo1" class="logo rounded-circle">
                                            <img v-else :src="game.team_first.logo" alt="logo1" class="logo rounded-circle mr-0">
                                            <p v-if="getFirstTeamCount(game) !== 0 || getSecondTeamCount(game) !== 0" class="versus bold-colored mt-auto mb-auto ml-5">{{ getFirstTeamCount(game) }}</p>
                                        </b-row>
                                    </b-col>

                                    <b-col md="4" class="text-center">
                                        <p class="versus">VS</p>
                                        <p class="date-text">{{ parseTime(game.datetime.toDate()) }}</p>
                                    </b-col>

                                    <b-col md="4">
                                        <b-row>
                                            <p v-if="getFirstTeamCount(game) !== 0 || getSecondTeamCount(game) !== 0" class="versus bold-colored mt-auto mb-auto mr-5">{{ getSecondTeamCount(game) }}</p>
                                            <img v-if="game.team_second.logo === null || game.team_second.logo === ''" src="../assets/logo_placeholder.png" alt="logo2" class="logo rounded-circle">
                                            <img v-else :src="game.team_second.logo" alt="logo2" class="logo rounded-circle ml-0">
                                            <p class="ml-4 mr-auto mt-auto mb-auto" :class="game.team_second.title.length >= 16 ? 'team-name-small' : 'team-name'"> {{ game.team_second.title }} </p>
                                        </b-row>
                                    </b-col>
                                </b-row>
                            </div>
                        </template>
                    </b-col>
                    <admin-partners-post/>
                </div>
            </b-container>
        </div>
    </div>
</template>

<script>

    import firebase from 'firebase';
    import AdminPartnersPost from "@/components/AdminPartnersPost";


    export default {
        name: "AdminTodayGamesPost",
        components: {AdminPartnersPost},
        data: function() {
            return {
                games: [],
                discipline: "CSGO"
            }
        },
        methods: {
            parseTime: function(date) {
                let hours = date.getHours();
                if (hours < 10) hours = '0' + hours;

                let minutes = date.getMinutes();
                if (minutes < 10) minutes = '0' + minutes;

                return `${hours}:${minutes}`;
            },
            getFirstTeamCount(game) {
                let results = [];

                if (game.results) {
                    game.results.forEach(it => {
                        let res = it.split(":");
                        if (game.discipline === 'CSGO') {
                            results.push({map: res[0], firstCount: parseInt(res[1]), secondCount:parseInt(res[2])});
                        } else {
                            results.push({firstCount: parseInt(res[0]), secondCount:parseInt(res[1])});
                        }
                    });
                } else {
                    return 0;
                }

                let counter = 0;

                results.forEach(it => {
                    if (it.firstCount > it.secondCount) counter++;
                });
                return counter;
            },
            getSecondTeamCount(game) {
                let results = [];

                if (game.results) {
                    game.results.forEach(it => {
                        let res = it.split(":");
                        if (game.discipline === 'CSGO') {
                            results.push({map: res[0], firstCount: parseInt(res[1]), secondCount:parseInt(res[2])});
                        } else {
                            results.push({firstCount: parseInt(res[0]), secondCount:parseInt(res[1])});
                        }
                    });
                } else {
                    return 0;
                }

                let counter = 0;

                results.forEach(it => {
                    if (it.firstCount < it.secondCount) counter++;
                });

                return counter;
            }
        },
        created() {
            let db = firebase.firestore();

            let query = this.$route.query;
            this.discipline = query.discipline;
            let day = query.day;
            let month = query.month;
            let year = query.year;

            db.collection("games").get().then((response) => {

                if (response.docs.length === 0) {
                    // eslint-disable-next-line no-console
                    console.log("empty response bruh");
                } else {
                    response.forEach((doc) => {
                        let game = doc.data();

                        let fRef = game.team_first;
                        let sRef = game.team_second;

                        let gameDate = game.datetime.toDate();

                        let parsedGameDate = `${gameDate.getDate()}.${gameDate.getMonth() + 1}.${gameDate.getFullYear()}`;
                        let parsedQueryDate = `${day}.${month}.${year}`;

                        if (parsedGameDate === parsedQueryDate && game.discipline === this.discipline) {

                            fRef.get().then((firstTeam) => {
                                game.team_first = firstTeam.data();

                                sRef.get().then((secondTeam) => {
                                    game.team_second = secondTeam.data();
                                    this.games.push(game);



                                    this.games = this.games.sort((a, b) => {
                                        if (a.datetime.seconds > b.datetime.seconds) return 1;
                                        else if (a.datetime.seconds < b.datetime.seconds) return -1;
                                        else return 0;
                                    });
                                });
                            });
                        }
                    });
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
        width: 100%;
        height: 100%;
    }

    .logo {
        height: 4em;
        width: 4em;
    }

    .game-logo {
        height: 3em;
    }

    .team-name {
        color: #fff;
        font-size: 1.5em;
    }

    .versus {
        font-size: 2em;
        color: #fff;
    }

    .bold-colored {
        font-weight: bold;
        color: #D68956;
    }

    .team-name-small {
        color: white;
    }

    .date-text {
        color: #858585;
        font-size: 0.8em;
    }
</style>