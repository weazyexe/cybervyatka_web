<template>
    <div class="container-fluid all">

        <team-modal-window v-bind:team="currentTeam" v-bind:show-dialog="showDialog"></team-modal-window>

        <div class="hamburger-menu fixed-top">
            <b-col class="horizontal-center" md="12">
                <b-row>
                    <img class="admin-menu-logo" src="../assets/logo_clear.png" alt="Logo">
                </b-row>
                <admin-menu-button button-text="Команды" image="people"></admin-menu-button>
                <admin-menu-button button-text="Игры" image="play_arrow"></admin-menu-button>
                <admin-menu-button button-text="Групповой этап" image="grid_on"></admin-menu-button>
                <admin-menu-button button-text="Плей-офф" image="call_split"></admin-menu-button>
            </b-col>
        </div>
        <div class="right-side">
            <div class="content">
                <template v-if="requestedTeams.length !== 0">
                    <div class="rect">
                        <p class="rect-header">Ожидают подтверждения</p>
                        <template v-for="(team, index) in requestedTeams">
                            <div class="team" @click="showInfo(team)" v-bind:key="index">
                                <b-row>
                                    <template v-if="team.logo === ''">
                                        <b-col md="1" class="vertical-center text-center">
                                            <img class="team-logo rounded-circle" src="../assets/logo_placeholder.png"
                                                 alt="team_logo"/>
                                        </b-col>
                                    </template>
                                    <template v-else>
                                        <b-col md="1" class="vertical-center text-center">
                                            <img class="team-logo rounded-circle" :src="team.logo"
                                                 alt="team_logo"/>
                                        </b-col>
                                    </template>
                                    <b-col md="7" class="vertical-center">

                                        <span class="team-text ">{{ team.title }}</span>
                                        <span class="game-text" v-if="team.discipline === 'CSGO'">• CS:GO</span>
                                        <span class="game-text" v-else>• Dota 2</span>

                                    </b-col>
                                    <b-col md="1" class="vertical-center text-center">
                                        <i class="material-icons done-button">done</i>
                                    </b-col>
                                    <b-col md="1" class="vertical-center text-center">
                                        <i class="material-icons cancel-button">close</i>
                                    </b-col>
                                    <b-col md="1" class="vertical-center text-center">
                                        <i class="material-icons team-text">edit</i>
                                    </b-col>
                                    <b-col md="1" class="vertical-center text-center">
                                        <i class="material-icons team-text">delete</i>
                                    </b-col>
                                </b-row>
                            </div>
                        </template>
                    </div>
                </template>

                <template v-if="confirmedTeams.length !== 0">
                    <div class="rect">
                        <p class="rect-header">Подтверждены</p>
                        <template v-for="(team, index) in confirmedTeams">
                            <div class="team" @click="showInfo(team)" v-bind:key="index">
                                <b-row>
                                    <template v-if="team.logo === ''">
                                        <b-col md="1" class="vertical-center text-center">
                                            <img class="team-logo rounded-circle" src="../assets/logo_placeholder.png"
                                                 alt="team_logo"/>
                                        </b-col>
                                    </template>
                                    <template v-else>
                                        <b-col md="1" class="vertical-center text-center">
                                            <img class="team-logo rounded-circle" :src="team.logo"
                                                 alt="team_logo"/>
                                        </b-col>
                                    </template>
                                    <b-col md="9" class="vertical-center">

                                        <span class="team-text ">{{ team.title }}</span>
                                        <span class="game-text" v-if="team.discipline === 'CSGO'">• CS:GO</span>
                                        <span class="game-text" v-else>• Dota 2</span>

                                    </b-col>
                                    <b-col md="1" class="vertical-center text-center">
                                        <i class="material-icons team-text">edit</i>
                                    </b-col>
                                    <b-col md="1" class="vertical-center text-center">
                                        <i class="material-icons team-text">delete</i>
                                    </b-col>
                                </b-row>
                            </div>
                        </template>
                    </div>
                </template>

                <template v-if="cancelledTeams.length !== 0">
                    <div class="rect">
                        <p class="rect-header">Отменены</p>
                        <template v-for="(team, index) in cancelledTeams">
                            <div class="team" @click="showInfo(team)" v-bind:key="index">
                                <b-row>
                                    <template v-if="team.logo === ''">
                                        <b-col md="1" class="vertical-center text-center">
                                            <img class="team-logo rounded-circle" src="../assets/logo_placeholder.png"
                                                 alt="team_logo"/>
                                        </b-col>
                                    </template>
                                    <template v-else>
                                        <b-col md="1" class="vertical-center text-center">
                                            <img class="team-logo rounded-circle" :src="team.logo"
                                                 alt="team_logo"/>
                                        </b-col>
                                    </template>
                                    <b-col md="9" class="vertical-center">

                                        <span class="team-text ">{{ team.title }}</span>
                                        <span class="game-text" v-if="team.discipline === 'CSGO'">• CS:GO</span>
                                        <span class="game-text" v-else>• Dota 2</span>

                                    </b-col>
                                    <b-col md="1" class="vertical-center text-center">
                                        <i class="material-icons team-text">edit</i>
                                    </b-col>
                                    <b-col md="1" class="vertical-center text-center">
                                        <i class="material-icons team-text">delete</i>
                                    </b-col>
                                </b-row>
                            </div>
                        </template>
                    </div>
                </template>

            </div>
        </div>
    </div>
</template>

<script>
    import AdminMenuButton from "./AdminMenuButton";
    import firebase from 'firebase/app';
    import TeamModalWindow from "@/components/TeamModalWindow";

    export default {
        name: "AdminTeams",
        components: {
            TeamModalWindow,
            AdminMenuButton
        },
        created() {
            let db = firebase.firestore();
            let storage = firebase.storage().ref();

            db.collection("teams").get().then((response) => {

                response.forEach((doc) => {
                    let team = doc.data();

                    if (team.logo == null) {
                        team.logo = "";

                        if (team.status === 'REQUESTED') {
                            this.requestedTeams.push(team);
                        } else if (team.status === 'CONFIRMED') {
                            this.confirmedTeams.push(team);
                        } else {
                            this.cancelledTeams.push(team);
                        }

                        this.teams.push(doc.data());
                    } else {
                        let ref = storage.child(team.logo);

                        ref.getDownloadURL().then((url) => {
                            team.logo = url;

                            if (team.status === 'REQUESTED') {
                                this.requestedTeams.push(team);
                            } else if (team.status === 'CONFIRMED') {
                                this.confirmedTeams.push(team);
                            } else {
                                this.cancelledTeams.push(team);
                            }

                            this.teams.push(doc.data());
                        });
                    }
                });
            });
        },
        data: function () {
            return {
                teams: [],
                requestedTeams: [],
                confirmedTeams: [],
                cancelledTeams: [],
                showDialog:  false,
                currentTeam: {}
            }
        },
        methods: {
            signOut() {
                firebase.auth().signOut().then(() => {
                    this.$router.replace('/auth');
                });
            },
            showInfo(team) {
                // eslint-disable-next-line no-console
                this.currentTeam = team;
                this.showDialog = true;
            }
        }
    }
</script>

<style scoped>
    .hamburger-menu {
        background-color: #101010;
        min-height: 100vh;
        padding-left: 0;
        padding-right: 0;
        min-width: 20em;
        width: 20em;
    }

    .admin-menu-logo {
        width: 6em;
        height: 6em;
        margin: 2em auto 6em;
    }

    .header-menu {
        background-color: #161616;
        min-width: 100%;
    }

    .content {
        background-color: #212121;
        padding-top: 5em;
        margin-right: auto;
        margin-left: 20em;
    }

    .all {
        margin-right: 0;
        padding-right: 0;
        margin-left: 0;
        padding-left: 0;
    }

    .rect {
        background-color: #282828;
        border-radius: 1em;
        padding-top: 2em;
        margin: 2em;
    }

    .rect-header {
        color: rgba(255, 255, 255, 0.38);
        margin-left: 2em;
        font-family: Roboto, serif;
        font-weight: 500;
    }

    .team-logo {
        width: 4em;
        height: 4em;
    }

    .team-text {
        color: #FFFFFF;
        font-size: 1.5em;
    }

    .vertical-center {
        margin-top: auto;
        margin-bottom: auto;
    }

    .horizontal-center {
        margin-left: auto;
        margin-right: auto;
    }

    .team {
        padding: 1em 1.5em;
        border-radius: 1em;
    }

    .team:hover {
        background-color: rgba(255, 255, 255, 0.02);
    }

    .game-text {
        color: rgba(255, 255, 255, 0.1);
        padding-left: 0.4em;
        font-size: 1.5em;
    }



    .done-button {
        color: #7cbc62;
        font-weight: 700;
    }

    .cancel-button {
        color: #bd3221;
        font-weight: 700;
    }


</style>