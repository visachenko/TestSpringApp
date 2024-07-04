const TabItem = Vue.component('tab-item', {
    props: ['id', 'title', 'hrefLink', 'active'],
    template: `
        <div class="tab">
            <a v-if="active" key="id">{{ title }}</a>
            <a v-else :href="hrefLink" key="id">{{ title }}</a>
        </div>
    `
})

export default {
    props: ['activeItemId'],
    components: {
        TabItem
    },
    data: function () {
        return {
            items: [
                { id: 0, title: "Работники", link: "/workers" },
                { id: 1, title: "Животные", link: "/animals" }
            ]
        }
    },
    template: `
        <div>
            <div class="tabs-container">
                <tab-item 
                    v-for="item in items" 
                    :id="item.id" 
                    :hrefLink="item.link" 
                    :active="item.id === activeItemId" 
                    :title="item.title"
                ></tab-item>
            </div>
        </div>
    `
}