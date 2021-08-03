<template>
    <CardsGroup groupName="Continents" :group="continents" />
    <CardsGroup v-for="([key, countries], index) in countries"
        :groupName="key"
        :group="countries"
        :key="index"
    />
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue"

import CardsGroup from "../components/CardsGroup.vue"

import { getAllCountries } from "../services/CountriesService"

import { sortCountries } from '../functions/SortCountries'

import Country from '../types/Country'

import { continentsArray } from '../data/Continents'

export default defineComponent ({
    name: "Home",
    components: { CardsGroup },
    setup() {
        const continents = ref(continentsArray)
        const countries = ref()

        const getCountries = async () => {
            try {
                let allCountries: Country[] = await getAllCountries()
                const sortedCountries = sortCountries(allCountries)
                countries.value = sortedCountries
            } catch (error) {
                console.log(error)
            }
        }

        onMounted(getCountries)

        return { countries, continents, getCountries }
    }
})
</script>

<style scoped>

</style>