<template>
    <div>
        <div class="field">
            <landing-header></landing-header>

            <b-container>
                <b-row>
                    <p class="biggest-text">CYBERVYATKA</p>
                </b-row>
                <b-row>
                    <p class="bigger-text">Киберспортивный турнир в Кирове</p>
                </b-row>
            </b-container>

            <div class="prerect">
                <div class="rectangle"></div>
            </div>
            
        </div>

        <div class="all">
        <div class="info">
            <div class="content">
                <b-row>
                    <b-col md="3">
                        <img src="../assets/logos_evo.png" alt="logos_evo" class="logos-evo">
                    </b-col>
                    <b-col md="9">
                        <b-row>
                            <p class="description-text">
                                CYBERVYATKA - это киберспортивный турнир в городе Кирове, проводящийся с 2018 года в ВятГУ.
                                21 октября 2019 года начинается регистрация на третий сезон!
                            </p>
                        </b-row>
                        <b-row>
                            <b-button class="menu-item accent-button-big shadow-none">Прошлые сезоны</b-button>
                        </b-row>
                    </b-col>
                </b-row>
            </div>
        </div>
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

    .logos-evo {
        width: 50%;
    }

    .content {
        padding-left: 20%;
        padding-right: 20%;
    }

    .description-text {
        font-size: 1.5em;
        color: #FFFFFF;
        margin-bottom: 3.4em;
    }

    .info {
        background: url("../assets/players_background.jpg") center no-repeat;
        background-size: cover;
        margin-top: -2em;
    }

    .accent-button-big {
        font-size: 1.5em;
    }

    .field {
        background: url("../assets/main_background.png") center no-repeat;
        background-size: cover;
    }

    .prerect {
        max-width: 100%;
        min-width: 100%;
        height: 30em;
        margin-top: -5em;
        overflow-x: hidden;
        overflow-y: hidden; 
    }
    
    .rectangle {
        background-color: #101010;
        min-width: 110%;
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

    .menu-item {
        margin-right: 3em;
        color: #FFF !important;
    }

    .menu-item:hover {
        color: #000;
    }

    .accent-button, .accent-button-big {
        background: var(--accent-color);
        box-shadow: 0 0.5em 0.5em rgba(0, 0, 0, 0.25);
        border-radius: 2em;
        padding-left: 1em;
        padding-right: 1em;
        border-color: var(--accent-color);
    }

    .accent-button:hover, .accent-button:active, .accent-button.focus,
    .accent-button-big:hover, .accent-button-big:active, .accent-button-big:focus {
        background: var(--accent-color-dark);
        border-color: var(--accent-color-dark);
        outline: none !important;
        box-shadow: none;
    }
</style>
