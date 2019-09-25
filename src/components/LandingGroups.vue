<template>
    <div class="parallax">
        <div class="all-content parallax__layer parallax__layer--back"></div>

        <div class="parallax__layer parallax__layer--base">
            <landing-header></landing-header>
            <b-row class="header">
                <p class="biggest-text">Группы</p>

                <md-field id="select-game">
                    <md-select name="status" id="status" v-model="discipline" md-dense>
                        <md-option value="CSGO">CS:GO</md-option>
                        <md-option value="DOTA2">Dota 2</md-option>
                    </md-select>
                </md-field>
            </b-row>
        </div>

        <div class="prerect">
            <div class="rectangle"></div>
        </div>

        <b-container fluid id="teams-content" :class="discipline === 'CSGO' ? 'csgo-back' : 'dota2-back'">
            <b-col>
                <b-row>
                    <b-container v-if="isLoading" class="text-center">
                        <md-progress-spinner class="main-color" md-mode="indeterminate"></md-progress-spinner>
                    </b-container>
                    <template v-else-if="groups.length === 0">
                        <b-container class="text-center">
                            <b-col>
                                <i class="material-icons sad-face">sentiment_dissatisfied</i>
                                <p class="bigger-text">Группы не сформированы</p>
                            </b-col>
                        </b-container>
                    </template>
                    <b-container fluid v-else>
                        <b-row class="ml-3">
                            <template v-for="(group, index) in groups">
                                <template v-if="group.discipline === discipline">
                                    <group-entry :key="index" :group="group" :hide-buttons="true"></group-entry>
                                </template>
                            </template>
                        </b-row>
                    </b-container>
                </b-row>
            </b-col>
        </b-container>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import LandingHeader from "@/components/LandingHeader";
    import GroupEntry from "@/components/GroupEntry";

    export default {
        name: "LandingGroups",
        components: {
            LandingHeader,
            GroupEntry,
        },
        data: function () {
            return {
                groups: [],
                isLoading : true,
                discipline: 'CSGO'
            }
        },
        created() {
            let db = firebase.firestore();

            db.collection("groups").get().then((response) => {
                response.forEach((rawGroup) => {
                    let group = rawGroup.data();

                    let teams = [];
                    let oldTeams = group.teams;
                    oldTeams.forEach((teamRef) => {
                        teamRef.get().then((team) => {
                            teams.push(team.data());
                            group.teams = teams;

                            this.isLoading = false;
                        });
                    });

                    this.groups.push(group);
                });
            });
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
        margin-top: 12em;
        padding-top: 16em;
        overflow-x: hidden;
        overflow-y: hidden;
        z-index: -1;
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

    .biggest-text {
        color: #FFFFFF;
        margin-top: 4em;
        font-size: 4em;
        font-weight: bold;
        text-align: left;
        margin-left: 10.5%;
    }

    #teams-content {
        background-color: #101010;
        z-index: 2;
        margin-top: -3em;
        padding: 3% 10% 10% 10%;
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
        transform: translateZ(-1px) scale(2.1);
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
        width: 5em;
        display: inline;
        position: unset;
    }

    .bigger-text {
        color: #FFFFFF;
        font-size: 1.5em;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 2em;
    }

    .header {
        margin-right: 0;
        margin-left: 0;
    }

    .sad-face {
        color: #FFFFFF;
        text-align: center;
        font-size: 5em;
    }


    :root {
        --accent-color-dark: #aa7d64;
        --accent-color: #D68956;
    }


    .csgo-back {
        background: url("../assets/csgo.svg") center no-repeat;
    }

    .dota2-back {
        background: url("../assets/dota2.png") center no-repeat;
    }
</style>