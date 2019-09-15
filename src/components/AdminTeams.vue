<template>
    <div class="container-fluid all">

        <team-modal-window v-bind:team="currentTeam" v-bind:show-team-dialog="showTeamDialog"></team-modal-window>

        <router-link to="/admin/teams/add">
            <md-button class="md-fab md-primary add-fab">
                <md-icon>add</md-icon>
            </md-button>
        </router-link>

        <div class="hamburger-menu fixed-top">
            <b-col class="horizontal-center" md="12">
                <b-row>
                    <img class="admin-menu-logo" src="../assets/logo_clear.png" alt="Logo">
                </b-row>
                <router-link to="/admin/teams">
                    <admin-menu-button button-text="Команды" image="people" v-bind:is-active="true"></admin-menu-button>
                </router-link>

                <router-link to="/admin/games">
                    <admin-menu-button button-text="Игры" image="play_arrow"></admin-menu-button>
                </router-link>

                <router-link to="/admin/groups">
                    <admin-menu-button button-text="Групповой этап" image="grid_on"></admin-menu-button>
                </router-link>

                <router-link to="/admin/playoff">
                    <admin-menu-button button-text="Плей-офф" image="call_split"></admin-menu-button>
                </router-link>
            </b-col>
        </div>
        <div class="right-side">
            <div class="content">
                <template v-if="teams.length === 0">
                    <md-progress-spinner class="main-color" md-mode="indeterminate"></md-progress-spinner>
                </template>
                <template v-else>
                    <template v-if="requestedTeams.length !== 0">
                        <div class="rect">
                            <p class="rect-header">Ожидают подтверждения</p>
                            <template v-for="(team, index) in requestedTeams">
                                <div class="team" v-bind:key="index">
                                    <admin-team-entry v-bind:is-requested="true"
                                                      v-bind:on-edit="editTeam"
                                                      v-bind:on-delete="deleteTeam"
                                                      v-bind:on-cancel="cancelTeam"
                                                      v-bind:on-confirm="confirmTeam"
                                                      v-bind:on-show="showInfo"
                                                      v-bind:team="team">
                                    </admin-team-entry>
                                </div>
                            </template>
                        </div>
                    </template>

                    <template v-if="confirmedTeams.length !== 0">
                        <div class="rect">
                            <p class="rect-header">Подтверждены</p>
                            <template v-for="(team, index) in confirmedTeams">
                                <div class="team" v-bind:key="index">
                                    <admin-team-entry v-bind:is-requested="false"
                                                      v-bind:on-edit="editTeam"
                                                      v-bind:on-delete="deleteTeam"
                                                      v-bind:on-show="showInfo"
                                                      v-bind:team="team">
                                    </admin-team-entry>
                                </div>
                            </template>
                        </div>
                    </template>

                    <template v-if="cancelledTeams.length !== 0">
                        <div class="rect">
                            <p class="rect-header">Отменены</p>
                            <template v-for="(team, index) in cancelledTeams">
                                <div class="team" v-bind:key="index">
                                    <admin-team-entry v-bind:is-requested="false"
                                                      v-bind:on-edit="editTeam"
                                                      v-bind:on-delete="deleteTeam"
                                                      v-bind:on-show="showInfo"
                                                      v-bind:team="team">
                                    </admin-team-entry>
                                </div>
                            </template>
                        </div>
                    </template>
                </template>

            </div>
        </div>
    </div>
</template>

<script>
    import AdminMenuButton from "./AdminMenuButton";
    import firebase from 'firebase/app';
    import TeamModalWindow from "@/components/TeamModalWindow";
    import AdminTeamEntry from "@/components/AdminTeamEntry";

    export default {
        name: "AdminTeams",
        components: {
            AdminTeamEntry,
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
                currentTeam: {},

                showTeamDialog:  false,
                showDeleteDialog:  false,
            }
        },
        methods: {
            signOut() {
                firebase.auth().signOut().then(() => {
                    this.$router.replace('/auth');
                });
            },
            showInfo(team) {
                this.currentTeam = team;
                this.showTeamDialog = true;
            },
            editTeam(team) {
                this.currentTeam = team;
                this.$router.push({ path: '/admin/teams/edit',  query : { title: team.title, discipline: team.discipline } });
            },
            deleteTeam(team) {
                // eslint-disable-next-line no-console
                console.log(team);
            },
            confirmTeam(team) {
                // eslint-disable-next-line no-console
                console.log(team);
            },
            cancelTeam(team) {
                // eslint-disable-next-line no-console
                console.log(team);
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
        box-shadow: 0 0.2em 1em rgba(0, 0, 0, 0.18);
    }

    .admin-menu-logo {
        width: 6em;
        height: 6em;
        margin: 2em auto 6em;
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
        box-shadow: 0 0.2em 1em rgba(0, 0, 0, 0.18);
    }

    .rect-header {
        color: rgba(255, 255, 255, 0.38);
        margin-left: 2em;
        font-family: Roboto, serif;
        font-weight: 500;
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

    .add-fab {
        position: fixed;
        bottom: 3em;
        right: 3em;
        background-color: #D68956;
        color: #FFFFFF;
    }

    .main-color {
        color: #D68956;
    }

</style>