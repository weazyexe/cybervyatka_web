<template>
    <div class="container-fluid all">

        <admin-delete-dialog :deletee="currentGroup.title" :show-delete-dialog="showDeleteDialog" :on-confirm="onConfirmDelete" :on-cancel="onCancelDelete" type="group"></admin-delete-dialog>


        <router-link to="/admin/groups/add">
            <md-button class="md-fab md-primary add-fab">
                <i class="material-icons icon-fab">add</i>
            </md-button>
        </router-link>

        <admin-menu :is-groups-active="true"></admin-menu>
        <div class="right-side">
            <div class="content">
                <b-container>
                    <b-row>
                        <template v-for="(group, index) in groups">
                            <b-row class="mx-0" :key="index">
                                <group-entry :group="group" :hide-buttons="false" :on-edit="editGroup" :on-delete="deleteGroup"></group-entry>
                            </b-row>
                        </template>
                    </b-row>
                </b-container>
            </div>
        </div>
    </div>
</template>

<script>

    import firebase from 'firebase';
    import AdminMenu from "@/components/AdminMenu";
    import GroupEntry from "@/components/GroupEntry";
    import AdminDeleteDialog from "@/components/AdminDeleteDialog";

    export default {
        name: "AdminGroups",
        components: {
            GroupEntry,
            AdminMenu,
            AdminDeleteDialog
        },
        data: function () {
            return {
                groups : [],
                currentGroup: {},
                showDeleteDialog : false
            }
        },
        created() {
            document.title = this.$route.meta.title;
            let db = firebase.firestore();

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

                    this.groups.push(group);
                });
            });
        },
        methods: {
            editGroup(group) {
                this.currentGroup = group;
                this.$router.push({ path: '/admin/groups/edit', query: { uid: group.uid } });
            },
            deleteGroup(group) {
                this.showDeleteDialog = true;
                this.currentGroup = group;
            },
            onConfirmDelete() {
                let db = firebase.firestore();
                this.showDeleteDialog = false;
                this.groups = this.groups.filter((it) => it.uid !== this.currentGroup.uid);

                db.doc(`groups/${this.currentGroup.uid}`).delete();
            },
            onCancelDelete() {
                this.showDeleteDialog = false;
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

    .add-fab {
        position: fixed;
        bottom: 3em;
        right: 3em;
        background-color: #D68956;
        color: #FFFFFF;
    }

    .icon-fab {
        color: #FFFFFF;
        margin-top: 0.2em;
    }
</style>