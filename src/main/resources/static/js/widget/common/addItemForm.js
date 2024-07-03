export default {
    name: 'add-item-form',
    data: function() {
        return {
            newWorkerName: ''
        }
    },
    methods: {
        showModal() {
            this.$emit("show-modal")
        },
        save() {
            this.$emit("save-item", this.newWorkerName)
            this.newWorkerName = ''
        }
    },
    template: `
        <tr>
            <td>
                <input id="name" type="text" v-model="newWorkerName"/>
            </td>
            <td>
                <input type="submit" @click="save">
            </td>
        </tr>
    `
}
