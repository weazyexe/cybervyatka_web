<template>
    <b-container fluid class="text-center">
        <form novalidate @submit.prevent="logIn">
            <b-col class="form">
                <img class="admin-menu-logo" src="../assets/logo_clear.png" alt="Logo">
                <md-field>
                    <label for="login">Логин</label>
                    <md-input name="login" id="login" v-model="login" md-dense :disabled="sending"/>
                </md-field>
                <md-field>
                    <label for="password">Пароль</label>
                    <md-input type="password" name="password" id="password" v-model="password" md-dense :disabled="sending"/>
                </md-field>

                <md-button id="login-button" class="md-raised" type="submit">Войти</md-button>
                <p id="main-button" @click="onMain">На главную</p>
            </b-col>
        </form>
    </b-container>
</template>

<script>
    import firebase from 'firebase/app';

    export default {
        name: "AdminAuth",
        data: function() {
            return {
                login: "",
                password: ""
            }
        },
        methods: {
            logIn: function () {
                firebase.auth().signInWithEmailAndPassword(this.login, this.password).then(
                    () => {
                        this.$router.replace('/admin/teams');
                    },
                    (err) => {
                        alert(err.message);
                    }
                );

            },
            onMain() {
                this.$router.push('/');
            }
        },
        created() {
            document.title = this.$route.meta.title;
            this.$metrika.hit(this.$route.path);
        }
    }
</script>

<style scoped>
    .form {
        width: 40vh;
        margin-left: auto;
        margin-right: auto;
        padding-top: 20vh;
    }

    .admin-menu-logo {
        width: 6em;
        height: 6em;
        margin: 2em auto 3em;
    }

    #login-button {
        background-color: #D68956;
        color: #FFFFFF;
        margin-left: 30%;
        margin-right: 30%;
        margin-top: 2em;
    }

    #main-button {
        margin-top: 1em;
        color: #FFF;
        font-size: 0.7em;
    }

    #main-button:hover {
        color: #CACACA;
        cursor: pointer;
    }

    .md-field {
        margin-bottom: 0;
    }
</style>