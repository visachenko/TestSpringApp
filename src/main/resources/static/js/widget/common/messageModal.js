export default {
    name: "modal-message",
    props: ['message', 'visible'],
    methods: {
        close() {
            this.$emit("close-message-modal")
        }
    },
    template: `
        <div class="modal-background" v-if="visible">
            <div class="modal-content">
                <h1>{{ message }}</h1>
                <button @click="close">Окей</button>
            </div>
        </div>
    `
}