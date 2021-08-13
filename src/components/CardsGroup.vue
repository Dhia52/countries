<template>
    <div class="cards-group">
        <h2>
            <span>{{ groupName }}</span>
            <button type="button" class="button--green" v-if="!display" @click="toggleDisplay">Show</button>
            <button type="button" class="button--red" v-else @click="toggleDisplay">Hide</button>
        </h2>
        <div class="cards" v-show="display">
            <Card v-for="(item, index) in group"
                :key="index"
                :content="item"
            />
        </div>
    </div>
</template>

<script>
import { ref, defineComponent, computed } from "vue"

import Card from "./Card.vue"

export default defineComponent ({
    name: "CardsGroup",
    components: { Card },
    props: {
        groupName: {type: String, required: true},
        group: {type: Array, required: true}
    },
    setup () {
        let display = ref(false)

        const toggleDisplay = () => {
            display.value = !display.value
        }

        return { display, toggleDisplay }
    }
})
</script>

<style lang="scss" scoped>
.cards-group {
    margin: 0 10px;
    > .cards {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-start;
        flex-wrap: wrap;
    }
    > h2 {
        display: flex;
        justify-content: space-between;
        > * {
            display: block;
        }
        > button {
            cursor: pointer;
        }
    }
}
</style>