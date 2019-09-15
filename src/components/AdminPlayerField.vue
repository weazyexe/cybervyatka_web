<template>
    <div>
        <b-row>
            <b-col md="6">
                <md-field class="field">
                    <label for="player-name">Имя</label>
                    <md-input name="player-name" id="player-name" v-model="player[0]" />
                    <span class="md-error" v-if="!validateTitle">Некорректный ввод</span>
                </md-field>
            </b-col>
            <b-col md="6">
                <md-field class="field">
                    <label for="player-nick">Никнейм</label>
                    <md-input name="player-nick" id="player-nick" v-model="player[1]"/>
                    <span class="md-error" v-if="!validateTitle">Некорректный ввод</span>
                </md-field>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <md-field class="field">
                    <label for="player-surname">Фамилия</label>
                    <md-input name="player-surname" id="player-surname" v-model="player[2]"/>
                    <span class="md-error" v-if="!validateTitle">Некорректный ввод</span>
                </md-field>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "AdminPlayerField",
        props: {
            player : Array
        }
    }
</script>

<style scoped>

</style>