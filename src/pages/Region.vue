<template>
    <h1>{{ regionName.substring(0, 1).toUpperCase() + regionName.substring(1) }}</h1>
    <img src="" alt="" />
    <p>There are {{ regionCountries?.length }} countries in this region.</p>
    <CountriesList v-if="regionCountries" :countries="regionCountries" />
    <RandomCountries v-if="regionCountries" :countries="regionCountries" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

import { useRouter, useRoute } from 'vue-router'
import { useStore } from '../store/index'

import CountriesList from '../components/CountriesList.vue'
import RandomCountries from '../components/RandomCountries.vue'

import { continentsArray } from '../data/Continents'

import { getContinentCountries } from '../services/CountriesService'

import { Continent } from '../types/Continent'
import { CountryCard } from '../types/CountryCard'

export default defineComponent({
    name: "Region",
    components: { CountriesList, RandomCountries },
    props: {
        regionName: { type: String, required: true}
    },
    setup (props) {
        const router = useRouter()
        const route = useRoute()
        const store = useStore()
        
        const region = ref<undefined | Continent>(undefined)
        const regionCountries = ref<null | CountryCard[]>(null)

        const getRegionCountries = async (regionName: string) => {
            // store.commit('TOGGLE_IS_LOADING')
            try {
                let countries = await getContinentCountries(regionName)
                region.value = continentsArray.find(continent => continent.name.toLowerCase() === regionName.toLowerCase())
                regionCountries.value = countries
            } catch (error) {
                console.log(error)
            } finally {
                store.commit('TOGGLE_IS_LOADING')
            }
        }

        //Navigation guard
        const continentIndex = continentsArray.findIndex(continent => continent.name.toLowerCase() === props.regionName.toLowerCase())

        //Redirect to "Page not found" if region is invalid
        if ( continentIndex === -1 ) {
            router.replace({
                name: 'NotFound',
                params: { path: route.path.substring(1).split('/') }
            })
            // Navigation guard end
        } else{
            region.value = continentsArray[continentIndex]
            getRegionCountries(props.regionName)
        }

        //Watcher to refresh region info
        watch(
            () => route.params.regionName,
            (toRegionName) => {
                if (typeof toRegionName === "string") {
                    regionCountries.value = null
                    getRegionCountries(toRegionName)
                }
            }
        )

        return { region, regionCountries, getRegionCountries }
    }
})
</script>

<style scoped>
h1 {
    grid-column: 1 / span 12;
    text-align: center;
}

img {
    grid-column: 1 / span 12;
}

p {
    grid-column: 1 / span 12;
    text-align: center;
}

.countries-list, .random-countries {
    grid-column: 1 / span 12;
}
</style>