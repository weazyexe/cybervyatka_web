<template>
    <div class="">
        <div class="background-header">
            <landing-header :is-main-active="true"></landing-header>

            <b-container>
                <b-row>
                    <p class="biggest-text">CYBERVYATKA</p>
                </b-row>
                <b-row>
                    <p class="bigger-text">Киберспортивный турнир в Кирове</p>
                </b-row>
                <b-row>
                    <a href="https://vk.com/cybervyatka" target="_blank" class="ml-auto mr-auto">
                        <img src="../assets/vk.png" alt="vk" class="staff-link">
                    </a>
                </b-row>
            </b-container>
        </div>

        <div class="prerect-top">
            <div class="rectangle"></div>
        </div>

        <div class="background-info text-center">
            <b-container class="info-content">
                <p class="info-text ml-auto mr-auto"><strong class="strong-info-text">CYBERVYATKA</strong> - это
                    киберспортивный турнир в городе Кирове,
                    проводящийся с 2018 года в ВятГУ</p>
                <p class="info-text ml-auto mr-auto">Наши <strong class="strong-info-text">партнёры</strong>:</p>

                <b-row>
                    <img src="../assets/vyatsu.png" alt="vyatsu" class="sponsored ml-auto mr-auto  mt-3">
                </b-row>
                <p class="info-text-small ml-auto mr-auto mt-3">Вятский Государственный Университет</p>
                <b-row>
                    <div class="ml-auto mr-auto mt-5">
                        <a href="https://vk.com/krdparen_kirov" target="_blank"><img src="../assets/kp.png" alt="krdprn" class="mx-3 sponsored"></a>
                        <a href="https://vk.com/pizzaforfriends" target="_blank"><img src="../assets/hleb-and-pizza.png" alt="hleb and pizza" class="mx-3 sponsored"></a>
                        <a href="https://vk.com/clubadrenalin43" target="_blank"><img src="../assets/adrenalin43.png" alt="adrenalin43" class="mx-3 sponsored"></a>
                        <a href="https://vk.com/coffeelike43" target="_blank"><img src="../assets/coffeelike.png" alt="coffee like" class="mx-3 sponsored"></a>
                    </div>
                </b-row>
            </b-container>
        </div>

        <div class="prerect-top">
            <div class="rectangle"></div>
        </div>

        <div class="background-dates text-center">
            <b-container class="info-content">
                <b-col class="ml-auto mr-auto">
                    <p class="strong-info-text mt-2">Регистрация</p>
                    <p class="info-text-big"><strong>До 20 октября</strong></p>
                    <p class="strong-info-text mt-5">Групповой этап</p>
                    <p class="info-text-big"><strong>23 октября - 30 октября</strong></p>
                    <p class="strong-info-text mt-5">Плей-офф</p>
                    <p class="info-text-big"><strong>1 ноября - 7 ноября</strong></p>
                    <p class="strong-info-text mt-5">Финалы</p>
                    <p class="info-text-big"><strong>8 и 9 ноября</strong></p>
                    <router-link to="/games" class="mt-5">
                        <md-button id="baton-button" class="md-raised ml-auto mr-auto">Расписание</md-button>
                    </router-link>
                </b-col>
            </b-container>
        </div>

        <div class="prerect-top">
            <div class="rectangle"></div>
        </div>

        <div class="background-numbers text-center">
            <b-container class="info-content">
                <b-col>
                    <b-row class="text-center">
                        <div class="ml-auto mr-auto pl-5 pr-5 pb-5">
                            <b-row class="number text-center">
                                <p id="participant-counter" class="ml-auto">0</p>
                                <p class="mr-auto"><strong class="strong-info-text">+</strong></p>
                            </b-row>
                            <p class="info-text">Участников</p>
                        </div>
                        <div class="ml-auto mr-auto pl-5 pr-5 pb-5">
                            <b-row class="number text-center">
                                <p id="discipline-counter" class="ml-auto mr-auto">0</p>
                            </b-row>
                            <p class="info-text">Дисциплины</p>
                        </div>
                        <div class="ml-auto mr-auto pl-5 pr-5 pb-5">
                            <b-row class="number text-center">
                                <p id="fun-counter" class="ml-auto">0</p>
                                <p class="mr-auto"><strong class="strong-info-text">%</strong></p>
                            </b-row>
                            <p class="info-text">FUN</p>
                        </div>
                    </b-row>
                    <b-row class="mt-5 ml-auto mr-auto pl-md-5 pr-md-5 pb-md-5">
                        <img src="../assets/csgo-white.png" class="ml-auto mr-md-5 csgo-logo" alt="csgo_logo">
                        <img src="../assets/dota2-white.png" class="mr-auto dota2-logo" alt="dota2_logo">
                    </b-row>

                    <div class="mt-5">
                        <md-button v-if="isOpen" class="md-raised ml-auto mr-auto past-seasons-button" @click="toParticipate">Участвовать</md-button>
                        <md-button v-else class="md-raised ml-auto mr-auto past-seasons-button" @click="toBecomeAViewer">Стать зрителем на LAN</md-button>
                    </div>
                </b-col>
            </b-container>
        </div>

        <div class="prerect-top">
            <div class="rectangle"></div>
        </div>


        <div class="background-dates text-center">
            <b-container class="info-content">
                <b-col class="ml-auto mr-auto">
                    <p class="info-text-big"><strong>Прошлые сезоны</strong></p>
                    <p class="bigger-text mb-0">Было проведено уже 2 сезона нашего турнира в стенах ВятГУ</p>
                    <p class="bigger-text">Больше фотографий в альбомах <a href="https://vk.com/albums-172258986"
                                                                           class="strong-info-text" target="_blank">сообщества
                        ВК</a></p>

                    <b-row class="text-center">
                        <div class="ml-auto mr-auto">
                            <img src="../assets/big1.png" alt="photo1" class="photo-200">
                            <img src="../assets/quad2.png" alt="photo1" class="photo-200">
                            <img src="../assets/quad3.png" alt="photo1" class="photo-200">
                            <img src="../assets/quad4.png" alt="photo1" class="photo-200">
                            <img src="../assets/large1.png" alt="photo1" class="photo-400-200">
                        </div>

                    </b-row>
                </b-col>
            </b-container>
        </div>

        <div class="prerect-top">
            <div class="rectangle"></div>
        </div>

        <div class="background-video text-center">
            <b-container class="info-content">
                <b-col class="ml-auto mr-auto">
                    <iframe width="640" height="600" class="video-iframe" frameBorder="0"
                            src="https://youtube.com/embed/HOK3qOUU8eA?start=28">
                    </iframe>
                </b-col>
            </b-container>
        </div>

        <landing-footer></landing-footer>

    </div>

</template>

<script>
    import LandingHeader from "@/components/LandingHeader";
    import LandingFooter from "@/components/LandingFooter";
    import {CountUp} from 'countup.js'
    import firebase from 'firebase'

    export default {
        name: 'Header',
        components: {
            LandingHeader,
            LandingFooter
        },
        data: function () {
            return {
                isCounterStarted: false,
                isOpen: false
            }
        },
        methods: {
            scrollListener: function () {

                if (window.scrollY > 1800 && !this.isCounterStarted) {
                    this.isCounterStarted = true;
                    let funCounter = new CountUp('fun-counter', 100);
                    let participantCounter = new CountUp('participant-counter', 150);
                    let disciplineCounter = new CountUp('discipline-counter', 2);

                    funCounter.duration = 4000;
                    participantCounter.duration = 4000;
                    disciplineCounter.duration = 4000;

                    funCounter.start();
                    participantCounter.start();
                    disciplineCounter.start();
                }
            },
            toParticipate() {
                this.$router.push('/registration');
            },
            toBecomeAViewer() {
                this.$router.push('/become_a_viewer');
            },
        },
        created() {
            document.title = this.$route.meta.title;
            window.addEventListener('scroll', this.scrollListener);
            let db = firebase.firestore();

            db.doc('tournament/settings').get().then((response) => {
                this.isOpen = response.data().isRegistrationOpen;
            });
        },
        destroyed() {
            window.removeEventListener('scroll', this.scrollListener);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .strong-info-text {
        color: #D68956;
        font-weight: bold;
    }

    .info-content {
        padding-top: 15em;
    }

    .prerect-top {
        max-width: 100%;
        min-width: 100%;
        height: 30em;
        margin-top: -10%;
        padding-bottom: 20%;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .staff-link {
        width: 2em;
        height: 2em;
        margin: 0.3em;
    }

    .rectangle {
        background-color: #101010;
        min-width: 150%;
        min-height: 20em;
        transform: rotate(-3deg);
        margin-left: -3em;
        transform-origin: 103%;
    }

    @media only screen and (min-width: 440px) {
        .background-numbers {
            background: url("../assets/pc_background.png") center no-repeat;
            background-size: cover;
            min-height: 55em;
            margin-top: -15em;
        }

        .rectangle {
            background-color: #101010;
            min-width: 150%;
            min-height: 20em;
            transform: rotate(-3deg);
            margin-left: -3em;
            transform-origin: 103%;
        }
    }

    @media only screen and (min-width: 1301px) {
        .biggest-text {
            color: #FFFFFF;
            margin-top: 5em;
            font-size: 4em;
            letter-spacing: 1em;
            font-weight: bold;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
        }

        .bigger-text {
            color: #FFFFFF;
            font-size: 1.5em;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 2em;
        }

        .video-iframe {
            height: 30em;
            width: 50em;
        }
    }

    @media only screen and (max-width: 1300px) {
        .biggest-text {
            color: #FFFFFF;
            margin-top: 30%;
            font-size: 3em;
            letter-spacing: 1em;
            font-weight: bold;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
        }

        .bigger-text {
            color: #FFFFFF;
            font-size: 1.5em;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 2em;
        }

        .video-iframe {
            height: 30em;
            width: 50em;
        }
    }

    @media only screen and (max-width: 1000px) {
        .biggest-text {
            color: #FFFFFF;
            margin-top: 50%;
            font-size: 2em;
            letter-spacing: 1em;
            font-weight: bold;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
        }

        .bigger-text {
            color: #FFFFFF;
            font-size: 1.5em;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 2em;
        }

        .video-iframe {
            height: 30em;
            width: 50em;
        }

    }

    @media only screen and (min-width: 600px) {
        .number {
            color: #FFFFFF;
            font-size: 4em;
            font-weight: bold;
        }

        .sponsored {
            max-height: 5em;
        }

        .info-text {
            color: #FFFFFF;
            text-align: center;
            font-size: 2em;
        }

        .info-text-small {
            color: #FFFFFF;
            text-align: center;
        }

        .info-text-big {
            font-size: 2.5em;
            color: #FFFFFF;
            text-align: center;
            margin-top: -0.5em;
        }

        #baton-button {
            background-color: #D68956;
            color: #FFFFFF;
            border-radius: 2em;
            padding: 0.5em;
            font-size: 2em;
            text-transform: none;
            height: auto;
            margin-top: 1em;
        }

        .past-seasons-button {
            background-color: #D68956 !important;
            color: #FFFFFF;
            border-radius: 2em;
            padding: 0.5em;
            font-size: 2em;
            text-transform: none;
            height: auto;
            margin-top: 1em;
        }

        .background-header {
            background: url("../assets/main_background.png") center no-repeat;
            background-size: cover;
            height: 50em;
        }

        .background-info {
            background: url("../assets/players_background.jpg") center no-repeat;
            background-size: cover;
            height: 60em;
            margin-top: -15em;
        }

        .background-dates {
            background: url("../assets/napobedy_background.png") center no-repeat;
            background-size: cover;
            min-height: 67em;
            margin-top: -15em;
            padding-bottom: 5em;
        }

        .background-video {
            background: url("../assets/main_background.png") center no-repeat;
            background-size: cover;
            min-height: 50em;
            margin-top: -15em;
            padding-bottom: 5em;
        }

        .background-numbers {
            background: url("../assets/pc_background.png") center no-repeat;
            background-size: cover;
            min-height: 70em;
            margin-top: -15em;
        }
    }

    @media only screen and (max-width: 600px) {
        .number {
            color: #FFFFFF;
            font-size: 2em;
            font-weight: bold;
        }

        .biggest-text {
            color: #FFFFFF;
            margin-top: 50%;
            font-size: 2em;
            letter-spacing: 0.6em;
            font-weight: bold;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
        }

        .bigger-text {
            color: #FFFFFF;
            font-size: 1.5em;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 2em;
        }

        .video-iframe {
            height: 30vh;
            width: 50vw;
        }

        .info-text {
            color: #FFFFFF;
            text-align: center;
            font-size: 1em;
        }

        .info-text-small {
            color: #FFFFFF;
            text-align: center;
            font-size: 0.7em;
        }

        .info-text-big {
            font-size: 1.5em;
            color: #FFFFFF;
            text-align: center;
            margin-top: -0.5em;
        }

        #baton-button {
            background-color: #D68956;
            color: #FFFFFF;
            border-radius: 2em;
            padding: 0.5em;
            font-size: 1em;
            text-transform: none;
            height: auto;
            margin-top: 1em;
        }

        .past-seasons-button {
            background-color: #D68956 !important;
            color: #FFFFFF;
            border-radius: 2em;
            padding: 0.5em;
            font-size: 1em;
            text-transform: none;
            height: auto;
            margin-top: 1em;
        }

        .background-header {
            background: url("../assets/main_background.png") center no-repeat;
            background-size: cover;
            height: 34em;
        }

        .background-info {
            background: url("../assets/players_background.jpg") center no-repeat;
            background-size: cover;
            height: 46em;
            margin-top: -18em;
        }

        .background-dates {
            background: url("../assets/napobedy_background.png") center no-repeat;
            background-size: cover;
            min-height: 50em;
            margin-top: -15em;
            padding-bottom: 5em;
        }

        .background-video {
            background: url("../assets/main_background.png") center no-repeat;
            background-size: cover;
            min-height: 40em;
            margin-top: -15em;
            padding-bottom: 5em;
        }

        .background-numbers {
            background: url("../assets/pc_background.png") center no-repeat;
            background-size: cover;
            min-height: 55em;
            margin-top: -15em;
        }

        .sponsored {
            max-height: 3em;
        }
    }

    @media only screen and (max-width: 440px) {
        .biggest-text {
            color: #FFFFFF;
            margin-top: 50%;
            font-size: 1.5em;
            letter-spacing: 0.5em;
            font-weight: bold;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
        }

        .bigger-text {
            color: #FFFFFF;
            font-size: 1em;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 2em;
        }

        .background-numbers {
            background: url("../assets/pc_background.png") center no-repeat;
            background-size: cover;
            min-height: 75em;
            margin-top: -15em;
        }

        .sponsored {
            max-height: 2em;
        }

        .past-seasons-button {
            background-color: #D68956 !important;
            color: #FFFFFF;
            border-radius: 2em;
            padding: 0.5em;
            font-size: 0.8em;
            text-transform: none;
            height: auto;
            margin-top: 1em;
        }

        .rectangle {
            background-color: #101010;
            min-width: 150%;
            min-height: 10em;
            transform: rotate(-3deg);
            margin-left: -3em;
            transform-origin: 103%;
        }

        .background-info {
            background: url("../assets/players_background.jpg") center no-repeat;
            background-size: cover;
            height: 40em;
            margin-top: -28em;
        }
    }

    @media only screen and (max-width: 300px) {
        .biggest-text {
            color: #FFFFFF;
            margin-top: 50%;
            font-size: 1em;
            letter-spacing: 0.5em;
            font-weight: bold;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
        }

        .bigger-text {
            color: #FFFFFF;
            font-size: 0.7em;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 2em;
        }

        .background-numbers {
            background: url("../assets/pc_background.png") center no-repeat;
            background-size: cover;
            min-height: 75em;
            margin-top: -15em;
        }

        .sponsored {
            max-height: 2em;
        }

        .past-seasons-button {
            background-color: #D68956 !important;
            color: #FFFFFF;
            border-radius: 2em;
            padding: 0.5em;
            font-size: 0.8em;
            text-transform: none;
            height: auto;
            margin-top: 1em;
        }

        .background-header {
            background: url("../assets/main_background.png") center no-repeat;
            background-size: cover;
            height: 22em;
        }

        .background-info {
            background: url("../assets/players_background.jpg") center no-repeat;
            background-size: cover;
            height: 40em;
            margin-top: -28em;
        }

        .background-dates {
            background: url("../assets/napobedy_background.png") center no-repeat;
            background-size: cover;
            min-height: 50em;
            margin-top: -28em;
            padding-bottom: 5em;
        }

        .background-video {
            background: url("../assets/main_background.png") center no-repeat;
            background-size: cover;
            min-height: 40em;
            margin-top: -28em;
            padding-bottom: 5em;
        }

        .background-numbers {
            background: url("../assets/pc_background.png") center no-repeat;
            background-size: cover;
            min-height: 60em;
            margin-top: -28em;
        }
    }

    @media only screen and (min-width: 720px) {
        .photo-400-200 {
            /*min-width: 7em;*/
            /*max-width: 20em;
            max-height: 10em;*/
            padding: 0.2em;
        }
    }

    @media only screen and (max-width: 720px) {
        .photo-400-200 {
            /*max-width: 306px;*/
            /*max-width: 20em;
            max-height: 10em;*/
            padding: 0.2em;
        }
    }

    @media only screen and (min-width: 440px) {
        .csgo-logo {

        }

        .dota2-logo {

        }
    }

    @media only screen and (max-width: 440px) {
        .csgo-logo {
            width: 3em;
            height: 1.4em;
            margin-right: 1em;
            margin-top: 0.7em;
        }

        .dota2-logo {
            width: 3em;
            height: 3em;
        }
    }

    :root {
        --accent-color-dark: #aa7d64;
        --accent-color: #D68956;
    }

    .photo-200 {
        min-width: 7em;
        min-height: 7em;
        /*max-width: 15em;
        max-height: 9.2em;*/
        padding: 0.2em;
    }
</style>
