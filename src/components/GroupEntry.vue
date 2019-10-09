<template>
    <div>
        <team-dialog :team="currentTeam" :on-confirm="onConfirmTeam" :show="showTeamDialog" :show-contacts="false"></team-dialog>

        <b-row class="mb-2 ml-4 mt-4">
            <p class="table-team-text">{{ group.discipline === 'CSGO' ? 'CS:GO' : 'Dota 2' }}: группа {{ group.title }}</p>
            <div v-if="!hideButtons" class="ml-auto buttons">
                <b-row class="mx-0">
                    <i class="material-icons rule-button" @click="onEdit(group)">edit</i>
                    <i class="material-icons rule-button" @click="onDelete(group)">delete</i>
                </b-row>
            </div>
        </b-row>
        <div class="group-rect">
            <b-col class="mx-0 p-0">
                <b-row class="dark-team-back mx-0">
                    <b-col md="8" cols="8" sm="8" class="mx-0">
                        <p class="table-header-text">Команды</p>
                    </b-col>
                    <b-col md="2" cols="2" sm="2" class="mx-0">
                        <p class="table-header-text text-center">W</p>
                    </b-col>
                    <b-col md="2" cols="2" sm="2" class="mx-0">
                        <p class="table-header-text text-center">L</p>
                    </b-col>
                </b-row>
                <template v-for="(team, index) in sortedTeams">
                    <b-row :key="index" class="mx-0" :class="(index % 2 === 0) ? 'light-team-back' : 'dark-team-back'">
                        <b-col md="8" cols="8" sm="8" class="mx-0">
                            <p class="table-team-text" @click="showTeam(team)" :class="team.title.length > 11 ? 'small-text' : ''">{{ team.title }}</p>
                        </b-col>
                        <b-col md="2" cols="2" sm="2" class="mx-0">
                            <p class="table-count-text pl-0 text-center">{{ team.wins }}</p>
                        </b-col>
                        <b-col md="2" cols="2" sm="2" class="mx-0">
                            <p class="table-count-text pl-0 text-center">{{ team.loses }}</p>
                        </b-col>
                    </b-row>
                </template>
            </b-col>
        </div>
    </div>
</template>

<script>
    import TeamDialog from "@/components/TeamDialog";
    export default {
        name: "GroupEntry",
        components: {TeamDialog},
        props: {
            group : Object,
            hideButtons : Boolean,
            onEdit: Function,
            onDelete: Function
        },
        data: function () {
            return {
                currentTeam: {},
                showTeamDialog: false
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
            sortedTeams: function () {
                let group = this.group;
                return group.teams.sort((a, b) => {
                    if (a.wins < b.wins && a.loses > b.loses) return 1;
                    else if (a.wins > b.wins && a.loses < b.loses) return -1;
                    else return 0;
                });
            }
        }
    }
</script>

<style scoped>
    .group-rect {
        max-width: 28em;
        min-width: 10em;
        border-radius: 1em;
        background: rgba(20, 20, 20, 0.6);
        overflow: hidden;
        box-shadow: 0 0.2em 1em rgba(0, 0, 0, 0.18);
        margin: 1em;
    }

    .light-team-back {
        padding: 1em;
        background: rgba(30, 30, 30, 0.7);
    }

    .dark-team-back {
        padding: 1em;
        background: rgba(30, 30, 30, 0.2);
    }


    .table-header-text {
        margin-bottom: 0;
        font-weight: bold;
        text-align: start;
        color: #D68956;
    }
    .table-team-text {
        margin-bottom: 0;
        text-align: start;
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

    @media only screen and (max-width: 400px) {
        .small-text {
            font-size: 0.7em;
            margin-top: 0.3em;
        }
    }

    @media only screen and (min-width: 400px) {
        .small-text {

        }
    }

</style>