<template>
    <div>
        <div class="background-header">
            <landing-header :is-main-active="true"></landing-header>

            <b-container>
                <b-row>
                    <p class="biggest-text">CYBERVYATKA</p>
                </b-row>
                <b-row>
                    <p class="bigger-text">Киберспортивный турнир в Кирове</p>
                </b-row>
            </b-container>
        </div>

        <div class="prerect-top">
            <div class="rectangle"></div>
        </div>

        <div class="background-info text-center">
            <b-container class="info-content">
                <p class="info-text ml-auto mr-auto"><strong class="strong-info-text">CYBERVYATKA</strong> - это киберспортивный турнир в городе Кирове,
                    проводящийся с 2018 года в ВятГУ. Регистрация на третий сезон заканчивается <strong class="strong-info-text">20 октября 2019 года</strong>!</p>
<!--                <md-button id="past-seasons-button" class="md-raised">Прошлые сезоны</md-button>-->
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
                            <p class="number">150<strong class="strong-info-text">+</strong></p>
                            <p class="info-text">Участников</p>
                        </div>
                        <div class="ml-auto mr-auto pl-5 pr-5 pb-5">
                            <p class="number">2</p>
                            <p class="info-text">Дисциплины</p>
                        </div>
                        <div class="ml-auto mr-auto pl-5 pr-5 pb-5">
                            <p class="number">100<strong class="strong-info-text">%</strong></p>
                            <p class="info-text">FUN</p>
                        </div>
                    </b-row>
                    <b-row class="mt-5 ml-auto mr-auto pl-5 pr-5 pb-5">
                        <img src="../assets/csgo-white.png" class="ml-auto mr-5" alt="csgo_logo">
                        <img src="../assets/dota2-white.png" class="mr-auto" alt="dota2_logo">
                    </b-row>
                </b-col>
            </b-container>
            <landing-footer></landing-footer>
        </div>
    </div>

</template>

<script>
import LandingHeader from "@/components/LandingHeader";
import LandingFooter from "@/components/LandingFooter";

export default {
  name: 'Header',
    components: {
        LandingHeader,
        LandingFooter
    },
    created() {
      document.title = this.$route.meta.title;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .background-header {
        background: url("../assets/main_background.png") center no-repeat;
        background-size: cover;
        height: 50em;
    }

    .background-info {
        background: url("../assets/players_background.jpg") center no-repeat;
        background-size: cover;
        height: 45em;
        margin-top: -15em;
    }

    .background-numbers {
        background: url("../assets/pc_background.png") center no-repeat;
        background-size: cover;
        height: 30%;
        margin-top: -15em;
    }

    .info-text {
        color: #FFFFFF;
        text-align: center;
        font-size: 2em;
    }

    .strong-info-text {
        color: #D68956;
        font-weight: bold;
    }

    .number {
        color: #FFFFFF;
        font-size: 4em;
        font-weight: bold;
    }

    .info-content {
        padding-top: 15em;
    }

    #past-seasons-button {
        background-color: #D68956;
        color: #FFFFFF;
        border-radius: 2em;
        padding: 0.5em;
        font-size: 2em;
        text-transform: none;
        height: auto;
        margin-top: 1em;
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
    
    .rectangle {
        background-color: #101010;
        min-width: 150%;
        min-height: 20em;
        transform: rotate(-3deg);
        margin-left: -7em;
        transform-origin: 103%;
    }

    @media only screen and (min-width: 1301px){
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
    }

    @media only screen and (max-width: 1300px){
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
    }

    @media only screen and (max-width: 1000px){
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
    }

    @media only screen and (max-width: 600px){
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
    }

    .bigger-text {
        color: #FFFFFF;
        font-size: 1.5em;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 2em;
    }

    :root {
        --accent-color-dark: #aa7d64;
        --accent-color: #D68956;
    }
</style>
