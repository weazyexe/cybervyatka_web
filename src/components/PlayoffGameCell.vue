<template>
    <div>
        <team-dialog :team="currentTeam" :on-confirm="onConfirmTeam" :show="showTeamDialog" :show-contacts="false"></team-dialog>

        <b-row class="mb-2 ml-2">
            <p v-if="isFinal && game" class="table-header-text">Финал: BO{{ game.best_of }}</p>
            <p v-else-if="isFinal" class="table-header-text">Финал</p>
            <p v-else-if="game" class="table-header-text">BO{{ game.best_of }}</p>
            <div class="ml-auto buttons">
                <b-row class="mx-0">
                    <template v-if="game">
                        <i class="material-icons rule-button" @click="onShow(game)">info</i>
                        <template v-if="!hideButtons">
                            <i class="material-icons rule-button" v-if="onAdd" @click="onAdd(playoff, gameId)">add</i>
                            <i class="material-icons rule-button" @click="onEdit(game)">edit</i>
                            <i class="material-icons rule-button" @click="onPush(game, playoff)">done</i>
                        </template>
                    </template>
                </b-row>
            </div>
        </b-row>
        <div :class="isFinal ? 'big-rect' : 'group-rect'">
            <b-col class="mx-0 p-0">
                <b-row class="dark-team-back mx-0">
                    <template v-if="game">
                        <b-col md="2" sm="2" cols="2" class="mx-0 mt-auto mb-auto px-0">
                            <img :src="game.team_first.logo" alt="first team logo" class="logo rounded-circle" :class="isFinal ? 'big-logo' : ''"/>
                        </b-col>
                        <b-col md="8" sm="8" cols="8" class="mx-0 mt-auto mb-auto">
                            <p class="table-team-text" :class="isFinal ? 'big-text' : ''">{{ game.team_first.title }}</p>
                        </b-col>
                        <b-col md="2" sm="2" cols="2" class="mx-0 mt-auto mb-auto">
                            <p class="table-count-text" :class="isFinal ? 'big-text' : ''">{{ firstTeamCount }}</p>
                        </b-col>
                    </template>
                    <template v-else>
                        <b-col md="2" sm="2" cols="2" class="mx-0 mt-auto mb-auto px-0">
                            <img src="../assets/logo_placeholder.png" alt="first team logo" class="logo rounded-circle" :class="isFinal ? 'big-logo' : ''"/>
                        </b-col>
                        <b-col md="8" sm="8" cols="8" class="mx-0 mt-auto mb-auto">
                            <p class="table-team-text" :class="isFinal ? 'big-text' : ''">TBA</p>
                        </b-col>
                        <b-col md="2" sm="2" cols="2" class="mx-0 mt-auto mb-auto">
                            <p class="table-count-text" :class="isFinal ? 'big-text' : ''">0</p>
                        </b-col>
                    </template>
                </b-row>
                <b-row class="light-team-back mx-0">
                    <template v-if="game">
                        <b-col md="2" sm="2" cols="2" class="mx-0 mt-auto mb-auto px-0">
                            <img :src="game.team_second.logo" alt="second team logo" class="logo rounded-circle" :class="isFinal ? 'big-logo' : ''"/>
                        </b-col>
                        <b-col md="8" sm="8" cols="8" class="mx-0 mt-auto mb-auto">
                            <p class="table-team-text" :class="isFinal ? 'big-text' : ''">{{ game.team_second.title }}</p>
                        </b-col>
                        <b-col md="2" sm="2" cols="2" class="mx-0 mt-auto mb-auto">
                            <p class="table-count-text" :class="isFinal ? 'big-text' : ''">{{ secondTeamCount }}</p>
                        </b-col>
                    </template>
                    <template v-else>
                        <b-col md="2" sm="2" cols="2" class="mx-0 mt-auto mb-auto px-0">
                            <img src="../assets/logo_placeholder.png" alt="second team logo" class="logo rounded-circle" :class="isFinal ? 'big-logo' : ''"/>
                        </b-col>
                        <b-col md="8" sm="8" cols="8" class="mx-0 mt-auto mb-auto">
                            <p class="table-team-text" :class="isFinal ? 'big-text' : ''">TBA</p>
                        </b-col>
                        <b-col md="2" sm="2" cols="2" class="mx-0 mt-auto mb-auto">
                            <p class="table-count-text" :class="isFinal ? 'big-text' : ''">0</p>
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
            isFinal : Boolean,
            onPush : Function,
            onShow: Function,
            onEdit: Function,
            playoff: Object,
            onAdd: Function,
            gameId: Number
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
                                count = parseInt(res[1]);
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
                                count = parseInt(res[2]);
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

    .logo {
        width: 2em;
    }

    .big-text {
        font-size: 1.5em;
    }

    .big-logo {
        width: 3em;
    }

    .big-rect {
        width: 23em;
        border-radius: 1em;
        background: rgba(20, 20, 20, 0.6);
        overflow: hidden;
        box-shadow: 0 0.2em 1em rgba(0, 0, 0, 0.18);
        margin-bottom: 1em;
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
        text-align: start;
    }

    .table-team-text:hover {
        color: #CACACA;
        cursor: pointer;
        text-align: start;
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
        margin-right: 1em;
    }
</style>