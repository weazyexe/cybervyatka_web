<template>
    <div class="container-fluid all">

        <team-modal-window :team="currentTeam" :show-team-dialog="showTeamDialog" :show-contacts="true" :on-confirm="onShowConfirm"></team-modal-window>
        <admin-team-delete-dialog :team="currentTeam" :show-delete-dialog="showDeleteDialog" :on-confirm="onDeleteConfirm" :on-cancel="onDeleteCancel"></admin-team-delete-dialog>

        <router-link to="/admin/teams/add">
            <md-button class="md-fab md-primary add-fab">
                <md-icon>add</md-icon>
            </md-button>
        </router-link>

        <admin-menu :is-teams-active="true"></admin-menu>
        <div class="right-side">
            <div class="content">
                <template v-if="teams.length === 0">
                    <b-container class="text-center">
                        <md-progress-spinner class="main-color" md-mode="indeterminate"></md-progress-spinner>
                    </b-container>

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
    import firebase from 'firebase/app';
    import TeamModalWindow from "@/components/TeamModalWindow";
    import AdminTeamEntry from "@/components/AdminTeamEntry";
    import AdminTeamDeleteDialog from "@/components/AdminTeamDeleteDialog";
    import AdminMenu from "@/components/AdminMenu";

    export default {
        name: "AdminTeams",
        components: {
            AdminMenu,
            AdminTeamDeleteDialog,
            AdminTeamEntry,
            TeamModalWindow
        },
        created() {
            let db = firebase.firestore();

            db.collection("teams").get().then((response) => {

                response.forEach((doc) => {
                    let team = doc.data();

                    if (team.logo == null) {
                        team.logo = "";
                    }

                    if (team.status === 'REQUESTED') {
                        this.requestedTeams.push(team);
                    } else if (team.status === 'CONFIRMED') {
                        this.confirmedTeams.push(team);
                    } else {
                        this.cancelledTeams.push(team);
                    }

                    this.teams.push(team);
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
                this.showDeleteDialog = false;
            },
            editTeam(team) {
                this.currentTeam = team;
                this.$router.push({ path: '/admin/teams/edit',  query : { uid: team.uid } });
            },
            deleteTeam(team) {
                this.currentTeam = team;
                this.showDeleteDialog = true;
                this.showTeamDialog = false;
            },
            confirmTeam(team) {
                let db = firebase.firestore();
                team.status = 'CONFIRMED';
                db.doc('teams/' + team.uid).update(team);

                this.requestedTeams = this.requestedTeams.filter((it) => it !== team);
                this.confirmedTeams.push(team);
            },
            cancelTeam(team) {
                let db = firebase.firestore();
                team.status = 'CANCELLED';
                db.doc('teams/' + team.uid).update(team);

                this.requestedTeams = this.requestedTeams.filter((it) => it !== team);
                this.cancelledTeams.push(team);
            },
            onDeleteConfirm() {
                this.showDeleteDialog = false;
                let db = firebase.firestore();

                db.doc("teams/" + this.currentTeam.uid).delete();

                this.teams = this.teams.filter((it) => it !== this.currentTeam);
                this.requestedTeams = this.requestedTeams.filter((it) => it !== this.currentTeam);
                this.cancelledTeams = this.cancelledTeams.filter((it) => it !== this.currentTeam);
                this.confirmedTeams = this.confirmedTeams.filter((it) => it !== this.currentTeam);
            },
            onDeleteCancel() {
                this.showDeleteDialog = false;
            },
            onShowConfirm() {
                this.showTeamDialog = false;
            }
        }
    }
</script>

<style scoped>
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