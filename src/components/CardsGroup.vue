<template>
    <div class="cards-group">
        <div class="cards">
            <Card v-for="(countryCard, index) in countriesCards"
                :key="index"
                :country="countryCard"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from "vue"

import Card from "./Card.vue"

import { CountryCard } from '../types/CountryCard'

export default defineComponent ({
    name: "CardsGroup",
    components: { Card },
    props: {
        countriesCards: { type: Array as PropType<CountryCard[]>, required: true }
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
}
</style>