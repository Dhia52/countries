<template>
    <div class="country-info" v-if="countryInfo">
        <div class="country-names">
            <h1>{{ countryInfo.name }} <span v-if="showNativeName">- {{ countryInfo.nativeName }}</span></h1>
            <h4 v-if="countryInfo.altSpellings">{{ countryInfo.altSpellings.join(', ') }}</h4>
        </div>
        <div class="country-flag">
            <h2>{{ flagAlt }}</h2>
            <img :alt="flagAlt" :src="countryInfo.flag" />
        </div>
        <h2 v-if="countryInfo.demonym">Demonym: {{ countryInfo.demonym }}</h2>
        <div class="country-region">
            <h2>Region:</h2>
            <div><router-link :to="regionLink">{{ countryInfo.region }}</router-link><br>{{ countryInfo.subregion }}</div>
        </div>
        <div class="country-position">
            <h2>Position:</h2>
            <div>Latitude: {{ countryInfo.latlng[0] }}<br>Longitude: {{ countryInfo.latlng[1] }}</div>
        </div>
        <h2 v-if="countryInfo.area">Area: {{ countryInfo.area }} km²</h2>
        <h2>Population: {{ countryInfo.population }}</h2>
        <h2 v-if="countryInfo.capital">Capital city: {{ countryInfo.capital }}</h2>
        <div class="country-currencies">
            <h2>Currency:</h2>
            <div v-for="(currency, index) in countryInfo.currencies" :key="index">
                {{ currency.code }} - {{ currency.name }} ({{ currency.symbol }})
            </div>
        </div>
        <div class="neighbours" v-if="hasNeighbours">
            <h2>Neighbouring countries:</h2>
            <CountryLink v-for="(countryCode, index) in countryInfo.borders" 
                :key="index"
                :countryCode="countryCode"
            />
        </div>
        <div class="languages">
            <h2>Languages:</h2>
            <div v-for="(language, index) in countryInfo.languages" :key="index">
                {{ language.name }}
            </div>
        </div>
        <div v-if="countryInfo.regionalBlocs.length > 0" class="blocs">
            <h2>This country is a member of the:</h2>
            <div v-for="(bloc, index) in countryInfo.regionalBlocs" :key="index">
                {{ bloc.name }} - {{ bloc.acronym }}
            </div>
        </div>
        <div class="translations">
            <h2>Country name in other languages:</h2>
        <div v-for="(value, name, index) in countryInfo.translations" :key="index">
            {{ name }}: {{ value }}
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import CountryLink from '../components/CountryLink.vue'

import { continentsArray } from '../data/Continents'

import { getCountry } from '../services/CountriesService'

import { Country } from '../types/Country'

export default defineComponent({
    name: "Country",
    components: { CountryLink },
    props: {
        countryCode: { type: String, required: true }
    },
    setup(props) {
        const countryInfo = ref<Country>()

        const getCountryInfo = async () => {
            try {
                let info = await getCountry(props.countryCode.toLowerCase())
                countryInfo.value = info
            } catch (error) {
                console.log(error)
            }
        }

        const getNeighboursInfo = async () => {
            try {
                
            } catch (error) {
                console.log(error)
            }
        }

        getCountryInfo()

        const showNativeName = computed(() => {
            if(countryInfo.value && "name" in countryInfo.value && "nativeName" in countryInfo.value) {
                return countryInfo.value.name !== countryInfo.value.nativeName
            }
            return false
        })

        const flagAlt = computed(() => {
            let alt = ''
            if(countryInfo.value && "name" in countryInfo.value) {
                alt = `Flag of ${countryInfo.value.name}`
            }
            return alt
        })

        const regionLink = computed(() => {
            if(countryInfo.value && "region" in countryInfo.value) {
                let region: String = countryInfo.value.region
                let continent = continentsArray.find(element => element.name === region)
                if (continent) {
                    return `/region/${continent.code}`
                }

                return '/'
            }
        })

        const hasNeighbours = computed(() => {
            if(countryInfo.value && "borders" in countryInfo.value) {
                if(countryInfo.value.borders.length > 0) {
                    return true
                }
            }
            return false
        })

        return { countryInfo, getCountryInfo, showNativeName, flagAlt, regionLink, hasNeighbours }
    }
    
})
</script>

<style lang="scss" scoped>
.country-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    > .country-flag {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 250px;
        padding: 5px;
        margin: 5px;
        > img {
            width: 100%;
            border: gray 5px solid;
        }
    }
}
</style>