<template>
    <div class="container-fluid all">

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
                    <form novalidate @submit.prevent="saveChanges">
                        <p class="rect-header">Основная информация</p>
                        <div class="all-fields">
                            <b-col>
                                <b-row>
                                    <b-col md="2" class="text-center">
                                        <img :src="team.logo" alt="team logo" class="team-logo rounded-circle img-fluid">
                                    </b-col>
                                    <b-col md="3">
                                        <md-field>
                                            <label>Загрузить логотип</label>
                                            <md-file @input="onSelectFile" ref="file" id="load-logo-button" v-model="team.logo" accept="image/jpeg,image/png" placeholder="Выберите изображение"/>
                                        </md-field>
                                    </b-col>
                                </b-row>
                                <b-row class="fields-row">
                                    <b-col md="4">
                                        <md-field class="field" :class="getValidationClass('title')">
                                            <label for="title">Название команды</label>
                                            <md-input name="title" id="title" v-model="team.title" :disabled="sending" />
                                            <span class="md-error" v-if="!$v.team.title.required">Название обязательно</span>
                                            <span class="md-error"
                                                  v-else-if="!$v.team.title.minLength || !$v.team.title.maxLength">
                                                Длина названия должна быть в диапазоне 2-30
                                            </span>
                                        </md-field>
                                    </b-col>
                                    <b-col md="3">
                                        <md-field class="field" :class="getValidationClass('discipline')">
                                            <label for="discipline">Дисциплина</label>
                                            <md-select name="discipline" id="discipline" v-model="team.discipline" md-dense :disabled="sending">
                                                <md-option value="CSGO">CS:GO</md-option>
                                                <md-option value="DOTA2">Dota 2</md-option>
                                            </md-select>
                                            <span id="discipline-error" class="md-error">Дисциплина обязательна</span>
                                        </md-field>
                                    </b-col>
                                    <b-col md="3">
                                        <md-field class="field" :class="getValidationClass('status')">
                                            <label for="status">Статус</label>
                                            <md-select name="status" id="status" v-model="team.status" md-dense :disabled="sending">
                                                <md-option value="CONFIRMED">Подтверждена</md-option>
                                                <md-option value="REQUESTED">Ожидает подтверждения</md-option>
                                                <md-option value="CANCELLED">Отклонена</md-option>
                                            </md-select>
                                            <span id="status-error" class="md-error">Статус обязателен</span>
                                        </md-field>
                                    </b-col>
                                    <b-col md="1">
                                        <md-field class="field" :class="getValidationClass('wins')">
                                            <label for="wins">Победы</label>
                                            <md-input name="wins" id="wins" v-model="team.wins" :disabled="sending"/>
                                            <span class="md-error" v-if="!$v.team.wins.required">Обязательное поле</span>
                                            <span class="md-error" v-else-if="!$v.team.wins.maxLength">Больно дохуя, не?</span>
                                        </md-field>
                                    </b-col>
                                    <b-col md="1">
                                        <md-field class="field" :class="getValidationClass('loses')">
                                            <label for="loses">Поражения</label>
                                            <md-input name="loses" id="loses" v-model="team.loses" :disabled="sending"/>
                                            <span id="loses-error" class="md-error" v-if="!$v.team.loses.required">Обязательное поле</span>
                                            <span class="md-error" v-else-if="!$v.team.loses.maxLength">Че совсем что ли?</span>
                                        </md-field>
                                    </b-col>
                                </b-row>
                                <b-row id="players" class="fields-row">
                                    <b-col md="6">
                                        <p id="players-header" class="rect-header">Игроки</p>
                                        <b-col v-for="(player, index) in $v.team.players.$each.$iter" v-bind:key="index" class="player-field">
                                            <b-row>
                                                <b-col md="6">
                                                    <md-field class="field" :class="getValidationClass(player.name)">
                                                        <label for="player-name">Имя</label>
                                                        <md-input name="player-name" id="player-name" v-model="player.name.$model" />
                                                        <span class="md-error" v-if="!player.name.required">Обязательное поле</span>
                                                        <span class="md-error" v-else-if="!player.name.minLength || !player.name.maxLength">Длина имени должна быть в диапазоне 2-30</span>
                                                    </md-field>
                                                </b-col>
                                                <b-col md="6">
                                                    <md-field class="field" :class="getValidationClass(player.nickname)">
                                                        <label for="player-nick">Никнейм</label>
                                                        <md-input name="player-nick" id="player-nick" v-model="player.nickname.$model"/>
                                                        <span class="md-error" v-if="!player.nickname.required">Обязательное поле</span>
                                                        <span class="md-error" v-else-if="!player.nickname.minLength || !player.nickname.maxLength">Длина никнейма должна быть в диапазоне 2-30</span>
                                                    </md-field>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col>
                                                    <md-field class="field" :class="getValidationClass(player.surname)">
                                                        <label for="player-surname">Фамилия</label>
                                                        <md-input name="player-surname" id="player-surname" v-model="player.surname.$model"/>
                                                        <span class="md-error" v-if="!player.surname.required">Обязательное поле</span>
                                                        <span class="md-error" v-else-if="!player.surname.minLength || !player.surname.maxLength">Длина фамилии должна быть в диапазоне 2-30</span>
                                                    </md-field>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </b-col>
                                    <b-col md="6">
                                        <p id="standins-header" class="rect-header">Стенд-ины</p>
                                        <b-col v-for="(player, index) in $v.team.standins.$each.$iter" v-bind:key="index" class="player-field">
                                            <b-row>
                                                <b-col md="6">
                                                    <md-field class="field" :class="getValidationClass(player.name)">
                                                        <label for="player-name">Имя</label>
                                                        <md-input name="player-name" id="standin-name" v-model="player.name.$model" />
                                                        <span class="md-error" v-if="!player.name.required">Обязательное поле</span>
                                                        <span class="md-error" v-else-if="!player.name.minLength || !player.name.maxLength">Длина имени должна быть в диапазоне 2-30</span>
                                                    </md-field>
                                                </b-col>
                                                <b-col md="6">
                                                    <md-field class="field" :class="getValidationClass(player.nickname)">
                                                        <label for="player-nick">Никнейм</label>
                                                        <md-input name="player-nick" id="standin-nick" v-model="player.nickname.$model"/>
                                                        <span class="md-error" v-if="!player.nickname.required">Обязательное поле</span>
                                                        <span class="md-error" v-else-if="!player.nickname.minLength || !player.nickname.maxLength">Длина никнейма должна быть в диапазоне 2-30</span>
                                                    </md-field>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col>
                                                    <md-field class="field" :class="getValidationClass(player.surname)">
                                                        <label for="player-surname">Фамилия</label>
                                                        <md-input name="player-surname" id="standin-surname" v-model="player.surname.$model"/>
                                                        <span class="md-error" v-if="!player.surname.required">Обязательное поле</span>
                                                        <span class="md-error" v-else-if="!player.surname.minLength || !player.surname.maxLength">Длина фамилии должна быть в диапазоне 2-30</span>
                                                    </md-field>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </div>

                        <md-button @click="saveChanges" type="submit" class="md-fab md-primary done-fab">
                            <i class="material-icons icon-fab">done</i>
                        </md-button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AdminMenuButton from "@/components/AdminMenuButton";
    import firebase from "firebase/app";
    import { validationMixin } from 'vuelidate';
    import {
        required,
        minLength,
        maxLength
    } from 'vuelidate/lib/validators';

    export default {
        name: "AdminTeamAddEdit",
        mixins: [validationMixin],
        components: {
            AdminMenuButton
        },
        data: function() {
            return {
                team : {},
                sending: false,
                logo : null
            }
        },
        created() {
            let query = this.$route.query;

            if (Object.keys(query).length === 0) {
                this.$router.replace('/admin/teams/add');

                let team = {};
                let standins = [], players = [];

                let len = 0;

                while (len !== 3) {
                    standins.push({ name : '', nickname: '', surname: ''});
                    len++;
                }

                len = 0;
                while (len !== 5) {
                    players.push({ name : '', nickname: '', surname: ''});
                    len++;
                }

                team.standins = standins;
                team.players = players;

                this.team = team;
            } else {
                let uid = query.uid;

                let db = firebase.firestore();

                db.doc("teams/" + uid).get().then((response) => {

                    let team = response.data();

                    if (team.logo == null) {
                        team.logo = "";
                    } else {
                        let players = [];
                        team.players.forEach((it) => {
                            let arr = it.split(/ '|' /);
                            players.push({ name: arr[0], nickname: arr[1], surname: arr[2]});
                        });

                        team.players = players;

                        let standins = [];
                        if (team.standins == null) {
                            team.standins = ['', '', ''];
                        } else {
                            let len = team.standins.length;

                            while (len !== 3) {
                                team.standins.push('');
                                len++;
                            }
                        }

                        team.standins.forEach((it) => {
                           let arr = it.split(/ '|' /);
                           standins.push({ name: arr[0], nickname: arr[1], surname: arr[2]});
                        });

                        team.standins = standins;

                        this.team = team;
                    }
                });
            }
        },
        methods: {
            onSelectFile() {
                const input = this.$refs.file.$refs.inputFile;

                const files = input.files;

                /*// eslint-disable-next-line no-console
                console.log(files);*/

                if (files && files[0]) {
                    const reader = new FileReader;
                    reader.onload = e => {
                        this.logo = e.target.result;
                    };
                    reader.readAsDataURL(files[0]);
                    this.$emit('load-logo-button', files[0]);
                }


            },
            getValidationClass (fieldName) {
                let field = this.$v.team[fieldName];

                if (!field) field = fieldName;

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            saveTeam() {
                let standins = [], players = [];
                let team = this.team;
                let db = firebase.firestore();
                //let ref = firebase.storage().ref("logos/" + team.uid);

                //ref.put(this.logo);


                team.standins.forEach((it) => {
                    if (it.name !== '' && it.nickname !== '' && it.surname !== '') {
                        standins.push(it.name + " '" + it.nickname + "' " + it.surname);
                    }
                });

                team.standins = standins;

                team.players.forEach((it) => {
                    players.push(it.name + " '" + it.nickname + "' " + it.surname);
                });

                team.players = players;

                db.doc("teams/" + team.uid).update(team).then(() => {
                    this.$router.push('/admin/teams');
                });
            },
            saveChanges() {
                this.$v.$touch();

                if (!this.$v.$invalid) {
                    this.saveTeam();
                }
            }
        },
        validations: {
            team: {
                title: {
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(30)
                },
                discipline: {
                    required
                },
                status: {
                    required
                },
                wins: {
                    required,
                    maxLength: maxLength(3)
                },
                loses: {
                    required,
                    maxLength: maxLength(3)
                },
                players: {
                    required,
                    $each: {
                        name: {
                            required,
                            minLength: minLength(1),
                            maxLength: maxLength(30)
                        },
                        nickname: {
                            required,
                            minLength: minLength(1),
                            maxLength: maxLength(30)
                        },
                        surname: {
                            required,
                            minLength: minLength(1),
                            maxLength: maxLength(30)
                        },
                    }
                },
                standins: {
                    $each: {
                        name: {
                            minLength: minLength(1),
                            maxLength: maxLength(30)
                        },
                        nickname: {
                            minLength: minLength(1),
                            maxLength: maxLength(30)
                        },
                        surname: {
                            minLength: minLength(1),
                            maxLength: maxLength(30)
                        },
                    }
                }
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

    .all-fields {
        padding: 1em 2em;
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
        margin-top: 2em;
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
</style>