<template>
    <div>
        <md-dialog-confirm
                :md-active="showDeleteDialog"
                md-title="Удаление"
                :md-content="message"
                md-confirm-text='Да'
                md-cancel-text="Нет"
                @md-cancel="onCancel"
                @md-confirm="onConfirm"
        />
    </div>
</template>

<script>
    export default {
        props: {
            deletee : String,
            showDeleteDialog: Boolean,
            onConfirm: Function,
            onCancel: Function,
            type : String
        },
        computed: {
            message : function () {
                let type = (this.type === 'team') ? 'команду' : ((this.type === 'game') ? 'игру' : ((this.type === 'group') ? 'группу' : ')))'));
                return `Вы уверены, что хотите удалить ${type} <strong>${this.deletee}</strong>?`;
            }
        }
    }
</script>

<style scoped>

</style>