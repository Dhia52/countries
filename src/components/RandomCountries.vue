<template>
    <div class="random-countries grid-container">
        <h2>Random countries <span v-if="region">from {{ region }}</span></h2>
        <CardsGroup :countriesCards="randomCountries"/>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from 'vue'

import CardsGroup from '../components/CardsGroup.vue'

import { CountryCard } from '../types/CountryCard'

export default defineComponent({
    components: { CardsGroup },
    props: {
        countries: { type: Array as PropType<CountryCard[]>, required: true },
        region: { type: String, required: false }
    },
    setup (props) {
        const randomCountries = ref(getRandomCountries())

        function getRandomCountries() {
            let randomCountries: CountryCard[] = []

            for(let i = 0; i < 5 && i < props.countries.length; i++) {
                let randomIndex = Math.floor(Math.random() * (props.countries.length + 1))
                randomCountries.push(props.countries[randomIndex])
                props.countries.splice(randomIndex, 1)
            }

            return randomCountries
        }

        return { randomCountries }
    }
})
</script>

<style lang="scss" scoped>
h2 {
    grid-column: 1 / span 12;
    text-align: center;
}
</style>