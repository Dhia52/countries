<template>
    <h1>{{ region.name }}</h1>
    <CardsGroup v-for="([key, countries], index) in countries"
        :groupName="key"
        :group="countries"
        :key="index"
    />
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'

import { useRouter, useRoute } from 'vue-router'

import CardsGroup from '../components/CardsGroup.vue'

import { continentsArray } from '../data/Continents'

import { getContinentCountries } from '../services/CountriesService'

import { sortCountries } from '../functions/SortCountries'

import { Continent } from '../types/Continent'

export default defineComponent({
    name: "Region",
    components: { CardsGroup },
    props: {
        regionCode: { type: String, required: true}
    },
    setup (props) {
        const router = useRouter()
        const route = useRoute()
        
        const region = ref<Continent>({name: '', img: '', code: ''})

        //Navigation guard
        const continentIndex = continentsArray.findIndex(continent => continent.code === props.regionCode)
        //Redirect to "Page not found" if region is invalid
        if ( continentIndex === -1 ) {
            router.replace({
                name: 'NotFound',
                params: { path: route.path.substring(1).split('/') }
            })
        }
        // Navigation guard end

        region.value = continentsArray[continentIndex]
        const countries = ref()
        
        const getRegionCountries = async () => {
            try {
                let allCountries = await getContinentCountries(region.value.name)
                countries.value = sortCountries(allCountries)
            } catch (error) {
                console.log(error)
            }
        }
        
        getRegionCountries()

        return { region, countries, getRegionCountries }
    }
})
</script>

<style scoped>

</style>