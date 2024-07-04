import ModalMessage from "./widget/common/messageModal.js"
import SelectAnimalModal from "./widget/worker/selectAnimalModal.js"
import WorkersTable from "./widget/worker/workersTable.js"
import Tabs from "./widget/common/tabs.js"

const workerActionsApi = Vue.resource('/api/worker')

const app = new Vue({
    el: '#workers',
    data() {
        return {
            tabs: {
                activeItemId: 0,
            },
            selectAnimalModal: {
                isModalVisible: false,
                selectedWorkerId: -1,
                currAction: '',
            },
            message: {
                isVisible: false,
                text: ''
            }
        };
    },
    components: {
        ModalMessage,
        SelectAnimalModal,
        WorkersTable,
        Tabs
    },
    methods: {
        showModal(workerId, action) {
            this.selectAnimalModal.currAction = action
            this.selectAnimalModal.isModalVisible = true;
            this.selectAnimalModal.selectedWorkerId = workerId
        },
        closeModal() {
            this.selectAnimalModal.currAction = ''
            this.selectAnimalModal.isModalVisible = false;
            this.selectAnimalModal.selectedWorkerId = -1
        },
        closeMessage() {
            this.message.text = ''
            this.message.isVisible = false
        },
        select(animalId) {
            const requestModel = {
                animalId: animalId,
                workerId: this.selectAnimalModal.selectedWorkerId,
                action: this.selectAnimalModal.currAction
            }
            workerActionsApi.get(requestModel).then(response => {
                this.closeModal()
                response.json().then(result => {
                    this.message.text = result.message
                    this.message.isVisible = true
                })
            }, errorResponse => {
                this.closeModal()
                errorResponse.json().then(result => {
                    this.message.text = result.message
                    this.message.isVisible = true
                })
            })
        }
    },
    template: `
        <div>
            <tabs :activeItemId="tabs.activeItemId"></tabs>
            <workers-table @show-modal="showModal"></workers-table>
            <select-animal-modal :visible="selectAnimalModal.isModalVisible" @close-modal="closeModal" @select-animal="select" :action="selectAnimalModal.currAction" ></select-animal-modal>
            <modal-message :message="message.text" :visible="message.isVisible" @close-message-modal="closeMessage"></modal-message>
        </div>
    `
})
