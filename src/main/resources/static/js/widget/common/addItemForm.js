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
        <div class="add-item-form">
            <input id="name" type="text" v-model="newWorkerName"/>
             <input type="submit" @click="save">
        </div>
    `
}
