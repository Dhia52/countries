<template>
    <h1>Welcome to {{ appTitle }}!</h1>
    <p>The web application that quenches your thirst of knowledge about countries of the world!</p>
    <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/The_world_flag_2006.svg" alt="App favicon" />
    <CountriesList v-if="allCountries" :countries="allCountries" />
    <RandomCountries v-if="allCountries" :countries="allCountries" />
</template>

<script lang="ts">
import { ref, defineComponent } from "vue"

import RandomCountries from "../components/RandomCountries.vue"
import CountriesList from "../components/CountriesList.vue"

import { getAllCountries } from "../services/CountriesService"

import { CountryCard } from '../types/CountryCard'

export default defineComponent ({
    name: "Home",
    components: { RandomCountries, CountriesList },
    setup() {
        const allCountries = ref<null | CountryCard[]>(null)
        const appTitle = ref(import.meta.env.VITE_APP_TITLE)

        const getCountries = async () => {
            try {
                let countries = await getAllCountries()
                allCountries.value = countries
            } catch (error) {
                console.log(error)
            }
        }

        getCountries()
        return { allCountries, appTitle, getCountries }
    }
})
</script>

<style lang="scss" scoped>
h1 {
    grid-column: 1 / span 12;
    place-self: center;
    text-align: center;
}
p {
    grid-column: 1 / span 12;
    place-self: center;
    text-align: center;
}
img{
    width: 100%;
    grid-column: 1 / span 12;
    place-self: center;
}
.countries-list, .random-countries {
    grid-column: 1 / span 12;
}
</style>