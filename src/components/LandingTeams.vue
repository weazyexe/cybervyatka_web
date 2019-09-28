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
                        <template v-if="team.discipline === discipline && team.status === 'CONFIRMED'">
                            <div :key="index" class="team-button ml-auto mr-auto">
                                <b-row @click="showTeam(team)">
                                    <img :src="team.logo" alt="team logo" class="team-logo rounded-circle">
                                    <p class="team-title">{{ team.title }}</p>
                                </b-row>
                            </div>
                        </template>
                    </template>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>

    import firebase from 'firebase';
    import TeamDialog from "@/components/TeamDialog";
    import LandingHeader from "@/components/LandingHeader";

    export default {

        name: 'LandingTeams',
        components: {LandingHeader, TeamDialog},
        data: function() {
            return {
                discipline : 'CSGO',
                teams : [],
                showTeamDialog : false,
                currentTeam : {},
                isLoading: true,
                isZeroTeams: false
            }
        },
        created() {
            document.title = this.$route.meta.title;
            let db = firebase.firestore();

            db.collection("teams").get().then((response) => {

                let count = 0;

                response.forEach((doc) => {
                    let team = doc.data();

                    if (team.status === 'CONFIRMED') {
                        this.teams.push(team);
                        count++;
                    }
                });

                if (count === 0) {
                    this.isZeroTeams = true;
                }

                this.isLoading = false;
            }, () => {
                this.isZeroTeams = true;
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
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    }

    @media only screen and (max-width: 720px) {
        .biggest-text {
            color: #FFFFFF;
            margin-top: 5.5em;
            font-size: 3em;
            font-weight: bold;
            text-align: left;
            margin-left: 10.5%;
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

    #select-game{
        margin-left: 2em;
        margin-top: 15.4em;
        padding-top: 3em;
        width: 10vw;
        display: inline;
        position: unset;
    }

    .header {
        margin-right: 0;
        margin-left: 0;
    }

    :root {
        --accent-color-dark: #aa7d64;
        --accent-color: #D68956;
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
        width: 20em;
        margin-bottom: 2em;
        padding: 1em;
    }

    .team-button:hover {
        cursor: pointer;
        border-radius: 1em;
        background-color: #303030;
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

</style>
