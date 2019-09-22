<template>
    <div>
        <team-dialog :team="currentTeam" :on-confirm="onConfirmTeam" :show="showTeamDialog" :show-contacts="false"></team-dialog>

        <b-row class="mb-2 ml-2">
            <div v-if="!hideButtons" class="ml-auto buttons">
                <!--<b-row class="mx-0">
                    <i class="material-icons rule-button" @click="onEdit(group)">edit</i>
                    <i class="material-icons rule-button" @click="onDelete(group)">delete</i>
                </b-row>-->

            </div>
        </b-row>
        <div v-if="isFinal">
            <b-row class="mx-0 ml-2 mb-2">
                <p class="table-header-text">Финал</p>
            </b-row>
        </div>
        <div class="group-rect">
            <b-col class="mx-0 p-0">
                <b-row class="dark-team-back mx-0">
                    <template v-if="game">
                        <img :src="game.team_first.logo" alt="first team logo" class="logo rounded-circle" />
                        <b-col md="8" class="mx-0 mt-auto mb-auto">
                            <p class="table-team-text">{{ game.team_first.title }}</p>
                        </b-col>
                        <b-col md="2" class="mx-0 mt-auto mb-auto">
                            <p class="table-count-text">{{ firstTeamCount }}</p>
                        </b-col>
                    </template>
                    <template v-else>
                        <img src="../assets/logo_placeholder.png" alt="first team logo" class="logo rounded-circle" />
                        <b-col md="8" class="mx-0 mt-auto mb-auto">
                            <p class="table-team-text">TBA</p>
                        </b-col>
                        <b-col md="2" class="mx-0 mt-auto mb-auto">
                            <p class="table-count-text">0</p>
                        </b-col>
                    </template>
                </b-row>
                <b-row class="light-team-back mx-0">
                    <template v-if="game">
                        <img :src="game.team_second.logo" alt="second team logo" class="logo rounded-circle" />
                        <b-col md="8" class="mx-0 mt-auto mb-auto">
                            <p class="table-team-text">{{ game.team_second.title }}</p>
                        </b-col>
                        <b-col md="2" class="mx-0 mt-auto mb-auto">
                            <p class="table-count-text">{{ secondTeamCount }}</p>
                        </b-col>
                    </template>
                    <template v-else>
                        <img src="../assets/logo_placeholder.png" alt="second team logo" class="logo rounded-circle" />
                        <b-col md="8" class="mx-0 mt-auto mb-auto">
                            <p class="table-team-text">TBA</p>
                        </b-col>
                        <b-col md="2" class="mx-0 mt-auto mb-auto">
                            <p class="table-count-text">0</p>
                        </b-col>
                    </template>
                </b-row>
            </b-col>
        </div>
    </div>
</template>

<script>

    import TeamDialog from "@/components/TeamDialog";

    export default {
        name: "PlayoffGameCell",
        components: {
            TeamDialog
        },
        props: {
            game : Object,
            hideButtons: Boolean,
            isFinal : Boolean
        },
        data: function () {
            return {
                currentTeam: {},
                showTeamDialog: false,

            }
        },
        methods: {
            showTeam(team) {
                this.currentTeam = team;
                this.showTeamDialog = true;
            },
            onConfirmTeam() {
                this.showTeamDialog = false;
            }
        },
        computed: {

            firstTeamCount: function () {
                let count = 0;
                if (this.game.results) {
                    this.game.results.forEach((it) => {
                        let res = it.split(":");
                        if (this.game.discipline === 'CSGO') {
                            if (this.game.results.length === 1) {
                                if (parseInt(res[1]) >= parseInt(res[2])) count = parseInt(res[1]);
                                else count = parseInt(res[2])
                            } else if (parseInt(res[1]) > parseInt(res[2])) {
                                count++;
                            }
                        } else {
                            if (parseInt(res[0]) > parseInt(res[1])) count++;
                        }
                    });
                }

                return count;
            },
            secondTeamCount: function () {
                let count = 0;
                if (this.game.results) {
                    this.game.results.forEach((it) => {
                        let res = it.split(":");
                        if (this.game.discipline === 'CSGO') {
                            if (this.game.results.length === 1) {
                                if (parseInt(res[1]) <= parseInt(res[2])) count = parseInt(res[1]);
                                else count = parseInt(res[2])
                            } else if (parseInt(res[1]) < parseInt(res[2])) {
                                count++;
                            }
                        } else {
                            if (parseInt(res[0]) < parseInt(res[1])) count++;
                        }
                    });
                }

                return count;
            }
        }
    }
</script>

<style scoped>

    @media (max-width: 1366px) {
        .group-rect {
            width: 14em;
            border-radius: 1em;
            background: rgba(20, 20, 20, 0.6);
            overflow: hidden;
            box-shadow: 0 0.2em 1em rgba(0, 0, 0, 0.18);
            margin-bottom: 2em;
        }
    }

    @media (max-width: 720px) {
        .group-rect {
            width: 10em;
            border-radius: 1em;
            background: rgba(20, 20, 20, 0.6);
            overflow: hidden;
            box-shadow: 0 0.2em 1em rgba(0, 0, 0, 0.18);
            margin-bottom: 2em;
        }
    }

    .logo {
        width: 2em;
    }

    .group-rect {
        width: 18em;
        border-radius: 1em;
        background: rgba(20, 20, 20, 0.6);
        overflow: hidden;
        box-shadow: 0 0.2em 1em rgba(0, 0, 0, 0.18);
        margin-bottom: 2em;
    }

    .light-team-back {
        padding: 1em;
        background: rgba(30, 30, 30, 0.7);
    }

    .dark-team-back {
        padding: 1em;
        background: rgba(30, 30, 30, 0.2);
    }

    .table-team-text {
        margin-bottom: 0;
        color: #FFFFFF;
    }

    .table-team-text:hover {
        color: #CACACA;
        cursor: pointer;
    }

    .table-count-text {
        margin-bottom: 0;
        color: #FFFFFF;
        font-weight: bold;
    }

    .table-header-text {
        margin-bottom: 0;
        font-weight: bold;
        color: #D68956;
    }

    .rule-button {
        color: #FFFFFF;
        margin-left: 1em;
    }

    .rule-button:hover {
        color: #CACACA;
        cursor: pointer;
    }

    .buttons {
        margin-right: 7em;
    }
</style>