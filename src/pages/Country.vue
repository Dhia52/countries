<template>
    <el-container v-if="countryInfo">
        <el-header>
            <el-row align="middle" justify="center">
                <el-col :xs="24" :sm="12">
                    <h1>{{ countryInfo.name }} <span v-if="showNativeName">- {{ countryInfo.nativeName }}</span></h1>
                    <h4 v-if="countryInfo.altSpellings">{{ countryInfo.altSpellings.join(', ') }}</h4>
                </el-col>
                <el-col :xs="24" :sm="{span: 10, offset: 2}">
                    <el-card :body-style="{ backgroundColor: '#1a1a1a' }">
                        <el-image :alt="flagAlt" :src="countryInfo.flag" fit="contain">text</el-image>
                    </el-card>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-row justify="space-between">
                <CountryProperty name="Capital city" v-if="countryInfo.capital">{{ countryInfo.capital }}</CountryProperty>
                <CountryProperty name="Demonym" v-if="countryInfo.demonym">{{ countryInfo.demonym }}</CountryProperty>
                <CountryProperty name="Languages">{{ spokenLanguages.join(', ') }}</CountryProperty>
                <CountryProperty name="Region">
                    <el-row>
                        <el-col :sm="12"><router-link :to="regionLink" class="region-link">{{ countryInfo.region }}</router-link></el-col>
                        <el-col :sm="12">{{ countryInfo.subregion }}</el-col>
                    </el-row>
                </CountryProperty>
                <CountryProperty name="Position">
                    <el-row align="middle">
                        <el-col :xs="24" :sm="12">Latitude: {{ countryInfo.latlng[0] }}</el-col>
                        <el-col :xs="24" :sm="12">Longitude: {{ countryInfo.latlng[1] }}</el-col>
                    </el-row>
                </CountryProperty>
                <CountryProperty v-if="countryInfo.area" name="Area">{{ countryInfo.area }} km²</CountryProperty>
                <CountryProperty name="Population">{{ countryInfo.population }}</CountryProperty>
                <CountryProperty name="Currency">
                    <el-row>
                        <el-col v-for="(currency, index) in countryInfo.currencies" :key="index">
                            {{ currency.code }} - {{ currency.name }} <span v-if="currency.symbol">({{ currency.symbol }})</span>
                        </el-col>
                    </el-row>
                </CountryProperty>
                <CountryProperty name="Country name in other languages">
                    <el-row>
                        <el-col v-for="(value, name, index) in countryInfo.translations" :key="index">
                            {{ name }}: {{ value }}
                        </el-col>
                    </el-row>
                </CountryProperty>
                <CountryProperty name="This country is a member of the" v-if="countryInfo.regionalBlocs.length > 0">
                <el-row>
                    <el-col v-for="(bloc, index) in countryInfo.regionalBlocs" :key="index">
                        {{ bloc.name }} - {{ bloc.acronym }}
                    </el-col>
                </el-row>
                </CountryProperty>
                <CountryProperty name="Neighbouring Countries" v-if="hasNeighbours">
                    <el-row>
                        <el-col v-for="countryCode in countryInfo.borders" :key="countryCode">
                            <CountryLink :countryCode="countryCode" />
                        </el-col>
                    </el-row>
                </CountryProperty>
            </el-row>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'

import { useRouter, useRoute } from 'vue-router'

import CountryLink from '../components/CountryLink.vue'
import CountryProperty from '../components/CountryProperty.vue'

import { continentsArray } from '../data/Continents'

import { getCountry } from '../services/CountriesService'

import { Country } from '../types/Country'
import { CountryCard } from '../types/CountryCard'

export default defineComponent({
    name: "Country",
    components: { CountryLink, CountryProperty },
    props: {
        countryCode: { type: String, required: true }
    },
    setup(props) {
        const router = useRouter()
        const route = useRoute()

        const countryInfo = ref<Country>()

        const getCountryInfo = async (isoCode: string) => {
            try {
                let info = await getCountry(isoCode)
                countryInfo.value = info
            } catch (error) {
                console.log(error)
                //Navigation guard
                router.replace({
                    name: 'NotFound',
                    params: { path: route.path.substring(1).split('/') }
                })
            }
        }

        const getNeighboursInfo = () => {
            const neighbours: CountryCard[] = []
            if(countryInfo.value?.borders) {
                countryInfo.value.borders.forEach(async (isoCode) => {
                    try {
                        let country = await getCountry(isoCode.toString())
                        neighbours.push({name: country.name, flag: country.flag, alpha3Code: country.alpha3Code})
                    } catch(error) {
                        console.log("Neighbour not found");
                    }
                });
            }
            return neighbours
        }

        getCountryInfo(props.countryCode.toLowerCase())

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

        const neighbours = computed(() => getNeighboursInfo())
            
        const spokenLanguages = computed(() => {
            let languages: String[] = []
            if(countryInfo.value && "languages" in countryInfo.value) {
                countryInfo.value.languages.forEach(language => languages.push(language.name))
            }
            return languages
        })

        //Watcher for refreshing country info after clicking a link
        watch(
            () => route.params.countryCode,
            (toIsoCode) => { 
                if (typeof toIsoCode === "string") {
                    getCountryInfo(toIsoCode)
                    console.log(countryInfo.value?.borders)
                }
            }
        )

        return {
            countryInfo,
            getCountryInfo,
            getNeighboursInfo,
            neighbours,
            showNativeName,
            flagAlt,
            regionLink,
            hasNeighbours,
            spokenLanguages
        }
    }
    
})
</script>

<style lang="scss" scoped>
.el-header {
    height: auto;
    text-align: center;
}

.region-link {
    color: yellow;
}
</style>