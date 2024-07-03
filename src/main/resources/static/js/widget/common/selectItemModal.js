import ModalWindow from "./modalWindow.js";
import SelectItemTable from "./selectItemTable.js";

export default {
    name: 'select-item-modal',
    props: ['visible', 'items'],
    components: {
        ModalWindow,
        SelectItemTable
    },
    methods: {
        closeModal() {
            this.$emit('close-modal')
        },
        select(id) {
            this.$emit('select-item', id)
        }
    },
    template: `
        <modal-window v-if="visible" @close-modal="closeModal">
            <template v-slot:header>
                <slot name="header"></slot>
            </template>
            <template v-slot:body>
                <select-item-table :items="items" @select-item="select"></select-item-table>
            </template>
        </modal-window>
    `
}