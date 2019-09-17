<template>
    <div>
        <md-dialog-confirm
                :md-active.sync="showDeleteDialog"
                md-title="Удаление команды"
                :md-content="'Вы уверены, что хотите удалить команду <strong class=\'negative\'>' + team.title + '</strong>?'"
                md-confirm-text='Да'
                md-cancel-text="Нет"
                @md-confirm="onConfirm" />
    </div>
</template>

<script>
    export default {
        props: {
            team : Object,
            showDeleteDialog: Boolean,
            onConfirm: Function
        }
    }
</script>

<style scoped>
    .negative {
        color: #ed5732;
    }
</style>