<template>
    <h1>{{ pageTitle }}</h1>
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

export default defineComponent({
    name: "Region",
    components: { CardsGroup },
    props: {
        region: { type: String, required: true}
    },
    setup (props) {
        const router = useRouter()
        const route = useRoute()

        //Navigation guard
        let validRegions: String[] = []
        continentsArray.forEach( continent => {
            validRegions.push(continent.name.toLowerCase())
        })

        //Redirect to "Page not found" if region is invalid
        if ( validRegions.indexOf(props.region) === -1 ) {
            router.replace({
                name: 'NotFound',
                params: { path: route.path.substring(1).split('/') }
            })
        }
        // Navigation guard end

        const countries = ref()
        //Capitalize continent name
        const pageTitle = computed(() => props.region[0].toUpperCase() + props.region.slice(1))

        const getRegionCountries = async () => {
            try {
                let allCountries = await getContinentCountries(props.region)
                const sortedCountries = sortCountries(allCountries)
                countries.value = sortedCountries
            } catch (error) {
                console.log(error)
            }
        }

        onMounted(getRegionCountries)

        return { countries, pageTitle, getRegionCountries }
    }
})
</script>

<style scoped>

</style>