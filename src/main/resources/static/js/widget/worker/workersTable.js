import AddItemForm from "../common/addItemForm.js";
import WorkerTableItem from "./workerTableItem.js";

const workersApi = Vue.resource('/workersList')
const concreteWorkersApi = Vue.resource('/workersList/{id}')

export default {
    name: 'workers-table',
    data: function() {
        return {
            workers: []
        }
    },
    components: {
        AddItemForm,
        WorkerTableItem
    },
    methods: {
        showModal(id, action) {
            this.$emit("show-modal", id, action)
        },
        saveWorker(workerName) {
            workersApi.save({}, { name: workerName }).then(result => {
                result.json().then(newWorker => {
                    this.workers.push(newWorker)
                    this.newWorkerName = ''
                })
            })
        },
        deleteWorker(workerId) {
            concreteWorkersApi.delete({id: workerId}).then(result => {
                const index = this.workers.findIndex((element) => element.id === workerId);
                if (index !== -1) {
                    this.workers.splice(index, 1);
                }
            })
        }
    },
    created: function () {
        workersApi.get().then(response => {
            response.json().then(data => {
                this.workers = data
            })
        })
    },
    template: `
        <div class="table-container">
            <table>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                </tr>
                <worker-table-item 
                    v-for="worker in $data.workers" 
                    :id="worker.id" :name="worker.name" 
                    :key="worker.id" @show-modal="showModal" 
                    @delete-worker="deleteWorker"
                ></worker-table-item>
            </table>
            <add-item-form @save-item="saveWorker"></add-item-form>
        </div>
    `
}