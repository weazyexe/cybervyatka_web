<template>
    <div>
        <team-modal-window :team="currentTeam" :show-contacts="false" :on-confirm="onShowConfirm" :show-team-dialog="showTeamDialog"></team-modal-window>

        <div class="field">
            <landing-header></landing-header>

            <div>
                <b-row class="header">
                    <p class="biggest-text">Команды</p>

                    <md-field id="select-game">
                        <md-select name="status" id="status" v-model="game" md-dense>
                            <md-option value="CSGO">CS:GO</md-option>
                            <md-option value="DOTA2">Dota 2</md-option>                     
                        </md-select>
                    </md-field>
                </b-row>

            </div>

            <div class="prerect">
                <div class="rectangle"></div>
            </div>
        </div>

        <b-container fluid id="teams-content" :class="game === 'CSGO' ? 'csgo-back' : 'dota2-back'">
            <b-row class="text-center">
                <template v-for="(team, index) in teams">
                    <template v-if="team.discipline === game && team.status === 'CONFIRMED'">
                        <div :key="index" class="team-button">
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

</template>

<script>

    import firebase from 'firebase';
    import TeamModalWindow from "@/components/TeamModalWindow";
    import LandingHeader from "@/components/LandingHeader";

    export default {

        name: 'LandingTeams',
        components: {LandingHeader, TeamModalWindow},
        data: function() {
            return {
                game : 'CSGO',
                teams : [],
                showTeamDialog : false,
                currentTeam : {}
            }
        },
        created() {
            let db = firebase.firestore();

            db.collection("teams").get().then((response) => {

                response.forEach((doc) => {
                    let team = doc.data();

                    if (team.status === 'CONFIRMED') this.teams.push(team);
                });
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

    #select-game{
        margin-left: 2em;
        margin-top: 15.4em;
        padding-top: 3em;
        width: 5em;
        display: inline;
        position: unset;
    }

    .header {
        margin-right: 0;
        margin-left: 0;
    }

    .field {
        background: url("../assets/main_background.png") center no-repeat;
        background-size: cover;
        max-height: 45em;
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
        min-height: 10em;
        transform: rotate(-3deg);
        margin-left: -7em;
        transform-origin: 103%;
        z-index: 1;
    }

    .biggest-text {
        color: #FFFFFF;
        margin-top: 4em;
        font-size: 4em;
        font-weight: bold;
        text-align: left;
        margin-left: 3.5em;
    }

    :root {
        --accent-color-dark: #aa7d64;
        --accent-color: #D68956;
    }

    #teams-content {
        background-color: #101010;
        z-index: 2;
        margin-top: -10em;
        padding: 7em 5% 10% 8%;
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
        margin-left: 5em;
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

</style>
