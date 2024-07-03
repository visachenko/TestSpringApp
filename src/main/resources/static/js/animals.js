import ModalMessage from "./widget/common/messageModal.js"
import AnimalsTable from "./widget/animal/animalsTable.js"
import SelectWorkerModal from "./widget/animal/selectWorkerModal.js"
import Tabs from "./widget/common/tabs.js"

const workerActionsApi = Vue.resource('/worker')

const app = new Vue({
    el: '#animals',
    data() {
        return {
            tabs: {
                activeItemId: 1,
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
        AnimalsTable,
        SelectWorkerModal,
        Tabs
    },
    methods: {
        showModal(animalId, action) {
            this.selectAnimalModal.isModalVisible = true;
            this.selectAnimalModal.selectedAnimalId = animalId
            this.selectAnimalModal.currAction = action
        },
        closeModal() {
            this.selectAnimalModal.isModalVisible = false;
            this.selectAnimalModal.selectedAnimalId = -1
            this.selectAnimalModal.currAction = ''
        },
        closeMessage() {
            this.message.text = ''
            this.message.isVisible = false
        },
        select(workerId) {
            const requestModel = {
                animalId: this.selectAnimalModal.selectedAnimalId,
                workerId: workerId,
                action: this.selectAnimalModal.currAction
            }
            workerActionsApi.get(requestModel).then(response => {
                this.closeModal()
                response.json().then(result => {
                    this.message.text = result.message
                    this.message.isVisible = true
                })
            }, _ => {
                this.closeModal()
            })
        }
    },
    template: `
        <div>
            <tabs :activeItemId="tabs.activeItemId"></tabs>
            <animals-table @show-modal="showModal"></animals-table>
            <select-worker-modal :visible="selectAnimalModal.isModalVisible" @close-modal="closeModal" @select-worker="select"></select-worker-modal>
            <modal-message :message="message.text" :visible="message.isVisible" @close-message-modal="closeMessage"></modal-message>
        </div>
    `
})
