<template>
    <div class="container-fluid all">

        <admin-menu :is-games-active="true"></admin-menu>
        <div class="right-side">
            <div class="content">
                <div class="rect">
                    <template v-if="sending">
                        <b-container id="add-edit-loader" class="text-center">
                            <md-progress-spinner class="main-color" md-mode="indeterminate"></md-progress-spinner>
                        </b-container>
                    </template>
                    <template v-else>
                        <form novalidate @submit.prevent="saveChanges">
                            <div class="all-fields">
                                <b-col>
                                    <p class="rect-header">Основная информация</p>
                                    <b-row class="fields-row">
                                        <b-col md="3">
                                            <md-field class="field" :class="getValidationClass('bestOf')">
                                                <label for="best-of">Best of</label>
                                                <md-select name="best-of" id="best-of" v-model="bestOf" md-dense :disabled="sending">
                                                    <md-option :value="1">Best of 1</md-option>
                                                    <md-option :value="3">Best of 3</md-option>
                                                    <md-option :value="5">Best of 5</md-option>
                                                </md-select>
                                                <span class="md-error" v-if="!$v.bestOf.required">Выберите количество матчей</span>
                                            </md-field>
                                        </b-col>
                                        <b-col md="3">
                                            <md-datepicker id="datetime" class="field" :class="getValidationClass('datetime')" v-model="dateNumber"/>
                                            <span class="md-error" v-if="!$v.game.datetime.required">Выберите дату начала матча</span>
                                        </b-col>
                                        <b-col md="3">
                                            <md-field class="field" :class="getValidationClass('discipline')">
                                                <label for="discipline">Дисциплина</label>
                                                <md-select name="discipline" id="discipline" v-model="game.discipline" md-dense :disabled="sending">
                                                    <md-option value="CSGO">CS:GO</md-option>
                                                    <md-option value="DOTA2">Dota 2</md-option>
                                                </md-select>
                                                <span class="md-error" v-if="!$v.game.discipline.required">Дисциплина обязательна</span>
                                            </md-field>
                                        </b-col>
                                        <b-col md="3">
                                            <md-field class="field" :class="getValidationClass('is_ended')">
                                                <label for="best-of">Статус игры</label>
                                                <md-select name="best-of" id="best-of" v-model="game.is_ended" md-dense :disabled="sending">
                                                    <md-option value="true">Игра окончена</md-option>
                                                    <md-option value="false">Игра не началась</md-option>
                                                </md-select>
                                                <span class="md-error" v-if="!$v.game.is_ended.required">Статус игры не выбран</span>
                                            </md-field>
                                        </b-col>
                                    </b-row>
                                    <p class="rect-header">Команды</p>
                                    <b-row class="fields-row">
                                        <b-col md="3">
                                            <md-field class="field" :class="getValidationClass('first_team')">
                                                <label for="team-first">Первая команда</label>
                                                <md-select name="team-first" id="team-first" v-model="firstTeam" md-dense :disabled="sending">
                                                    <template v-for="(team, index) in teams">
                                                        <md-option v-if="team.uid !== secondTeam.uid" :value="team.uid" :key="index">
                                                            {{ team.title }}
                                                        </md-option>
                                                    </template>
                                                </md-select>
                                                <span class="md-error" v-if="!$v.firstTeam.required">Первая команда не выбрана</span>
                                            </md-field>
                                        </b-col>
                                        <b-col md="3">
                                            <md-field class="field" :class="getValidationClass('second_team')">
                                                <label for="team-second">Вторая команда</label>
                                                <md-select name="team-second" id="team-second" v-model="secondTeam" md-dense :disabled="sending">
                                                    <template v-for="(team, index) in teams">
                                                        <md-option v-if="team.uid !== firstTeam.uid" :value="team.uid" :key="index">
                                                            {{ team.title }}
                                                        </md-option>
                                                    </template>
                                                </md-select>
                                                <span class="md-error" v-if="!$v.secondTeam.required">Вторая команда не выбрана</span>
                                            </md-field>
                                        </b-col>
                                    </b-row>
                                    <p class="rect-header">Игры</p>
                                    <b-row class="fields-row">
                                        <template v-for="n in bestOf">
                                            <b-col md="2" class="mr-4" :key="n">
                                                <b-row>
                                                    <b-col>
                                                        <b-row>
                                                            <md-field class="field ml-0">
                                                                <label for="map">Карта</label>
                                                                <md-select name="map" id="map" v-model="results[n - 1].map" md-dense :disabled="sending">
                                                                    <template v-for="(map, index) in maps">
                                                                        <md-option v-if="!containsMap(map)" :value="map" :key="index">
                                                                            {{ map }}
                                                                        </md-option>
                                                                    </template>
                                                                </md-select>
                                                            </md-field>
                                                        </b-row>
                                                    </b-col>
                                                </b-row>
                                                <b-row class="m-minus">
                                                    <b-col md="6">
                                                        <md-field class="field ml-0">
                                                            <label for="count-1">Счёт 1</label>
                                                            <md-input name="count-1" id="count-1" v-model="results[n - 1].firstCount"/>
                                                        </md-field>
                                                    </b-col>
                                                    <b-col md="6">
                                                        <md-field class="field ml-0">
                                                            <label for="count-2">Счёт 2</label>
                                                            <md-input name="count-2" id="count-2" v-model="results[n - 1].secondCount"/>
                                                        </md-field>
                                                    </b-col>
                                                </b-row>
                                            </b-col>
                                        </template>
                                    </b-row>
                                </b-col>
                            </div>
                        </form>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from "firebase/app";
    import { validationMixin } from 'vuelidate';
    import {
        required
    } from 'vuelidate/lib/validators';
    import AdminMenu from "@/components/AdminMenu";

    export default {
        name: "AdminGameAddEdit",
        mixins: [validationMixin],
        components: {
            AdminMenu
        },
        data: function() {
            return {
                game : {},
                bestOf: 0,
                dateNumber: {},
                sending: false,
                teams: [],
                firstTeam : "",
                secondTeam : "",
                maps: [
                    "de_dust2", "de_inferno", "de_nuke", "de_mirage", "de_train", "de_overpass", "de_vertigo"
                ],
                results: []
            }
        },
        created() {
            this.$material.locale.dateFormat = "dd.MM.yyyy HH:mm";
            let query = this.$route.query;
            let db = firebase.firestore();

            if (Object.keys(query).length === 0) {
                this.$router.replace('/admin/games/add');

                let game = {};

                let date = Math.round(Date.now() / 1000);
                game.uid = date.toString(16).toUpperCase();

                this.bestOf = 1;
                game.is_ended = false;

                this.game = game;
            } else {
                let uid = query.uid;

                db.doc("games/" + uid).get().then((response) => {
                    let game = response.data();

                    let fRef = game.team_first;
                    let sRef = game.team_second;

                    fRef.get().then((firstTeam) => {
                        this.firstTeam = firstTeam.data().uid;

                        sRef.get().then((secondTeam) => {
                            this.secondTeam = secondTeam.data().uid;
                            this.bestOf = game.best_of;
                            this.dateNumber = game.datetime.seconds * 1000;
                            this.game = game;
                        });
                    });
                });
            }

            db.collection("teams").get().then((response) => {
                response.forEach((it) => {
                    this.teams.push(it.data());
                });
            });
        },
        methods: {
            getValidationClass (fieldName) {
                let field = this.$v.game[fieldName];

                if (!field) field = this.$v[fieldName];

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            containsMap(map) {
                this.results.forEach((it) => {
                    if (it.map === map) return true;
                });
                return false;
            },
            saveTeam() {

            },
            saveChanges() {
                this.$v.$touch();

                if (!this.$v.$invalid) {
                    this.sending = true;
                    this.saveTeam();
                }
            }
        },
        watch: {
            bestOf: function (val) {
                let res = [];
                for (let i = 0; i < val; i++) {
                    res.push({ map: '', firstCount: 0, secondCount: 0 });
                }

                this.results = res;
            }
        },
        validations: {
            game: {
                best_of: {
                    required
                },
                datetime: {
                    required
                },
                discipline: {
                    required
                },
                is_ended: {
                    required
                },
                team_first: {
                    required
                },
                team_second: {
                    required
                }
            },
            firstTeam: {
                required,
            },
            secondTeam: {
                required
            },
            bestOf: {
                required
            }
        },
    }
</script>

<style scoped>
    .team-logo {
        width: 7em;
        height: 7em;
        margin-left: auto;
        margin-right: auto;
    }

    .team-logo:hover {
        cursor: pointer;
    }

    .all-fields {
        padding: 1em 2em;
    }

    .rect-header {
        margin-left: -1em;
    }

    #load-logo-button {
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
        margin-bottom: 2em;
    }

    #players {
        margin-left: -2em;
    }

    #players-header {
        margin-left: 0;
    }

    #standins-header {
        margin-left: 0;
    }

    .player-field {
        margin-bottom: 2em;
    }

    .done-fab {
        position: fixed;
        bottom: 3em;
        right: 3em;
        background-color: #D68956;
    }

    .icon-fab {
        color: #FFFFFF;
        margin-top: 0.2em;
    }

    #add-edit-loader {
        padding-bottom: 1.5em;
    }

    #contacts-header {
        margin-left: -1em;
        margin-top: 2em;
        margin-bottom: -2em;
    }

    .m-minus {
        margin-left: -2em;
        margin-right: -2em;
    }
</style>