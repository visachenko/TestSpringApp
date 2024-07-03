export default {
    name: "modal-window",
    methods: {
        close() {
            this.$emit("close-modal")
        }
    },
    template: `
        <div class="modal-background">
            <div class="modal-content">
                <button @click="close" class="close-btn">Закрыть</button>
                <slot name="header"></slot>
                <slot name="body"></slot>
            </div>
        </div>
    `
}