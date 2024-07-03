import IfButton from "../common/ifButton.js";

export default {
    name: 'animal-table-item',
    props: ['id', 'name', 'prisoned'],
    components: {
        IfButton
    },
    methods: {
        showModal(animalId, action) {
            this.$emit('show-modal', animalId, action);
        },
        deleteAnimal(id) {
            this.$emit('delete-animal', id)
        },
        sendToPrison(id) {
            this.$emit('send-to-prison', id)
        },
        sendToWalkingArea(id) {
            this.$emit('send-to-walking-area', id)
        }
    },
    template: `
        <tr>
            <td>{{ id }}</td>
            <td>{{ name }}</td>
            <td><button @click="showModal(id, 'FEED_ANIMAL')">Покормить</button></td>
            <td><if-button :disabled="prisoned" @click="sendToPrison(id)">В клетку</if-button></td>
            <td><if-button :disabled="!prisoned" @click="sendToWalkingArea(id)">В вальер</if-button></td>
            <td><button @click="deleteAnimal(id)">Удалить</button></td>
        </tr>
`
}