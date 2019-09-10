<template>
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
</template>

<script>
    export default {
        name: "LandingInfo"
    }
</script>

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