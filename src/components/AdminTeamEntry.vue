<template>
    <b-row>
        <template v-if="team.logo === ''">
            <b-col md="1" class="vertical-center text-center">
                <img class="team-logo rounded-circle" src="../assets/logo_placeholder.png"
                     alt="team_logo" @click="onShow(team)"/>
            </b-col>
        </template>
        <template v-else>
            <b-col md="1" class="vertical-center text-center">
                <img class="team-logo rounded-circle" :src="team.logo"
                     alt="team_logo" @click="onShow(team)"/>
            </b-col>
        </template>
        <b-col md="7" class="vertical-center">

            <span @click="onShow(team)" class="team-text">{{ team.title }}</span>
            <span @click="onShow(team)" class="game-text" v-if="team.discipline === 'CSGO'">• CS:GO</span>
            <span @click="onShow(team)" class="game-text" v-else>• Dota 2</span>
            <template v-if="team.isInvited">
                <span class="live-icon ml-3 mr-auto">INVITED</span>
            </template>

        </b-col>
        <template v-if="isRequested">
            <b-col @click="onConfirm(team)" md="1" class="vertical-center text-center">
                <i class="material-icons done-button">done</i>
            </b-col>
            <b-col @click="onCancel(team)" md="1" class="vertical-center text-center">
                <i class="material-icons cancel-button">close</i>
            </b-col>
            <b-col @click="onEdit(team)" md="1" class="vertical-center text-center">
                <i class="material-icons team-text">edit</i>
            </b-col>
            <b-col @click="onDelete(team)" md="1" class="vertical-center text-center">
                <i class="material-icons team-text">delete</i>
            </b-col>
        </template>
        <template v-else>
            <b-col @click="onEdit(team)" md="2" class="vertical-center text-center">
                <i class="material-icons team-text">edit</i>
            </b-col>
            <b-col @click="onDelete(team)" md="2" class="vertical-center text-center">
                <i class="material-icons team-text">delete</i>
            </b-col>
        </template>


    </b-row>
</template>

<script>
    export default {
        name: "AdminTeamEntry",
        props: {
            team : Object,
            onEdit : Function,
            onDelete : Function,
            onConfirm : Function,
            onCancel : Function,
            onShow : Function,
            isRequested : Boolean
        }
    }
</script>

<style scoped>
    .live-icon {
        color: #FFFFFF;
        background-color: #5e91ff;
        border-radius: 0.7em;
        padding: 0.5em 0.8em;
        font-size: 0.5em;
        height: 2.3em;
    }

    .team-logo {
         width: 4em;
         height: 4em;
     }

    .team-logo:hover {
        cursor: pointer;
    }

    .team-text {
        color: #FFFFFF;
        font-size: 1.5em;
    }

    .team-text:hover {
        color: #a8a8a8;
        cursor: pointer;
    }

    .vertical-center {
        margin-top: auto;
        margin-bottom: auto;
    }

    .game-text {
        color: rgba(255, 255, 255, 0.1);
        padding-left: 0.4em;
        font-size: 1.5em;
    }

    .game-text:hover {
        cursor: pointer;
    }

    .done-button {
        color: #7cbc62;
        font-weight: 700;
    }

    .done-button:hover {
        color: #588f48;
        cursor: pointer;
    }

    .cancel-button {
        color: #bd3221;
        font-weight: 700;
    }

    .cancel-button:hover {
        color: #722011;
        cursor: pointer;
    }
</style>