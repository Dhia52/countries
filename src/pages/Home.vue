<template>
    <CardsGroup groupName="Continents" :group="continents" />
    <CardsGroup v-for="([key, countries], index) in countries"
        :groupName="key"
        :group="countries"
        :key="index"
    />
</template>

<script lang="ts">
import { ref, defineComponent } from "vue"

import CardsGroup from "../components/CardsGroup.vue"

import { getAllCountries } from "../services/CountriesService"

import { sortCountries } from '../functions/SortCountries'

import { CountryCard } from '../types/CountryCard'

import { continentsArray } from '../data/Continents'

export default defineComponent ({
    name: "Home",
    components: { CardsGroup },
    setup() {
        const continents = ref(continentsArray)
        const countries = ref()

        const getCountries = async () => {
            try {
                let allCountries: CountryCard[] = await getAllCountries()                
                countries.value = sortCountries(allCountries)
            } catch (error) {
                console.log(error)
            }
        }

        getCountries()

        return { countries, continents, getCountries }
    }
})
</script>

<style scoped>

</style>