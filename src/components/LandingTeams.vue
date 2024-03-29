<template>
    <div class="parallax">
        <team-dialog :team="currentTeam" :show-contacts="false" :on-confirm="onShowConfirm" :show="showTeamDialog"></team-dialog>
        <div class="all-content parallax__layer parallax__layer--back"></div>

        <div class="parallax__layer parallax__layer--base">
            <landing-header :is-teams-active="true"></landing-header>
            <b-row class="header">
                <p class="biggest-text">Команды</p>

                <md-field id="select-game">
                    <md-select name="status" id="status" v-model="discipline" md-dense>
                        <md-option value="CSGO">CS:GO</md-option>
                        <md-option value="DOTA2">Dota 2</md-option>
                    </md-select>
                </md-field>
            </b-row>

            <div class="prerect">
                <div class="rectangle"></div>
            </div>

            <b-container fluid id="teams-content" :class="discipline === 'CSGO' ? 'csgo-back' : 'dota2-back'">
                <b-row class="text-center">
                    <b-container v-if="isLoading" class="text-center">
                        <md-progress-spinner class="main-color" md-mode="indeterminate"></md-progress-spinner>
                    </b-container>
                    <template v-else-if="isZeroTeams">
                        <b-container class="text-center">
                            <b-col>
                                <i class="material-icons sad-face">sentiment_dissatisfied</i>
                                <p class="bigger-text">Команд нет</p>
                            </b-col>
                        </b-container>
                    </template>
                    <template v-else v-for="(team, index) in teams">
                        <template v-if="team.discipline === discipline && team.status === 'CONFIRMED' && !team.invisible">
                            <div :key="index" class="team-button mlr-auto">
                                <b-row @click="showTeam(team)" class="text-center">
                                    <template v-if="team.logo !== null && team.logo !== ''">
                                        <img :src="team.logo" alt="team logo" class="team-logo rounded-circle mt-auto mb-auto">
                                    </template>
                                    <template v-else>
                                        <img src="../assets/logo_placeholder.png" alt="team logo" class="team-logo rounded-circle mt-auto mb-auto">
                                    </template>
                                    <p class="team-title mr-3 mt-auto mb-auto">{{ team.title }}</p>
                                    <template v-if="team.isInvited">
                                        <span class="live-icon mt-auto mb-auto mr-auto">INVITED</span>
                                    </template>
                                </b-row>
                            </div>
                        </template>
                    </template>
                </b-row>
            </b-container>
            <landing-footer></landing-footer>
        </div>
    </div>
</template>

<script>

    import firebase from 'firebase';
    import TeamDialog from "@/components/TeamDialog";
    import LandingHeader from "@/components/LandingHeader";
    import LandingFooter from "@/components/LandingFooter";

    export default {

        name: 'LandingTeams',
        components: {
            LandingHeader,
            TeamDialog,
            LandingFooter
        },
        data: function() {
            return {
                discipline : 'CSGO',
                teams : [],
                showTeamDialog : false,
                currentTeam : {},
                isLoading: true
            }
        },
        created() {
            document.title = this.$route.meta.title;
            let db = firebase.firestore();

            db.collection("teams").get().then((response) => {
                response.forEach((doc) => {
                    let team = doc.data();

                    if (team.status === 'CONFIRMED') {
                        this.teams.push(team);
                    }
                });

                this.isLoading = false;
            });
        },
        methods: {
            showTeam(team) {
                this.currentTeam = team;
                this.showTeamDialog = true;
            },
            onShowConfirm() {
                this.showTeamDialog = false;
            }
        },
        computed: {
            isZeroTeams: function () {
                return this.teams.filter((it) => it.discipline === this.discipline && it.status === 'CONFIRMED').length === 0;
            }
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    html, body {
        max-width: 100%;
        overflow-x: hidden;
    }

    .live-icon {
        color: #FFFFFF;
        background-color: #5e91ff;
        border-radius: 0.7em;
        padding: 0.5em 0.8em;
        font-size: 0.5em;
        height: 2.3em;
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

    @media only screen and (max-width: 350px) {
        .biggest-text {
            color: #FFFFFF;
            margin-top: 3em;
            font-size: 1.5em;
            font-weight: bold;
            text-align: left;
            margin-left: 10.5%;
        }

        #select-game{
            margin-left: 0.5em;
            margin-top: 1.8em;
            padding-top: 3em;
            width: 5.2em;
            display: inline;
            position: unset;
        }

        .team-title {
            color: #FFFFFF;
            font-size: 1em;
            margin-top: auto;
            margin-left: 1em;
        }

        .team-logo {
            width: 2em;
            height: 2em;
            margin-left: 1em;
        }

        .team-button {
            margin-right: 3em;
            width: 15em;
            margin-bottom: 2em;
            padding: 1em;
        }

        #teams-content {
            background-color: #101010;
            margin-top: -27em;
            padding: 3% 10% 10% 10%;
            min-height: 30em;
        }
    }

    @media only screen and (min-width: 350px) {
        .biggest-text {
            color: #FFFFFF;
            margin-top: 5em;
            font-size: 2em;
            font-weight: bold;
            text-align: left;
            margin-left: 10.5%;
        }

        #select-game{
            margin-left: 1em;
            margin-top: 7.8em;
            padding-top: 3em;
            width: 5.2em;
            display: inline;
            position: unset;
        }

        .team-title {
            color: #FFFFFF;
            font-size: 1em;
            margin-top: auto;
            margin-left: 1em;
        }

        .team-logo {
            width: 3em;
            height: 3em;
            margin-left: 1em;
        }

        .team-button {
            margin-right: 3em;
            width: 20em;
            margin-bottom: 2em;
            padding: 1em;
        }

        #teams-content {
            background-color: #101010;
            margin-top: -27em;
            padding: 3% 10% 10% 10%;
            min-height: 30em;
        }
    }

    @media only screen and (min-width: 400px) {
        .biggest-text {
            color: #FFFFFF;
            margin-top: 6.8em;
            font-size: 2.5em;
            font-weight: bold;
            text-align: left;
            margin-left: 10.5%;
        }

        #select-game{
            margin-left: 2em;
            margin-top: 15.4em;
            padding-top: 3em;
            width: 5.2em;
            display: inline;
            position: unset;
        }

        .team-title {
            color: #FFFFFF;
            font-size: 1.5em;
            margin-top: auto;
            margin-left: 1em;
        }

        .team-logo {
            width: 4em;
            height: 4em;
            margin-left: 1em;
        }

        .team-button {
            margin-right: 3em;
            width: 25em;
            margin-bottom: 2em;
            padding: 1em;
        }

        #teams-content {
            background-color: #101010;
            margin-top: -25em;
            padding: 3% 10% 10% 10%;
            min-height: 30em;
        }
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

        .team-title {
            color: #FFFFFF;
            font-size: 1.5em;
            margin-top: auto;
            margin-left: 1em;
        }

        .team-logo {
            width: 4em;
            height: 4em;
            margin-left: 1em;
        }

        .team-button {
            margin-right: 3em;
            width: 25em;
            margin-bottom: 2em;
            padding: 1em;
        }

        #teams-content {
            background-color: #101010;
            margin-top: -23em;
            padding: 3% 10% 10% 10%;
            min-height: 30em;
        }
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

    .md-field::after {
        height: 0;
    }

    .md-field::before {
        height: 0;
    }

    .md-field > .md-icon::after {
        width: 0;
        height: 0;
    }

    .md-field>.md-icon:after {
        content: none;
    }

    .header {
        margin-right: 0;
        margin-left: 0;
    }

    :root {
        --accent-color-dark: #aa7d64;
        --accent-color: #D68956;
    }

    .team-button:hover {
        cursor: pointer;
        border-radius: 1em;
        background: rgba(50, 50, 50, 0.4);
    }

    .csgo-back {
        background: url("../assets/csgo.svg") center no-repeat;
    }

    .dota2-back {
        background: url("../assets/dota2.png") center no-repeat;
    }

    .sad-face {
        color: #FFFFFF;
        text-align: center;
        font-size: 5em;
        margin-top: 1em;
    }

    .bigger-text {
        color: #FFFFFF;
        font-size: 1.5em;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 2em;
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
</style>
