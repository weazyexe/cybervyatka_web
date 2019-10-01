<template>
    <b-col class="m-3 mb-5 mlr-auto">
        <img :src="require(`../assets/${photo}`)" alt="Лёша))" class="rounded-circle staff-avatar">
        <p class="name-text">{{ name }}</p>
        <p class="position-text">{{ position }}</p>
        <a v-if="instagram" :href="`https://instagram.com/${instagram}`" target="_blank">
            <img src="../assets/instagram.png" alt="inst" class="staff-link">
        </a>
        <a v-if="vk" :href="`https://vk.com/${vk}`" target="_blank">
            <img src="../assets/vk.png" alt="vk" class="staff-link">
        </a>
        <a v-if="telegram" :href="`https://t-do.ru/${telegram}`" target="_blank">
            <img src="../assets/telegram.png" alt="tg" class="staff-link">
        </a>
        <a v-if="twitter" :href="`https://twitter.com/${twitter}`" target="_blank">
            <img src="../assets/twitter.png" alt="twi" class="staff-link">
        </a>
    </b-col>
</template>

<script>
    export default {
        name: "StaffEntry",
        props: {
            name: String,
            position: String,
            instagram: String,
            vk: String,
            telegram: String,
            twitter: String,
            photo: String
        }
    }
</script>

<style scoped>
    .name-text {
        color: white;
        font-weight: bold;
        font-size: 1.2em;
        margin-bottom: 0;
        margin-top: 1em;
    }

    .position-text {
        color: #AAA;
    }

    .staff-avatar {
        width: 150px;
        min-width: 150px;
        max-width: 150px;
    }

    .staff-link {
        width: 1em;
        height: 1em;
        margin: 0.3em;
    }
</style>