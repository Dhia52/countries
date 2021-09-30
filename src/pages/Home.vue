<template>
    <el-row justify="space-around" align="center">
        <el-col :xs="0" :sm="10" id="app-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/The_world_flag_2006.svg" alt="App favicon" />
        </el-col>
        <el-col :xs="24" :sm="10" id="app-presentation">
            <h1>Welcome to {{ appTitle }}!</h1>
            <p>The web application that quenches your thirst of knowledge about countries of the world!</p>
        </el-col>
    </el-row>
    <CountriesList v-if="allCountries" :countries="allCountries" />
    <el-divider></el-divider>
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
#app-presentation {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    >* {
        text-align: center;
    }

    >p {
        font-size: 1.3em;
    }
}
img {
    width: 100%;
    object-fit: contain;
}
</style>