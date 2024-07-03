export default {
    name: "if-button",
    props: ['disabled'],
    methods: {
        click() {
            this.$emit("click")
        }
    },
    template: `
        <button disabled v-if="disabled">
            <slot></slot>
        </button>
        <button v-else @click="click">
            <slot></slot>
        </button>
    `
}