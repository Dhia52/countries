<template>
    <CountriesGroup v-for="([key, countries], index) in countries"
        :key="index"
        :groupName="key"
        :countries="countries"
    />
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue"

import CountriesGroup from "../components/CountriesGroup.vue"

import * as CountriesService from "../services/CountriesService"

import sortCountries from '../functions/SortCountries'

import Country from '../types/Country'

export default defineComponent ({
    name: "Home",
    components: { CountriesGroup },
    setup() {
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

        return { countries, getAllCountries }
    }
})
</script>

<style scoped>

</style>