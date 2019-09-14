<template>
    <div>
        <b-row>
            <b-col class="form" md="2">
                <b-row>
                    <img class="admin-menu-logo" src="../assets/logo_clear.png" alt="Logo">
                </b-row>
                <b-form-input class="field" id="login-input" v-model="login" placeholder="Логин"></b-form-input>
                <b-form-input class="field" id="password-input" v-model="password" placeholder="Пароль"></b-form-input>
                <b-row>
                    <b-button class="btn" @click="logIn">Войти</b-button>
                </b-row>
            </b-col>
        </b-row>
    </div>
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

            }
        }
    }
</script>

<style scoped>
    .form {
        margin: auto;
    }

    .admin-menu-logo {
        width: 6em;
        height: 6em;
        margin: 2em auto 3em;
    }

    .btn {
        margin: 1em auto 3em;
        background-color: #D68956;
        border-color: transparent;
    }

    .field {
        margin-bottom: 0.5em;
        background-color: #303030;
        border-color: transparent;
        border-radius: 1em;
    }

    .field:active {
        background-color: #303030;
    }

    .field:hover, .field:active, .field.focus {
        background-color: #303030;
        outline: none !important;
        box-shadow: none;
    }
</style>