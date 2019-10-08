<template>
    <b-row class="game-content">
        <b-col md="8" class="vertical-center p-0">

            <b-row class="logos">
                <template v-if="game.team_first.logo === ''">
                    <img class="small-team-logo rounded-circle" src="../assets/logo_placeholder.png"
                         alt="team_logo" @click="onShow(game)"/>
                </template>
                <template v-else>
                    <img class="small-team-logo rounded-circle" :src="game.team_first.logo"
                         alt="team_logo" @click="onShow(game)"/>
                </template>

                <template v-if="game.team_second.logo === ''">
                    <img class="small-team-logo rounded-circle" src="../assets/logo_placeholder.png"
                         alt="team_logo" @click="onShow(game)"/>
                </template>
                <template v-else>
                    <img class="small-team-logo rounded-circle" :src="game.team_second.logo"
                         alt="team_logo" @click="onShow(game)"/>
                </template>
            </b-row>

            <b-col>
                <span @click="onShow(game)" class="team-text">{{ game.team_first.title }} VS {{ game.team_second.title }}</span>
                <b-row class="game-info">
                    <span @click="onShow(game)" class="game-text">Best of {{ game.best_of }}, </span>
                    <span @click="onShow(game)" class="game-text">{{ parsedDate }} • </span>
                    <span @click="onShow(game)" class="game-text" v-if="game.discipline === 'CSGO'">CS:GO</span>
                    <span @click="onShow(game)" class="game-text" v-else>Dota 2</span>
                    <span @click="onShow(game)" class="game-text"> • {{ game.uid }}</span>
                </b-row>
            </b-col>
        </b-col>
        <b-col @click="onComplete(game)" md="2" class="vertical-center text-center">
            <md-button v-if="!game.is_ended" class="md-accent">Закончить игру</md-button>
        </b-col>
        <b-col @click="onEdit(game)" md="1" class="vertical-center text-center">
            <i class="material-icons team-text">edit</i>
        </b-col>
        <b-col @click="onDelete(game)" md="1" class="vertical-center text-center">
            <i class="material-icons team-text">delete</i>
        </b-col>


    </b-row>
</template>

<script>
    export default {
        name: "AdminGameEntry",
        props: {
            game : Object,
            onEdit : Function,
            onDelete : Function,
            onShow : Function,
            onComplete : Function
        },
        data: function() {
            return {
                parsedDate : ""
            }
        },
        created() {
            let game = this.game;

            let day = game.datetime.toDate().getDate();
            if (day < 10) day = '0' + day;

            let month = game.datetime.toDate().getMonth() + 1;
            if (month < 10) month = '0' + month;

            let year = game.datetime.toDate().getFullYear();

            this.parsedDate = day + '.' + month + '.' + year;
        }
    }
</script>

<style scoped>
    .logos {
        margin-left: 1em;
    }

    .small-team-logo {
        width: 2em;
        height: 2em;
        margin-right: 1em;
    }

    .small-team-logo:hover {
        cursor: pointer;
    }

    .team-text {
        color: #FFFFFF;
        font-size: 1.5em;
    }

    .game-text {
        color: rgba(255, 255, 255, 0.1);
        padding-left: 0.4em;
        font-size: 1em;
    }

    .vertical-center {
        margin-top: auto;
        margin-bottom: auto;
    }

    .game-content {
        padding: 1em;
        margin-left: 0;
        margin-right: 0;
    }

    .game-content:hover {
        background-color: #303030;
        border-radius: 1em;
    }

    .game-info {
        margin-left: -0.4em;
    }

    .game-text:hover {
        cursor: pointer;
    }

    .team-text:hover {
        color: #a8a8a8;
        cursor: pointer;
    }
</style>