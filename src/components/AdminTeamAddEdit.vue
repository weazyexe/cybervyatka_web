<template>
    <div class="container-fluid all">

        <md-button class="md-fab md-primary add-fab">
            <md-icon>add</md-icon>
        </md-button>

        <div class="hamburger-menu fixed-top">
            <b-col class="horizontal-center" md="12">
                <b-row>
                    <img class="admin-menu-logo" src="../assets/logo_clear.png" alt="Logo">
                </b-row>
                <router-link to="/admin/teams">
                    <admin-menu-button button-text="Команды" image="people" v-bind:is-active="true"></admin-menu-button>
                </router-link>

                <router-link to="/admin/games">
                    <admin-menu-button button-text="Игры" image="play_arrow"></admin-menu-button>
                </router-link>

                <router-link to="/admin/groups">
                    <admin-menu-button button-text="Групповой этап" image="grid_on"></admin-menu-button>
                </router-link>

                <router-link to="/admin/playoff">
                    <admin-menu-button button-text="Плей-офф" image="call_split"></admin-menu-button>
                </router-link>
            </b-col>
        </div>
        <div class="right-side">
            <div class="content">
                <div class="rect">
                    <p class="rect-header">Основная информация</p>
                    <div class="all-fields">
                        <b-col>
                            <b-row>
                                <img :src="team.logo" alt="team logo" class="team-logo rounded-circle">
                                <md-button id="load-logo-button" class="md-raised">Загрузить новый логотип</md-button>
                            </b-row>
                            <b-row class="fields-row">
                                <b-col md="4">
                                    <md-field class="field">
                                        <label for="title">Название команды</label>
                                        <md-input name="title" id="title" v-model="team.title"/>
                                        <span class="md-error" v-if="!validateTitle">Некорректный ввод</span>
                                    </md-field>
                                </b-col>
                                <b-col md="3">
                                    <md-field class="field">
                                        <label for="discipline">Дисциплина</label>
                                        <md-select name="discipline" id="discipline" v-model="team.discipline" md-dense>
                                            <md-option value="CSGO">CS:GO</md-option>
                                            <md-option value="DOTA2">Dota 2</md-option>
                                        </md-select>
                                        <span class="md-error" v-if="!validateTitle">Некорректный ввод</span>
                                    </md-field>
                                </b-col>
                                <b-col md="3">
                                    <md-field class="field">
                                        <label for="status">Статус</label>
                                        <md-select name="status" id="status" v-model="team.status" md-dense>
                                            <md-option value="CONFIRMED">Подтверждена</md-option>
                                            <md-option value="REQUESTED">Ожидает подтверждения</md-option>
                                            <md-option value="CANCELLED">Отклонена</md-option>
                                        </md-select>
                                        <span class="md-error" v-if="!validateTitle">Некорректный ввод</span>
                                    </md-field>
                                </b-col>
                                <b-col md="1">
                                    <md-field class="field">
                                        <label for="wins">Победы</label>
                                        <md-input name="wins" id="wins" v-model="team.wins"/>
                                        <span class="md-error" v-if="!validateTitle">Некорректный ввод</span>
                                    </md-field>
                                </b-col>
                                <b-col md="1">
                                    <md-field class="field">
                                        <label for="loses">Поражения</label>
                                        <md-input name="loses" id="loses" v-model="team.loses"/>
                                        <span class="md-error" v-if="!validateTitle">Некорректный ввод</span>
                                    </md-field>
                                </b-col>
                            </b-row>
                            <b-row id="players" class="fields-row">
                                <b-col md="6">
                                    <p id="players-header" class="rect-header">Игроки</p>
                                    <b-col v-for="(player, index) in players" v-bind:key="index" class="player-field">
                                        <admin-player-field v-bind:player="player"></admin-player-field>
                                    </b-col>
                                </b-col>
                            </b-row>
                        </b-col>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AdminMenuButton from "@/components/AdminMenuButton";
    import firebase from "firebase/app";
    import AdminPlayerField from "@/components/AdminPlayerField";

    export default {
        name: "AdminTeamAddEdit",
        components: {
            AdminPlayerField,
            AdminMenuButton
        },
        data: function() {
            return {
                team : {},
                players : []
            }
        },
        created() {
            let query = this.$route.query;

            if (query === null) {
                this.$router.replace('/admin/teams/add');
            } else {
                let discipline = query.discipline;
                let title = query.title;

                let db = firebase.firestore();
                let storage = firebase.storage().ref();

                db.doc("teams/" + discipline + " " + title).get().then((response) => {

                    let team = response.data();

                    if (team.logo == null) {
                        team.logo = "";
                    } else {
                        let ref = storage.child(team.logo);

                        ref.getDownloadURL().then((url) => {
                            team.logo = url;
                            this.team = team;
                        });

                        team.players.forEach((it) => {
                            this.players.push(it.split(/ '|' /));
                        });
                    }
                });
            }
        },
        methods: {
            validateTitle() {
                return !(this.team.title.length > 20 || this.team.title.length <= 1);
            }
        }
    }
</script>

<style scoped>

    .team-logo {
        width: 7em;
        height: 7em;
    }

    .all-fields {
        margin: 1em 2em;
    }

    #load-logo-button {
        color: #FFFFFF;
        background-color: #D68956;
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 2em;
    }

    .field {
        color: #D68956;
        margin-left: -1em;
    }

    #title {
        color: #FFFFFF;
    }

    .fields-row {
        margin-top: 2em;
    }

    #players {
        margin-left: -2em;
    }

    #players-header {
        margin-left: 0;
    }

    .player-field {
        margin-bottom: 2em;
        margin-left: -1em;
    }
</style>