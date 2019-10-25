<template>
    <div class="post-content">
        <div class="background">
            <b-container>
                <div class="ml-auto mr-auto">
                    <b-row class="ml-auto mr-auto py-5">
                        <img v-if="discipline === 'CSGO'" src="../assets/csgo-white.png" alt="csgo logo" class="logo ml-auto ml-auto mr-5">
                        <img v-else src="../assets/dota2-white.png" alt="dota 2 logo" class="logo ml-auto ml-auto mr-5">
                        <img src="../assets/logo_clear.png" alt="cv logo" class="logo mr-auto ml-1">
                    </b-row>
                    <b-row>
                        <template v-for="(group, index) in groups">
                            <b-row class="ml-auto mr-auto" :key="index">
                                <group-entry :group="group" :hide-buttons="true"></group-entry>
                            </b-row>
                        </template>
                    </b-row>
                    <b-row class="ml-auto mr-auto py-5">
                        <div class="ml-auto mr-auto">
                            <a href="https://vk.com/krdparen_kirov" target="_blank"><img src="../assets/kp.png" alt="krdprn" class="ml-auto mr-3 logo"></a>
                            <img src="../assets/vyatsu.png" alt="vyatsu" class="mx-3 logo">
                            <a href="https://vk.com/pizzaforfriends" target="_blank"><img src="../assets/hleb-and-pizza.png" alt="hleb and pizza" class="mx-3 logo"></a>
                            <img src="../assets/profkom.png" alt="profkom" class="mx-3 logo">
                            <a href="https://vk.com/coffeelike43" target="_blank"><img src="../assets/coffeelike.png" alt="coffee like" class="mx-3 logo"></a>
                            <img src="../assets/adrenalin43.png" alt="adrenalin43" class="ml-2 mr-auto logo">
                        </div>
                    </b-row>
                </div>
            </b-container>
        </div>
    </div>
</template>

<script>

    import firebase from 'firebase';
    import GroupEntry from "@/components/GroupEntry";

    export default {
        name: "AdminGroupsForPost",
        components: {
            GroupEntry
        },
        data: function () {
            return {
                groups : [],
                discipline : "CSGO"
            }
        },
        created() {
            document.title = this.$route.meta.title;
            let db = firebase.firestore();

            let query = this.$route.query;
            this.discipline = query.discipline;

            db.collection("groups").get().then((response) => {
                response.forEach((rawGroup) => {
                    let group = rawGroup.data();

                    let teams = [];
                    let oldTeams = group.teams;
                    oldTeams.forEach((teamRef) => {
                        teamRef.get().then((team) => {
                            teams.push(team.data());
                            group.teams = teams;
                        });
                    });

                    if (group.discipline === this.discipline) {
                        this.groups.push(group);
                    }
                });
            });
        }
    }
</script>

<style scoped>

    .post-content {
        overflow: hidden;
    }

    .background {
        background: url("../assets/groups-background.jpg") no-repeat;
        width: 100%;
        height: 100%;
    }

    .logo {
        height: 3em;
    }
</style>