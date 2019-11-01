<template>
    <div class="container-fluid all">


        <admin-menu :is-info-active="true"/>
        <div class="right-side">
            <div class="content">
                <b-container>
                    <b-row>
                        <b-col md="2" class="mr-3">
                            <div>
                                <router-link to="/post_playoff?discipline=CSGO" target="_blank">
                                    <md-button class="md-primary" >
                                        Пост сетки CS:GO
                                    </md-button>
                                </router-link>
                            </div>

                            <div>
                                <router-link to="/post_playoff?discipline=DOTA2" target="_blank">
                                    <md-button class="md-primary" >
                                        Пост сетки Dota 2
                                    </md-button>
                                </router-link>
                            </div>

                        </b-col>

                        <b-col md="2" class="mr-3">
                            <div>
                                <router-link to="/post_groups?discipline=CSGO" target="_blank">
                                    <md-button class="md-primary" >
                                        Пост групп CS:GO
                                    </md-button>
                                </router-link>
                            </div>

                            <div>
                                <router-link to="/post_groups?discipline=DOTA2" target="_blank">
                                    <md-button class="md-primary" >
                                        Пост групп Dota 2
                                    </md-button>
                                </router-link>
                            </div>
                        </b-col>

                        <b-col md="2">
                            <div>
                                <router-link :to="`/post_games?discipline=CSGO&day=${now.getDate()}&month=${now.getMonth() + 1}&year=${now.getFullYear()}`" target="_blank">
                                    <md-button class="md-primary" >
                                        Сегодняшние игры CS:GO
                                    </md-button>
                                </router-link>
                            </div>

                            <div>
                                <router-link :to="`/post_games?discipline=DOTA2&day=${now.getDate()}&month=${now.getMonth() + 1}&year=${now.getFullYear()}`" target="_blank">
                                    <md-button class="md-primary" >
                                        Сегодняшние игры Dota 2
                                    </md-button>
                                </router-link>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row class="mt-5 ml-3">
                        <p class="stat-text mr-3">Общее кол-во посетителей: <strong class="bold-colored">{{ viewers.length }}</strong></p>
                        <p class="stat-text mr-3">Кол-во зрителей: <strong class="bold-colored">{{ countOfViewers }}</strong></p>
                        <p class="stat-text mr-3">Кол-во игроков: <strong class="bold-colored">{{ countOfPlayers }}</strong></p>
                        <p class="stat-text mr-3">Кол-во стендинов: <strong class="bold-colored">{{ countOfStandins }}</strong></p>
                        <p class="stat-text mr-3">Кол-во педиков: <strong class="bold-colored">{{ countOfPediks }}</strong></p>
                        <p class="stat-text mr-3">Кол-во персонала: <strong class="bold-colored">{{ countOfStaff }}</strong></p>
                        <p class="stat-text mr-3">Кол-во организаторов: <strong class="bold-colored">{{ countOfOrgs }}</strong></p>
                    </b-row>
                </b-container>
            </div>
        </div>
    </div>
</template>

<script>

    import firebase from 'firebase';
    import AdminMenu from "@/components/AdminMenu";

    export default {
        name: "AdminInfo",
        components: {AdminMenu},
        data: function() {
            return {
                viewers: []
            }
        },
        computed: {
            now() {
                return new Date();
            },
            countOfViewers() {
                let counter = 0;

                this.viewers.forEach(it => {
                    if (it.rank === 'VIEWER') {
                        counter++;
                    }
                });

                return counter;
            },
            countOfPlayers() {
                let counter = 0;

                this.viewers.forEach(it => {
                    if (it.rank === 'PLAYER') {
                        counter++;
                    }
                });

                return counter;
            },
            countOfStandins() {
                let counter = 0;

                this.viewers.forEach(it => {
                    if (it.rank === 'STANDIN') {
                        counter++;
                    }
                });

                return counter;
            },
            countOfPediks() {
                let counter = 0;

                this.viewers.forEach(it => {
                    if (it.rank === 'PEDIK') {
                        counter++;
                    }
                });

                return counter;
            },
            countOfStaff() {
                let counter = 0;

                this.viewers.forEach(it => {
                    if (it.rank === 'STAFF') {
                        counter++;
                    }
                });

                return counter;
            },
            countOfOrgs() {
                let counter = 0;

                this.viewers.forEach(it => {
                    if (it.rank === 'ORGS') {
                        counter++;
                    }
                });

                return counter;
            }
        },
        created() {
            let db = firebase.firestore();

            db.collection("viewers").get().then(response => {
                response.forEach(snapshot => {
                    let data = snapshot.data();
                    this.viewers.push(data);
                });
            });
        }
    }
</script>

<style scoped>
    .stat-text {
        color: white;
        font-size: 1.5em;
    }

    .bold-colored {
        color: #D68956;
        font-weight: bold;
    }
</style>