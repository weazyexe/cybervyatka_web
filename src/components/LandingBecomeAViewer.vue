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
                                <div class="md-title">Oops! Not today, bruh..</div>
                            </md-card-header>

                            <md-card-content>В текущий момент регистрация зрителей LAN-финалов закрыта.</md-card-content>
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
                                <div class="md-title">K P A C U B O</div>
                            </md-card-header>

                            <md-card-content>Теперь вы можете пройти на LAN-ы по этому QR-коду, который был продублирован на указанную почту.</md-card-content>
                            <vue-qrcode class="ml-auto mr-auto d-block" :value="uid" :options="{ width: 200, color: { dark: '#fff', light: '#212121' } }" tag="img"></vue-qrcode>
                            <md-button class="mb-3 strong-info-text" @click="toMain">Перейти на главную</md-button>
                        </div>

                    </template>
                    <template v-else>
                        <div class="text-center">
                            <md-card-header>
                                <div class="md-title">Анкета зрителя</div>
                            </md-card-header>

                            <md-card-content class="ml-2 mr-2 ml-md-5 mr-md-5 ">Вы можете прийти на LAN-финалы турнира <strong class="strong-info-text">в качестве зрителя</strong>. Для этого заполните анкету и сохраните сгенерированный после этого QR-код. Мы продублируем вам его на указанную почту.</md-card-content>

                        </div>
                        <form novalidate @submit.prevent="saveChanges">
                            <md-card-content>
                                <b-col>
                                    <md-field class="field ml-auto mr-auto" :class="getValidationClass('surname')">
                                        <label for="surname">Фамилия</label>
                                        <md-input name="surname" id="surname" v-model="surname"/>
                                        <span class="md-error" v-if="!$v.surname.required">Фамилия обязательна</span>
                                    </md-field>
                                    <md-field class="field ml-auto mr-auto" :class="getValidationClass('name')">
                                        <label for="name">Имя</label>
                                        <md-input name="name" id="name" v-model="name"/>
                                        <span class="md-error" v-if="!$v.name.required">Имя обязательно</span>
                                    </md-field>
                                    <md-field class="field ml-auto mr-auto">
                                        <label for="patronymic">Отчество</label>
                                        <md-input name="patronymic" id="patronymic" v-model="patronymic"/>
                                    </md-field>
                                    <md-field class="field ml-auto mr-auto" :class="getValidationClass('email')">
                                        <label for="email">E-mail</label>
                                        <md-input name="email" id="email" v-model="email"/>
                                        <span class="md-error" v-if="!$v.email.required">Это тоже обязательно</span>
                                        <span class="md-error" v-if="!$v.email.email">Некорректный адрес</span>
                                    </md-field>
                                </b-col>
                            </md-card-content>

                            <md-card-actions>
                                <md-button type="submit" class="md-accent">Отправить</md-button>
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

    import VueQrcode from '@chenfengyuan/vue-qrcode';
    import firebase from 'firebase';
    import LandingFooter from "@/components/LandingFooter";
    import LandingHeader from "@/components/LandingHeader";
    import { validationMixin } from 'vuelidate';
    import {
        required,
        email
    } from 'vuelidate/lib/validators';

    export default {
        name: "LandingBecomeAViewer",
        mixins: [validationMixin],
        components: {
            LandingFooter,
            LandingHeader,
            VueQrcode
        },
        data: function () {
            return {
                isOpen: true,
                name: "",
                surname: "",
                patronymic: "",
                email: "",
                uid: "",
                isSending: false,
                isSent: false
            }
        },
        created() {
            let db = firebase.firestore();

            db.doc('tournament/settings').get().then((response) => {
                this.isOpen = response.data().isBecomeAViewerOpen;
            });
        },
        methods: {
            toMain() {
                this.$router.push('/');
            },
            getValidationClass (fieldName) {
                let field = this.$v[fieldName];

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            saveViewer() {
                this.isSending = true;

                let db = firebase.firestore();
                let date = Math.round(Date.now() / 1000);
                this.uid = date.toString(16).toUpperCase();

                let viewer = {
                    uid: this.uid,
                    name: this.name,
                    surname: this.surname,
                    patronymic: this.patronymic,
                    email: this.email,
                    rank: 'VIEWER'
                };

                db.doc(`viewers/${viewer.uid}`).set(viewer).then(() => {
                    this.isSending = false;
                    this.isSent = true;
                });
            },
            saveChanges() {
                this.$v.$touch();

                if (!this.$v.$invalid) {
                    this.saveViewer();
                }
            }
        },
        validations: {
            name: {
                required
            },
            surname: {
                required
            },
            email: {
                email,
                required,
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