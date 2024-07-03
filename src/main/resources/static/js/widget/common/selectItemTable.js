import IfButton from './ifButton.js'


const SelectItemTableRow = Vue.component('select-item-table-row', {
    props: ['id', 'name', 'selectable'],
    components: {
        IfButton
    },
    methods: {
        select(id) {
            this.$emit("select-item", id)
        }
    },
    template: '<tr>' +
        '<td>{{ id }}</td>' +
        '<td>{{ name }}</td>' +
        '<td><if-button :disabled="!selectable" @click="select(id)">Выбрать</if-button></td>' +
        '</tr>'
});

export default {
    name: "select-item-table",
    props: ['items'],
    components: {
        SelectItemTableRow
    },
    methods: {
        select(id) {
            this.$emit("select-item", id)
        }
    },
    template: `
        <table>
            <tr>
                <th>ID</th>
                <th>NAME</th>
            </tr>
            <select-item-table-row 
                v-for="item in items" 
                :id="item.id" :name="item.name" 
                :key="item.id" 
                :selectable="item.selectable" 
                @select-item="select"
            ></select-item-table-row>
        </table>
    `
}