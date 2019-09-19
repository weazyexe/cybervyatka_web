<template>
    <div class="container-fluid all">

        <admin-menu :is-teams-active="true"></admin-menu>
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
                            <p class="rect-header">Основная информация</p>
                            <div class="all-fields">
                                <b-col>
                                    <b-row>
                                        <b-col md="2" class="text-center">
                                            <img :src="team.logo" alt="team logo" class="team-logo rounded-circle img-fluid">
                                        </b-col>
                                        <b-col md="3">
                                            <md-field :class="getValidationClass('logo')">
                                                <label>Загрузить логотип</label>
                                                <md-file @input="onSelectFile" ref="file" id="load-logo-button" v-model="team.logo" accept="image/jpeg,image/png" placeholder="Выберите изображение" :disabled="sending"/>
                                                <span class="md-error" v-if="!$v.team.logo.required">Логотип обязателен</span>
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
                                    <p id="contacts-header" class="rect-header">Контактные данные</p>
                                    <b-row class="fields-row">
                                        <b-col md="3">
                                            <md-field class="field" :class="getValidationClass('email')">
                                                <label for="email">E-mail</label>
                                                <md-input name="email" id="email" v-model="team.contacts.email" :disabled="sending" />
                                                <span class="md-error" v-if="!$v.team.contacts.email.email">Адрес электронной почты некорректен</span>
                                                <span class="md-error" v-if="!$v.team.contacts.email.required">Адрес электронной почты обязателен</span>
                                            </md-field>
                                        </b-col>
                                        <b-col md="3">
                                            <md-field class="field" :class="getValidationClass('phone')">
                                                <label for="phone">Номер телефона</label>
                                                <md-input name="phone" id="phone" v-model="team.contacts.phone" :disabled="sending" />
                                                <span class="md-error" v-if="!$v.team.contacts.phone.required">Номер телефона обязателен</span>
                                            </md-field>
                                        </b-col>
                                        <b-col md="3">
                                            <md-field class="field" :class="getValidationClass('vk')">
                                                <label for="phone">Страница VK</label>
                                                <md-input name="vk" id="vk" v-model="team.contacts.vk" :disabled="sending" />
                                                <span class="md-error" v-if="!$v.team.contacts.vk.url">Некорректный URL</span>
                                            </md-field>
                                        </b-col>
                                        <b-col md="3">
                                            <md-field class="field" :class="getValidationClass('telegram')">
                                                <label for="phone">Telegram</label>
                                                <md-input name="telegram" id="telegram" v-model="team.contacts.telegram" :disabled="sending" />
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
        required,
        minLength,
        maxLength,
        url,
        email
    } from 'vuelidate/lib/validators';
    import AdminMenu from "@/components/AdminMenu";

    export default {
        name: "AdminTeamAddEdit",
        mixins: [validationMixin],
        components: {
            AdminMenu
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
                let standins = [], players = [],  contacts = { email: '', vk: '', phone: '', telegram: ''};

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
                team.contacts = contacts;

                let date = Math.round(Date.now() / 1000);
                team.uid = date.toString(16).toUpperCase();

                this.team = team;
            } else {
                let uid = query.uid;

                let db = firebase.firestore();

                db.doc("teams/" + uid).get().then((response) => {

                    let team = response.data();

                    let contacts = { email: '', vk: '', phone: '', telegram: ''};

                    if (!team.contacts) {
                        team.contacts = contacts;
                    }

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

                if (files && files[0]) {
                    const reader = new FileReader;
                    reader.onload = e => {
                        this.logo = e.target.result;
                        this.team.logo = e.target.result;
                    };
                    reader.readAsDataURL(files[0]);
                    this.$emit('load-logo-button', files[0]);
                }


            },
            getValidationClass (fieldName) {
                let field = this.$v.team[fieldName];
                let fieldContacts = this.$v.team.contacts[fieldName];

                if (!field && !fieldContacts) field = fieldName;

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }

                if (fieldContacts) {
                    return {
                        'md-invalid': fieldContacts.$invalid && fieldContacts.$dirty
                    }
                }
            },
            saveTeam() {
                let standins = [], players = [];
                let team = this.team;

                let db = firebase.firestore();
                let ref = firebase.storage().ref("logos/" + team.uid + ".png");

                team.standins.forEach((it) => {
                    if (it.name !== '' && it.nickname !== '' && it.surname !== '') {
                        standins.push(it.name + " '" + it.nickname + "' " + it.surname);
                    }
                });

                if (standins.length !== 0) team.standins = standins;
                else team.standins = null;

                team.players.forEach((it) => {
                    players.push(it.name + " '" + it.nickname + "' " + it.surname);
                });

                team.players = players;

                team.wins = parseInt(team.wins, 10);
                team.loses = parseInt(team.loses, 10);

                if (this.team.logo.includes('firebasestorage')) {
                    db.doc("teams/" + team.uid).set(team).then(() => {
                        this.$router.push('/admin/teams');
                    });
                } else {
                    ref.putString(`${this.logo}`, 'data_url').then(() => {
                        ref.getDownloadURL().then((url) => {
                            team.logo = url;
                            db.doc("teams/" + team.uid).set(team).then(() => {
                                this.$router.push('/admin/teams');
                            });
                        });
                    });
                }
            },
            saveChanges() {
                this.$v.$touch();

                if (!this.$v.$invalid) {
                    this.sending = true;
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
                logo: {
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
                contacts: {
                    email: {
                        required,
                        email: email
                    },
                    phone: {
                        required
                    },
                    vk: {
                        url: url
                    }
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

    .team-logo:hover {
        cursor: pointer;
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

    #add-edit-loader {
        padding-bottom: 1.5em;
    }

    #contacts-header {
        margin-left: -1em;
        margin-top: 2em;
        margin-bottom: -2em;
    }
</style>