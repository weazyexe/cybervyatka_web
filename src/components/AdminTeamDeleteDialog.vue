<template>
    <div>
        <md-dialog-confirm
                :md-active="showDeleteDialog"
                md-title="Удаление команды"
                :md-content="'Вы уверены, что хотите удалить команду <strong>' + team.title + '</strong>?'"
                md-confirm-text='Да'
                md-cancel-text="Нет"
                @md-cancel="onCancel"
                @md-confirm="onConfirm" />
    </div>
</template>

<script>
    export default {
        props: {
            team : Object,
            showDeleteDialog: Boolean,
            onConfirm: Function,
            onCancel: Function
        }
    }
</script>

<style scoped>

</style>