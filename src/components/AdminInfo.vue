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
                    <b-col>
                        <p class="stat-text mt-5">Кто посетил сегодня LAN:</p>
                        <b-row class="mt-5 ml-1">
                            <template v-for="(visit, index) in visits">
                                <b-col :key="index" class="mb-5 p-0 visitor">
                                    <p class="stat-text-small mb-0">{{ `${visit.viewer.surname} ${visit.viewer.name} ${visit.viewer.patronymic}` }}</p>
<!--                                    <p class="gray-text mb-0">{{ visit.viewer.email }}</p>-->
                                    <p class="gray-text">{{ `${visit.viewer.rank} | ${parseTime(visit.date)}` }}</p>
                                </b-col>
                            </template>
                        </b-row>
                    </b-col>
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
                viewers: [],
                visits: []
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

                db.doc(`visits/${this.now.getDate()}.${this.now.getMonth() + 1}`).get().then(visitsResponse => {
                    let data = visitsResponse.data();

                    let visits = data.visits;

                    visits.forEach(visit => {
                        visit.viewer.get().then(viewerResponse => {
                            this.visits.push({ viewer: viewerResponse.data(), date: visit.timestamp.toDate()});
                        });
                    });
                });
            });
        },
        methods: {
            parseTime: function(date) {
                let hours = date.getHours();
                if (hours < 10) hours = '0' + hours;

                let minutes = date.getMinutes();
                if (minutes < 10) minutes = '0' + minutes;

                return `${hours}:${minutes}`;
            },
        }
    }
</script>

<style scoped>
    .stat-text {
        color: white;
        font-size: 1.5em;
    }

    .stat-text-small {
        font-size: 1.1em;
        font-weight: bold;
        color: white;
    }

    .gray-text {
        color: #898989;
    }

    .bold-colored {
        color: #D68956;
        font-weight: bold;
    }

    .visitor {
        min-width: 20em;
    }
</style>