<template>
    <div class="text-center">
        <div class="mx-auto pt-5">
            <img src="../assets/logo_clear.png" alt="not found" class="not-found">
            <p class="biggest-text text-center">404</p>
            <p class="bigger-text text-center mb-0 mt-5">Такой страницы не существует :( Вы наверно задаётесь вопросом - дальше что?</p>
            <p class="bigger-text text-center">Но вы не расстраивайтесь, переходите <strong class="strong-info-text" @click="toMain">на главную</strong></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NotFound",
        methods: {
            toMain() {
                this.$router.push('/');
            }
        },
        created() {
            document.title = this.$route.meta.title;
        }
    }
</script>

<style scoped>
    .biggest-text {
        color: #FFFFFF;
        margin-top: 1em;
        font-size: 4em;
        font-weight: bold;
        text-align: left;
    }

    .bigger-text {
        color: #FFFFFF;
        font-size: 1.5em;
        text-align: center;
    }

    .not-found {
        width: 15em;
    }

    .strong-info-text {
        color: #D68956;
        font-weight: bold;
    }

    .strong-info-text:hover {
        cursor: pointer;
        color: #ffa663;
    }
</style>