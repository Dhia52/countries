<template>
    <RandomCountries v-if="allCountries" :countries="allCountries" />
    <!-- <CountriesList :countries="countries" /> -->
</template>

<script lang="ts">
import { ref, defineComponent } from "vue"

import CardsGroup from "../components/CardsGroup.vue"
import RandomCountries from "../components/RandomCountries.vue"
import CountriesList from "../components/CountriesList.vue"

import { getAllCountries } from "../services/CountriesService"

import { sortCountries } from '../functions/SortCountries'

import { CountryCard } from '../types/CountryCard'

import { continentsArray } from '../data/Continents'

export default defineComponent ({
    name: "Home",
    components: { CardsGroup, RandomCountries, CountriesList },
    setup() {
        const continents = ref(continentsArray)
        const allCountries = ref<null | CountryCard[]>(null)

        const getCountries = async () => {
            try {
                let countries = await getAllCountries()
                allCountries.value = countries
            } catch (error) {
                console.log(error)
            }
        }

        getCountries()
        return { allCountries, continents, getCountries }
    }
})
</script>

<style scoped>

</style>