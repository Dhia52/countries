<template>
    <CardsGroup groupName="Continents" :group="continents" />
    <CardsGroup v-for="([key, countries], index) in countries"
        :key="index"
        :groupName="key"
        :group="countries"
    />
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue"

import CardsGroup from "../components/CardsGroup.vue"

import * as CountriesService from "../services/CountriesService"

import sortCountries from '../functions/SortCountries'

import Country from '../types/Country'

import { continentsArray } from '../data/Continents'

export default defineComponent ({
    name: "Home",
    components: { CardsGroup },
    setup() {
        const continents = ref(continentsArray)
        const countries = ref()

        const getAllCountries = async () => {
            try {
                let allCountries: Country[] = await CountriesService.getAllCountries()
                const sortedCountries = sortCountries(allCountries)
                countries.value = sortedCountries
            } catch (error) {
                console.log(error)
            }
        }

        onMounted(getAllCountries)

        return { countries, continents, getAllCountries }
    }
})
</script>

<style scoped>

</style>