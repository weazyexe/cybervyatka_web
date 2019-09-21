<template>
    <div>
        <div class="background-header">
            <landing-header></landing-header>

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
                    проводящийся с 2018 года в ВятГУ. <strong class="strong-info-text">21 октября 2019 года</strong> начинается регистрация на третий сезон!</p>
                <md-button id="past-seasons-button" class="md-raised">Прошлые сезоны</md-button>
            </b-container>
        </div>

        <div class="prerect-top">
            <div class="rectangle"></div>
        </div>

        <div class="background-numbers text-center">
            <b-container class="info-content">
                <b-col>
                    <b-row>
                        <div class="mr-auto">
                            <p class="number">150<strong class="strong-info-text">+</strong></p>
                            <p class="info-text">Участников</p>
                        </div>
                        <div class="mr-auto">
                            <p class="number">2</p>
                            <p class="info-text">Дисциплины</p>
                        </div>
                        <div>
                            <p class="number">100<strong class="strong-info-text">%</strong></p>
                            <p class="info-text">FUN</p>
                        </div>
                    </b-row>
                    <b-row class="mt-5">
                        <img src="../assets/csgo-white.png" class="ml-auto mr-5" alt="csgo_logo">
                        <img src="../assets/dota2-white.png" class="mr-auto" alt="dota2_logo">
                    </b-row>
                </b-col>
            </b-container>
        </div>
    </div>

</template>

<script>
import LandingHeader from "@/components/LandingHeader";
export default {
  name: 'Header',
    components: {LandingHeader},
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
        margin-top: -10%;
    }

    .background-numbers {
        background: url("../assets/pc_background.png") center no-repeat;
        background-size: cover;
        height: 45em;
        margin-top: -10%;
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

    :root {
        --accent-color-dark: #aa7d64;
        --accent-color: #D68956;
    }

    .accent-button:hover, .accent-button:active, .accent-button.focus,
    .accent-button-big:hover, .accent-button-big:active, .accent-button-big:focus {
        background: var(--accent-color-dark);
        border-color: var(--accent-color-dark);
        outline: none !important;
        box-shadow: none;
    }
</style>
