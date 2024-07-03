import AddItemForm from "../common/addItemForm.js";
import AnimalTableItem from "./animalTableItem.js";

const animalsApi = Vue.resource('/animalsList')
const concreteAnimalApi = Vue.resource('/animalsList/{id}')

export default {
        name: 'animals-table',
        data: function() {
            return {
                animals: []
            }
        },
        created: function () {
            animalsApi.get().then(response => {
                response.json().then(data => {
                    this.animals = data
                })
            })
        },
        components: {
            AddItemForm,
            AnimalTableItem
        },
        methods: {
            showModal(animalId, action) {
                this.$emit("show-modal", animalId, action)
            },
            saveAnimal(animalName) {
                const animal = {name: animalName}
                animalsApi.save({}, animal).then(result => {
                    result.json().then(updatedData => {
                        this.animals.push(updatedData)
                    })
                })
            },
            deleteAnimal(animalId) {
                concreteAnimalApi.delete({id: animalId}).then(result => {
                    const index = this.animals.findIndex((element) => element.id === animalId);
                    if (index !== -1) {
                        this.animals.splice(index, 1);
                    }
                })
            },
            updateAnimalPrisoned(animalId, isPrisoned) {
                const resultObj = {prisoned: isPrisoned};
                concreteAnimalApi.update({id: animalId}, resultObj).then(response => {
                    response.json().then(updatedData => {
                        const index = this.animals.findIndex((element) => element.id === animalId);
                        if (index !== -1) {
                            this.animals.splice(index, 1, updatedData);
                        }
                    })
                }, response => {

                })
            },
            sendToPrison(animalId) {
                this.updateAnimalPrisoned(animalId, true)
            },
            sendToWalkingArea(animalId) {
                this.updateAnimalPrisoned(animalId, false)
            }
        },
        template: `
            <table>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                </tr>
                <animal-table-item
                    v-for="animal in $data.animals"
                    :id="animal.id"
                    :name="animal.name"
                    :key="animal.id"
                    :prisoned="animal.prisoned"
                    @show-modal="showModal"
                    @send-to-prison="sendToPrison"
                    @send-to-walking-area="sendToWalkingArea"
                    @delete-animal="deleteAnimal">
                </animal-table-item>
                <add-item-form @save-item="saveAnimal"></add-item-form>
            </table>
`
}