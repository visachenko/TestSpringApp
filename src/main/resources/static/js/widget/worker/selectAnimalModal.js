import SelectItemModal from "../common/selectItemModal.js";

const animalsApi = Vue.resource('/api/animalsList')

export default {
    name: 'select-animal-modal',
    props: ['visible', 'action'],
    data: function() {
        return {
            items: []
        }
    },
    watch: {
        action(newValue, _) {
            if (newValue) {
                if (newValue === 'FEED_ANIMAL') {
                    this.items = this.items.map(item => ({
                        ...item,
                        selectable: true
                    }));
                } else {
                    const isCleanPrison = this.action === 'CLEAN_PRISON'
                    this.items = this.items.map(item => ({
                        ...item,
                        selectable: item.prisoned !== isCleanPrison
                    }));
                }
            }
        }
    },
    components: {
        SelectItemModal
    },
    created: function () {
        animalsApi.get().then(response => {
            response.json().then(data => {
                this.items = data
            })
        })
    },
    methods: {
        closeModal() {
            this.$emit('close-modal')
        },
        select(animalId) {
            this.$emit('select-animal', animalId)
        }
    },
    template: `
    <div>
        <select-item-modal :visible="visible" :items="items" @close-modal="closeModal" @select-item="select">
            <template v-slot:header>
                <h1>Выберите животное</h1> 
            </template>
        </select-item-modal>
    </div>
    `
}