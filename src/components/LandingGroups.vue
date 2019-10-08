<template>
    <div class="parallax">
        <div class="all-content parallax__layer parallax__layer--back"></div>

        <div class="parallax__layer parallax__layer--base">
            <landing-header :is-groups-active="true"></landing-header>
            <b-row class="header">
                <p class="biggest-text">Группы</p>

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
                <b-col>
                    <b-row>
                        <b-container v-if="isLoading" class="text-center">
                            <md-progress-spinner class="main-color" md-mode="indeterminate"></md-progress-spinner>
                        </b-container>
                        <template v-else-if="isZeroGroups">
                            <b-container class="text-center">
                                <b-col>
                                    <i class="material-icons sad-face">sentiment_dissatisfied</i>
                                    <p class="bigger-text">Группы не сформированы</p>
                                </b-col>
                            </b-container>
                        </template>
                        <b-container fluid v-else>
                            <b-row class="text-center">
                                <template v-for="(group, index) in groups">
                                    <template v-if="group.discipline === discipline">
                                        <group-entry class="mlr-auto" :key="index" :group="group" :hide-buttons="true"></group-entry>
                                    </template>
                                </template>
                            </b-row>
                        </b-container>
                    </b-row>
                </b-col>
            </b-container>

            <landing-footer></landing-footer>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import LandingHeader from "@/components/LandingHeader";
    import GroupEntry from "@/components/GroupEntry";
    import LandingFooter from "@/components/LandingFooter";

    export default {
        name: "LandingGroups",
        components: {
            LandingHeader,
            GroupEntry,
            LandingFooter
        },
        data: function () {
            return {
                groups: [],
                isLoading : true,
                discipline: 'CSGO',
                isOpen: true
            }
        },
        computed: {
            isZeroGroups: function () {
                return this.groups.length === 0 || this.groups.filter((group) => group.discipline === this.discipline).length === 0;
            }
        },
        created() {
            document.title = this.$route.meta.title;
            let db = firebase.firestore();

            db.doc('tournament/settings').get().then((settingsRaw) => {
                this.isOpen = settingsRaw.data().isGroupsOpen;

                if (this.isOpen) {
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

                        if (response.size === 0) {
                            this.isLoading = false;
                            this.groups = [];
                        }
                    });
                }

                this.isLoading = false;
                this.groups = [];
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