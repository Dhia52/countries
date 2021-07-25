<template>
    <Card v-for="(country, index) in countries"
        :key="index"
        :cardTitle="country.name"
        :image="{alt: `Flag of ${country.name}`, img: country.flag}"
    />
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue"

import Card from "../components/Card.vue"

import * as CountriesService from "../services/CountriesService.js"

import Country from '../types/Country'

export default defineComponent ({
    name: "Home",
    components: { Card },
    setup() {
        const countries = ref<Country[]>([{name: '', capital: '', flag: ''}])

        const getAllCountries = async () => {
            try {
                countries.value = await CountriesService.getAllCountries()
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