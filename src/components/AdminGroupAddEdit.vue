<template>
    <div class="container-fluid all">

        <admin-menu :is-groups-active="true"></admin-menu>
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

                                        <md-field class="field" :class="getValidationClass('title')">
                                            <label for="title">Название группы</label>
                                            <md-input name="title" id="title" v-model="group.title" md-dense :disabled="sending"/>
                                            <span class="md-error" v-if="!$v.group.title.required">Введите название группы</span>
                                        </md-field>

                                        <md-field class="field" :class="getValidationClass('discipline')">
                                            <label for="discipline">Дисциплина</label>
                                            <md-select name="discipline" id="discipline" v-model="group.discipline" md-dense :disabled="sending">
                                                <md-option value="CSGO">CS:GO</md-option>
                                                <md-option value="DOTA2">Dota 2</md-option>
                                            </md-select>
                                            <span class="md-error" v-if="!$v.group.discipline.required">Дисциплина обязательна</span>
                                        </md-field>

                                        <md-field class="field" :class="getValidationClass('countOfTeams')">
                                            <label for="count-of-teams">Количество команд</label>
                                            <md-input name="count-of-teams" id="count-of-teams" v-model="countOfTeams" md-dense :disabled="sending"/>
                                            <span class="md-error" v-if="!$v.countOfTeams.required">Введите количество команд</span>
                                        </md-field>
                                    </b-row>
                                    <p class="rect-header">Команды</p>
                                    <b-row class="fields-row">
                                        <template v-for="(currentTeam, index) in $v.teams.$each.$iter">
                                            <md-field class="field" :class="getValidationClass(currentTeam)" :key="index">
                                                <label for="team">Команда</label>
                                                <md-select name="team" id="team" v-model="currentTeam.$model.uid" md-dense :disabled="sending">
                                                    <template v-for="(team, index2) in allTeams">
                                                        <template v-if="team.discipline === group.discipline && team.status === 'CONFIRMED'">
                                                            <md-option v-if="team.uid !== currentTeam.uid" :value="team.uid" :key="index2">
                                                                {{ team.title }}
                                                            </md-option>
                                                        </template>
                                                    </template>
                                                </md-select>
                                                <span class="md-error" v-if="!currentTeam.required">Команда не выбрана</span>
                                            </md-field>
                                        </template>
                                        <!--<template v-for="n in countOfTeams">

                                        </template>-->
                                    </b-row>
                                </b-col>
                            </div>

                            <md-button @click="saveChanges" type="submit" class="md-fab md-primary done-fab">
                                <i class="material-icons icon-fab">done</i>
                            </md-button>

                        </form>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import firebase from 'firebase';
    import AdminMenu from "@/components/AdminMenu";
    import { validationMixin } from 'vuelidate';
    import {
        required
    } from 'vuelidate/lib/validators';

    export default {
        name: "AdminGroupAddEdit",
        components: {
            AdminMenu
        },
        mixins: [validationMixin],
        data: function() {
            return {
                group : {},
                teams : [],
                allTeams: [],
                countOfTeams : 0,
                sending : false
            }
        },
        created() {
            document.title = this.$route.meta.title;
            let query = this.$route.query;
            let db = firebase.firestore();

            if (Object.keys(query).length === 0) {
                this.$router.replace('/admin/groups/add');

                let group = {};

                let date = Math.round(Date.now() / 1000);
                group.uid = date.toString(16).toUpperCase();

                group.discipline = 'CSGO';
                group.teams = [];

                this.group = group;
            } else {
                let uid = query.uid;

                db.doc("groups/" + uid).get().then((response) => {
                    let group = response.data();

                    let teams = [];
                    let oldTeams = group.teams;
                    oldTeams.forEach((teamRef) => {
                        teamRef.get().then((team) => {
                            teams.push(team.data());
                            group.teams = teams;

                            this.teams = teams;
                            this.group = group;
                            this.countOfTeams = teams.length;
                        });
                    });
                });
            }

            db.collection("teams").get().then((response) => {
                response.forEach((it) => {
                    this.allTeams.push(it.data());
                });
            });
        },
        watch: {
            countOfTeams(val) {
                let teams = [];
                for (let i = 0; i < val; i++) {
                    if (i >= this.group.teams.length) {
                        teams.push({});
                    } else {
                        teams.push(this.group.teams[i]);
                    }
                }

                this.teams = teams;
            }
        },
        methods: {
            getValidationClass (fieldName) {
                let field = this.$v.group[fieldName];

                if (!field) field = this.$v[fieldName];
                if (!field) field = fieldName;

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            saveGroup() {
                let db = firebase.firestore();

                let group = this.group;
                let teams = [];

                this.teams.forEach((it) => {
                    teams.push(db.doc(`teams/${it.uid}`));
                });

                group.teams = teams;

                db.doc(`groups/${this.group.uid}`).set(group).then(() => {
                    this.$router.push('/admin/groups');
                });
            },
            saveChanges() {
                this.$v.$touch();

                if (!this.$v.$invalid) {
                    this.sending = true;
                    this.saveGroup();
                }
            }
        },
        validations: {
            group: {
                title: {
                    required
                },
                discipline: {
                    required
                }
            },
            countOfTeams: {
                required
            },
            teams: {
                $each: {
                    required
                }
            }
        }
    }
</script>

<style scoped>
    .player-name {
        margin-bottom: 0;
        color: #FFFFFF;
    }

    .all-fields {
        padding: 1em 2em;
    }

    .rect-header {
        margin-left: -1em;
    }

    .field {
        color: #D68956;
        margin-right: 2em;
        width: 10em;
    }

    .fields-row {
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
</style>