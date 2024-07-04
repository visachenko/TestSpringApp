export default {
    name: 'worker-table-item',
    props: ['id', 'name'],
    methods: {
        showModal(id, action) {
            this.$emit('show-modal', id, action)
        },
        deleteWorker(id) {
            this.$emit('delete-worker', id)
        }
    },
    template: `
        <tr>
            <td>{{ id }}</td>
            <td>{{ name }}</td>
            <td>
                <button @click="showModal(id, 'FEED_ANIMAL')">Покормить животное</button>
                <button @click="showModal(id, 'CLEAN_PRISON')">Почистить клетку</button>
                <button @click="showModal(id, 'CLEAN_WALK_AREA')">Почистить вальер</button>
                <button @click="deleteWorker(id)">Удалить</button>
            </td>
        </tr>
    `
}