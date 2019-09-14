<template>
    <div>
        <b-row class="menu-button">
            <i class="material-icons icon md-24" >
                {{ image }}
            </i>
            <p class="text">{{ buttonText }}</p>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "AdminMenuButton",
        props: {
            buttonText: String,
            image : String
        }
    }
</script>

<style scoped>
    .icon {
        color: #D68956;
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 1em;
    }

    .text {
        color: white;
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 1em;
    }

    .menu-button {
        margin: 1em;
        height: 3em;
    }

    .menu-button:hover {
        background-color: #212121;
        border-radius: 1em;
    }

    .material-icons.md-24 { font-size: 24px; }
</style>