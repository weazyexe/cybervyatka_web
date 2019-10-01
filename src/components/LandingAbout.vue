<template>
    <div class="parallax">
        <div class="all-content parallax__layer parallax__layer--back"></div>

        <div class="parallax__layer parallax__layer--base">
            <landing-header></landing-header>
            <b-row class="header">
                <p class="biggest-text">О турнире</p>
            </b-row>

            <div class="prerect">
                <div class="rectangle"></div>
            </div>

            <b-container fluid id="teams-content">
                <b-row class="filters ml-auto mr-auto text-center">
                    <b-col>
                        <img src="../assets/logo_clear.png" alt="logo" class="logo mr-auto mb-3">
                        <p class="text"><strong class="text-colored text-weight">CYBERVYATKA</strong> - это киберспортивная лига, которая проводится 2 раза в год, участие могут принять все желающие.
                            В широком плане турнир нацелен на:</p>
                        <ul class="mt-3">
                            <li class="text-list">Популяризацию киберспорта в городе Кирове</li>
                            <li class="text-list">Изменения общего мнения о видеоиграх как только о средстве развлечения и досуга</li>
                            <li class="text-list">Формирование соревновательной атмосферы среди любителей видеоигр</li>
                            <li class="text-list">Формирование из молодого поколения киберспортсменов профессионального уровня</li>
                        </ul>

                        <p class="text mt-5 pt-5">Участники турнира <strong class="text-colored text-weight">получат</strong>:</p>
                        <ul class="mt-3">
                            <li class="text-list">Опыт участия в соревнованиях компьютерного спорта</li>
                            <li class="text-list">Возможность заявить о себе и своей команде</li>
                            <li class="text-list">Повышение командного уровеня игры</li>
                            <li class="text-list">Призы и подарки от партнеров</li>
                            <li class="text-list">Яркие и позитивные эмоции</li>
                        </ul>
                    </b-col>
                </b-row>
            </b-container>

            <landing-footer></landing-footer>
        </div>
    </div>
</template>

<script>
    import LandingFooter from "@/components/LandingFooter";
    import LandingHeader from "@/components/LandingHeader";

    export default {
        name: "LandingAbout",
        components: {
            LandingHeader,
            LandingFooter
        },
        created() {
            document.title = this.$route.meta.title;
        }
    }
</script>

<style scoped>

    ul {
        list-style: none; /* Remove default bullets */
    }

    ul li::before {
        content: '\2022';
        color: #D68956;
        margin-right: 1em;
    }

    .logo {
        width: 10em;
        height: 10em;
    }

    .text-colored {
        color: #D68956;
    }

    .text-weight {
        font-weight: bold;
    }

    .prerect {
        max-width: 100%;
        min-width: 100%;
        height: 30em;
        overflow-x: hidden;
        overflow-y: hidden;
        z-index: -1;
        position: relative;
    }

    .rectangle {
        background-color: #101010;
        min-width: 110%;
        min-height: 12em;
        transform: rotate(-3deg);
        margin-left: -7em;
        transform-origin: 103%;
    }

    .all-content {
        background: url("../assets/main_background.png") center no-repeat;
        background-size: cover;
        max-height: 45em;
        z-index: -1;
        margin-top: -4%;
    }

    @media only screen and (min-width: 721px) {
        .biggest-text {
            color: #FFFFFF;
            margin-top: 4em;
            font-size: 4em;
            font-weight: bold;
            text-align: left;
            margin-left: 10.5%;
        }

        .text {
            color: white;
            font-size: 2.2em;
            margin-bottom: 0;
            margin-top: 1em;
            text-align: start;
        }

        .text-list {
            color: #DFDFDF;
            font-size: 1.5em;
            text-align: start;
        }
    }

    @media only screen and (max-width: 720px) {
        .biggest-text {
            color: #FFFFFF;
            margin-top: 6.8em;
            font-size: 2.5em;
            font-weight: bold;
            text-align: left;
            margin-left: 10.5%;
        }

        .text {
            color: white;
            font-size: 1.5em;
            margin-bottom: 0;
            margin-top: 1em;
            text-align: start;
        }

        .text-list {
            color: #DFDFDF;
            font-size: 1.3em;
            text-align: start;
        }
    }

    @media only screen and (min-width: 721px) {
        .mlr-auto {

        }
    }

    @media only screen and (max-width: 720px) {
        .mlr-auto {
            margin-left: auto;
            margin-right: auto;
        }
    }

    #teams-content {
        background-color: #101010;
        margin-top: -23em;
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

    .filters {
        margin-left: 1em;
        margin-bottom: 3em;
    }

    .header {
        margin-right: 0;
        margin-left: 0;
    }

    :root {
        --accent-color-dark: #aa7d64;
        --accent-color: #D68956;
    }
</style>