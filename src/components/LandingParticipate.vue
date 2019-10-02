<template>
    <div class="parallax">
        <div class="all-content parallax__layer parallax__layer--back"></div>

        <div class="parallax__layer parallax__layer--base">
            <landing-header></landing-header>

            <div class="prerect">
                <div class="rectangle"></div>
            </div>

            <b-container fluid id="teams-content">
                <md-card class="form-card">
                    <template v-if="!isOpen">
                        <div class="text-center">
                            <md-card-header>
                                <div class="md-title">Oops!</div>
                            </md-card-header>

                            <md-card-content>В текущий момент регистрация на турнир закрыта. Следите за новостями турнира!</md-card-content>
                            <md-button class="mb-3 strong-info-text" @click="toMain">Перейти на главную</md-button>

                        </div>
                    </template>
                    <template v-else-if="isSending">
                        <b-container class="text-center pt-5 pb-5">
                            <md-progress-spinner class="main-color" md-mode="indeterminate"></md-progress-spinner>
                        </b-container>
                    </template>
                    <template v-else-if="isSent">
                        <div class="text-center">
                            <md-card-header>
                                <div class="md-title">Анкета успешно отправлена!</div>
                            </md-card-header>

                            <md-card-content>В ближайшее время мы рассмотрим Вашу заявку.</md-card-content>
                            <md-button class="mb-3 strong-info-text" @click="toMain">Перейти на главную</md-button>

                        </div>
                    </template>
                    <template v-else>
                        <div class="text-center">
                            <md-card-header>
                                <div class="md-title">Анкета команды-участника</div>
                            </md-card-header>

                            <md-card-content>Для участия в турнире <strong class="strong-info-text">CYBERVYATKA</strong>, пожалуйста заполните анкету ниже</md-card-content>

                        </div>
                        <form novalidate @submit.prevent="saveChanges">
                            <md-card-content>
                                <b-col>
                                    <b-row class="text-center">
                                        <b-col>
                                            <div v-if="isLogoLoading">
                                                <md-progress-spinner class="main-color" md-mode="indeterminate"></md-progress-spinner>
                                            </div>
                                            <div v-else>
                                                <template v-if="team.logo">
                                                    <img :src="logo" alt="team logo" class="team-logo rounded-circle w10 ml-auto mr-auto">
                                                </template>
                                                <template v-else>
                                                    <img src="../assets/logo_placeholder.png" alt="team logo" class="team-logo rounded-circle w10 ml-auto mr-auto">
                                                </template>
                                            </div>
                                            <md-field class="field ml-auto mr-auto">
                                                <label>Загрузить логотип</label>
                                                <md-file @input="onSelectFile" ref="file" id="load-logo-button" v-model="team.logo" accept="image/jpeg,image/png" placeholder="Выберите логотип"/>
                                            </md-field>
                                        </b-col>
                                    </b-row>
                                    <b-container>
                                        <b-row class="ml-auto mr-auto justify-content-center">
                                            <md-field class="field" :class="getValidationClass('title')">
                                                <label for="title">Название команды</label>
                                                <md-input name="title" id="title" v-model="team.title"/>
                                                <span class="md-error" v-if="!$v.team.title.required">Название обязательно</span>
                                                <span class="md-error"
                                                      v-else-if="!$v.team.title.minLength || !$v.team.title.maxLength">
                                                Длина названия должна быть в диапазоне 2-30
                                            </span>
                                            </md-field>
                                            <md-field class="field" :class="getValidationClass('discipline')">
                                                <label for="discipline">Дисциплина</label>
                                                <md-select name="discipline" id="discipline" v-model="team.discipline" md-dense>
                                                    <md-option value="CSGO">CS:GO</md-option>
                                                    <md-option value="DOTA2">Dota 2</md-option>
                                                </md-select>
                                                <span id="discipline-error" class="md-error">Дисциплина обязательна</span>
                                            </md-field>
                                            <md-field class="field" :class="getValidationClass('email')">
                                                <label for="email">E-mail</label>
                                                <md-input name="email" id="email" v-model="team.contacts.email" />
                                                <span class="md-error" v-if="!$v.team.contacts.email.email">Адрес электронной почты некорректен</span>
                                                <span class="md-error" v-if="!$v.team.contacts.email.required">Адрес электронной почты обязателен</span>
                                            </md-field>
                                            <md-field class="field" :class="getValidationClass('phone')">
                                                <label for="phone">Номер телефона</label>
                                                <md-input name="phone" id="phone" v-model="team.contacts.phone" :disabled="sending" />
                                                <span class="md-error" v-if="!$v.team.contacts.phone.required">Номер телефона обязателен</span>
                                            </md-field>
                                            <md-field class="field" :class="getValidationClass('vk')">
                                                <label for="phone">Страница VK</label>
                                                <md-input name="vk" id="vk" v-model="team.contacts.vk" :disabled="sending" />
                                                <span class="md-error" v-if="!$v.team.contacts.vk.url">Некорректный URL</span>
                                            </md-field>
                                            <md-field class="field" :class="getValidationClass('telegram')">
                                                <label for="phone">Telegram</label>
                                                <md-input name="telegram" id="telegram" v-model="team.contacts.telegram" :disabled="sending" />
                                            </md-field>
                                        </b-row>
                                    </b-container>
                                    <b-container>
                                        <b-row>
                                            <div class="ml-auto mr-auto justify-content-center">
                                                <p id="players-header" class="rect-header">Игроки</p>
                                            </div>
                                        </b-row>
                                    </b-container>
                                    <b-container>
                                        <b-row id="players" class="ml-auto mr-auto justify-content-center">
                                            <template v-for="(player, index) in $v.team.players.$each.$iter" class="player-field">
                                                <b-row :key="index" class="m-0 mb-5 ml-auto mr-auto justify-content-center">
                                                    <md-field class="field-player" :class="getValidationClass(player.name)">
                                                        <label for="player-name">Имя</label>
                                                        <md-input name="player-name" id="player-name" v-model="player.name.$model" />
                                                        <span class="md-error" v-if="!player.name.required">Обязательное поле</span>
                                                        <span class="md-error" v-else-if="!player.name.minLength || !player.name.maxLength">Длина имени должна быть в диапазоне 2-30</span>
                                                    </md-field>
                                                    <md-field class="field-player" :class="getValidationClass(player.nickname)">
                                                        <label for="player-nick">Никнейм</label>
                                                        <md-input name="player-nick" id="player-nick" v-model="player.nickname.$model"/>
                                                        <span class="md-error" v-if="!player.nickname.required">Обязательное поле</span>
                                                        <span class="md-error" v-else-if="!player.nickname.minLength || !player.nickname.maxLength">Длина никнейма должна быть в диапазоне 2-30</span>
                                                    </md-field>
                                                    <md-field class="field-player" :class="getValidationClass(player.surname)">
                                                        <label for="player-surname">Фамилия</label>
                                                        <md-input name="player-surname" id="player-surname" v-model="player.surname.$model"/>
                                                        <span class="md-error" v-if="!player.surname.required">Обязательное поле</span>
                                                        <span class="md-error" v-else-if="!player.surname.minLength || !player.surname.maxLength">Длина фамилии должна быть в диапазоне 2-30</span>
                                                    </md-field>
                                                </b-row>
                                            </template>
                                        </b-row>
                                    </b-container>
                                    <b-container>
                                        <b-row class="ml-auto mr-auto justify-content-center">
                                            <p id="standins-header" class="rect-header">Стенд-ины (необязательно)</p>
                                        </b-row>
                                    </b-container>
                                    <b-container>
                                        <b-row class="ml-auto mr-auto justify-content-center">
                                            <template v-for="(player, index) in $v.team.standins.$each.$iter" class="player-field">
                                                <b-row class="m-0 mb-5 ml-auto mr-auto justify-content-center" :key="index">
                                                    <md-field class="field-player" :class="getValidationClass(player.name)">
                                                        <label for="player-name">Имя</label>
                                                        <md-input name="player-name" id="standin-name" v-model="player.name.$model" />
                                                        <span class="md-error" v-if="!player.name.required">Обязательное поле</span>
                                                        <span class="md-error" v-else-if="!player.name.minLength || !player.name.maxLength">Длина имени должна быть в диапазоне 2-30</span>
                                                    </md-field>
                                                    <md-field class="field-player" :class="getValidationClass(player.nickname)">
                                                        <label for="player-nick">Никнейм</label>
                                                        <md-input name="player-nick" id="standin-nick" v-model="player.nickname.$model"/>
                                                        <span class="md-error" v-if="!player.nickname.required">Обязательное поле</span>
                                                        <span class="md-error" v-else-if="!player.nickname.minLength || !player.nickname.maxLength">Длина никнейма должна быть в диапазоне 2-30</span>
                                                    </md-field>
                                                    <md-field class="field-player" :class="getValidationClass(player.surname)">
                                                        <label for="player-surname">Фамилия</label>
                                                        <md-input name="player-surname" id="standin-surname" v-model="player.surname.$model"/>
                                                        <span class="md-error" v-if="!player.surname.required">Обязательное поле</span>
                                                        <span class="md-error" v-else-if="!player.surname.minLength || !player.surname.maxLength">Длина фамилии должна быть в диапазоне 2-30</span>
                                                    </md-field>
                                                </b-row>
                                            </template>
                                        </b-row>
                                    </b-container>
                                </b-col>
                            </md-card-content>

                            <md-card-actions>
                                <md-button type="submit">Отправить</md-button>
                            </md-card-actions>
                        </form>
                    </template>

                </md-card>
            </b-container>
            <landing-footer></landing-footer>
        </div>
    </div>
</template>

<script>

    import LandingHeader from "@/components/LandingHeader";
    import LandingFooter from "@/components/LandingFooter";
    import firebase from 'firebase';
    import { validationMixin } from 'vuelidate';
    import {
        required,
        minLength,
        maxLength,
        url,
        email
    } from 'vuelidate/lib/validators';

    export default {
        name: "LandingParticipate",
        mixins: [validationMixin],
        components: {
            LandingHeader,
            LandingFooter
        },
        data: function() {
            return {
                team: {
                    contacts: {},
                    players: [],
                    standins: []
                },
                isLogoLoading: false,
                isSending: false,
                logo: {},
                isSent: false,
                isOpen: true
            }
        },
        created() {
            document.title = this.$route.meta.title;
            this.isSending = true;
            let db = firebase.firestore();

            db.doc('tournament/settings').get().then((response) => {
                this.isOpen = response.data().isRegistrationOpen;

                if (this.isOpen) {
                    for (let i = 0; i < 5; i++) {
                        this.team.players.push({name: '', nickname: '', surname: ''});
                    }
                    for (let i = 0; i < 3; i++) {
                        this.team.standins.push({name: '', nickname: '', surname: ''});
                    }
                }

                this.isSending = false;
            });
        },
        methods: {
            toMain() {
                this.$router.push('/');
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
            onSelectFile() {
                this.isLogoLoading = true;
                const input = this.$refs.file.$refs.inputFile;

                const files = input.files;

                if (files && files[0]) {
                    const reader = new FileReader;
                    reader.onload = e => {
                        this.logo = e.target.result;
                        //this.team.logo = e.target.result;

                        this.isLogoLoading = false;
                    };
                    reader.readAsDataURL(files[0]);
                    //this.$emit('load-logo-button', files[0]);
                }
            },
            saveTeam() {
                this.isSending = true;
                let standins = [], players = [];
                let team = this.team;

                this.team.logo = this.logo;
                team.loses = 0;
                team.wins = 0;
                team.status = 'REQUESTED';

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

                if (this.team.logo.includes('firebasestorage')) {
                    db.doc("teams/" + team.uid).set(team).then(() => {
                        this.isSending = false;
                        this.isSent = true;
                    });
                } else {
                    ref.putString(`${this.logo}`, 'data_url').then(() => {
                        ref.getDownloadURL().then((url) => {
                            team.logo = url;
                            db.doc("teams/" + team.uid).set(team).then(() => {
                                this.isSending = false;
                                this.isSent = true;
                            });
                        });
                    });
                }
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
                contacts: {
                    email: {
                        required,
                        email: email
                    },
                    phone: {
                        required
                    },
                    vk: {
                        required
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
        }
    }
</script>

<style scoped>
    html, body {
        max-width: 100%;
        overflow-x: hidden;
    }

    .prerect {
        max-width: 100%;
        min-width: 100%;
        height: 30em;
        overflow-x: hidden;
        overflow-y: hidden;
        z-index: -1;
        position: relative;
        padding-top: 20em;
    }

    .rectangle {
        background-color: #101010;
        min-width: 130%;
        min-height: 12em;
        transform: rotate(-3deg);
        margin-left: -3em;
        transform-origin: 103%;
    }

    .all-content {
        background: url("../assets/main_background.png") center no-repeat;
        background-size: cover;
        max-height: 45em;
        z-index: -1;
        margin-top: -4%;
    }

    #teams-content {
        background-color: #101010;
        padding: 3% 10% 10% 10%;
        min-height: 30em;
    }

    .parallax {
        perspective: 1px;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .parallax__layer {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .parallax__layer--base {
        transform: translateZ(0);
    }

    .parallax__layer--back {
        transform: translateZ(-1px) scale(2.7);
    }

    @media only screen and (max-width: 500px) {
        
    }

    @media only screen and (max-width: 640px) {
        .field-player {
            color: #D68956;
            margin-right: 1em;
            margin-left: 1em;
        }

        .form-card {
            margin-top: -15em;
            margin-left: 1%;
            margin-right: 1%;
            background-color: #212121;
        }

        .field {
            color: #D68956;
            margin-right: 1em;
            margin-left: 1em;
        }
    }

    @media only screen and (min-width: 640px) {
        .field-player {
            color: #D68956;
            margin-right: 1em;
            margin-left: 1em;
            width: 16vw;
        }

        .form-card {
            margin-top: -15em;
            margin-left: 10%;
            margin-right: 10%;
            background-color: #212121;
        }

        .field {
            color: #D68956;
            margin-right: 1em;
            margin-left: 1em;
            width: 20em;
        }
    }
    


    .rect-header {
        margin-left: 0;
        margin-top: 3em;
    }

    :root {
        --accent-color-dark: #aa7d64;
        --accent-color: #D68956;
    }

    .w10 {
        width: 10em;
    }

    .w20 {
        width: 20em;
    }

    .strong-info-text {
        color: #D68956;
        font-weight: bold;
    }
</style>