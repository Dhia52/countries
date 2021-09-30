<template>
    <el-row justify="space-around" align="center" v-if="regionCountries">
        <el-col :xs="0" :sm="10">
            <img src="" alt="" />
        </el-col>
        <el-col :xs="24" :sm="10">
            <h1>{{ regionName }}</h1>
            <p>There are {{ regionCountries.length }} countries in this region.</p>
        </el-col>
    </el-row>
    <CountriesList v-if="regionCountries" :countries="regionCountries" />
    <el-divider></el-divider>
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

</style>