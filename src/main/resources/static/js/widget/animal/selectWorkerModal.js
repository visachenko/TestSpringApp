import SelectItemModal from "../common/selectItemModal.js";

const workersApi = Vue.resource('/api/workersList')

export default {
        name: 'select-worker-modal',
        props: ['visible'],
        data: function() {
            return {
                items: []
            }
        },
        components: {
            SelectItemModal
        },
        created: function () {
            workersApi.get().then(response => {
                response.json().then(data => {
                    this.items = data.map(item => ({
                        ...item,
                        selectable: true
                    }));
                })
            })
        },
        methods: {
            closeModal() {
                this.$emit('close-modal')
            },
            select(workerId) {
                this.$emit('select-worker', workerId)
            }
        },
        template: `
        <div>
            <select-item-modal :visible="visible" :items="items" @close-modal="closeModal" @select-item="select">
                <template v-slot:header>
                    <h1>Выберите работника</h1> 
                </template>
           </select-item-modal>
        </div>
    `
}