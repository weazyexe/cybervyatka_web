<template>
    <div class="container-fluid all">
        <admin-menu :is-settings-active="true"></admin-menu>
        <div class="right-side">
            <div class="content">
                <b-container>
                    <div>
                        <h2 class="text">Настройки</h2>
                        <p class="text mb-5">Основные настройки отображения для пользователей</p>
                        <md-switch v-if="userRole === 'ADMIN'" class="switch" v-model="registration">Открыть регистрацию</md-switch>
                        <md-switch v-if="userRole === 'ADMIN'" class="switch" v-model="playoff">Открыть плей-офф</md-switch>
                        <md-switch v-if="userRole === 'ADMIN'" class="switch" v-model="groups">Открыть группы</md-switch>
                    </div>
                </b-container>
            </div>
        </div>
    </div>
</template>

<script>
    import AdminMenu from "@/components/AdminMenu";
    import firebase from 'firebase';

    export default {
        name: "AdminSettings",
        components: {
            AdminMenu
        },
        data: function () {
            return {
                registration: false,
                playoff: false,
                groups: false,

                user: firebase.auth().currentUser,
                userRole: "VIEWER"
            }
        },
        created() {
            document.title = this.$route.meta.title;
            let db = firebase.firestore();

            db.doc(`users/${this.user.uid}`).get().then((response) => {
                let raw = response.data();
                this.userRole = raw.role;

                if (this.userRole === 'ADMIN') {
                    db.doc('tournament/settings').get().then(response => {
                        let data = response.data();

                        this.registration = data.isRegistrationOpen;
                        this.playoff = data.isPlayoffOpen;
                        this.groups = data.isGroupsOpen;
                    });
                } else {
                    this.$router.replace('/404');
                }
            });
        },
        watch: {
            registration: function (val) {
                let db = firebase.firestore();
                let doc = { isRegistrationOpen: val, isPlayoffOpen: this.playoff, isGroupsOpen: this.groups };

                db.doc('tournament/settings').update(doc);
            },

            playoff: function (val) {
                let db = firebase.firestore();
                let doc = { isRegistrationOpen: this.registration, isPlayoffOpen: val, isGroupsOpen: this.groups };

                db.doc('tournament/settings').update(doc);
            },

            groups: function (val) {
                let db = firebase.firestore();
                let doc = { isRegistrationOpen:  this.registration, isPlayoffOpen: this.playoff, isGroupsOpen: val };

                db.doc('tournament/settings').update(doc);
            }
        }
    }
</script>

<style scoped>
    .switch {
        color: white;
        width: 100%;
    }

    .text {
        color: white;
    }
</style>