<template>
    <!-- <el-row justify="space-between" align="middle">
        <el-button>Hello</el-button>
        <el-switch
            v-model="official"
            active-text="Official names"
        ></el-switch>
    </el-row>
    <el-row v-if="countryInfo" justify="space-around" align="middle">
        <el-col :xs="24" :sm="12" :md="10" class="country-flag-container">
            <el-row id="country-name" justify="center" align="middle">
                <h1 v-if="!official">{{ countryInfo.name.common }}</h1>
                <h1 v-else>{{ countryInfo.name.official }}</h1>
                <el-tooltip placement="top" content="United Nations member" v-if="countryInfo.unMember">
                    <el-avatar
                        alt="Logo of the United Nations"
                        src="https://upload.wikimedia.org/wikipedia/commons/e/ee/UN_emblem_blue.svg"
                        size="small"
                        fit="scale-down"
                    >
                    </el-avatar>
                </el-tooltip>
            </el-row>
            <img class="country-flag" :src="countryInfo.flags.svg" :alt="flagAlt" />
        </el-col>
        <el-col :xs="24" :sm="12" :md="10">
            <CountryProperty name="Official Languages">
                <el-row v-for="(language, code) in countryInfo.languages" :key="code">
                    {{ language }}
                </el-row>
            </CountryProperty>
            <CountryProperty name="Name in Native Language" v-if="countryInfo.name.nativeName">
                <el-row>
                    <el-col v-for="(names, lang) in countryInfo.name.nativeName" :key="lang" :span="24">
                        <span v-if="Object.keys(countryInfo?.name.nativeName).length > 1">{{ convertCodeToLanguage(lang) }}: </span>
                        <span v-if="!official">{{ names.common }}</span>
                        <span v-else>{{ names.official }}</span>
                    </el-col>
                </el-row>
            </CountryProperty>
            <CountryProperty name="Currency" v-if="countryInfo.currencies">
                <el-row v-for="(currency, code) in countryInfo.currencies" :key="code">
                    {{ currency.name }} - {{ code }} ({{ currency.symbol }})
                </el-row>
            </CountryProperty>
            <CountryProperty name="Capital City" v-if="countryInfo.capital">
                {{ countryInfo.capital.join(', ') }}
            </CountryProperty>
            <CountryProperty name="Region">
                {{ countryInfo.region }}
            </CountryProperty>
            <CountryProperty name="Subregion">
                {{ countryInfo.subregion }}
            </CountryProperty>
            <CountryProperty name="Coordinates">
                <el-row>
                    <el-col :span="12">
                        Latitude
                    </el-col>
                    <el-col :span="12">
                        {{ countryInfo.latlng[0] }}°
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        Longitude
                    </el-col>
                    <el-col :span="12">
                        {{ countryInfo.latlng[1] }}°
                    </el-col>
                </el-row>
            </CountryProperty>
            <CountryProperty name="Neighbouring Countries" v-if="countryInfo.borders">
                <el-row v-for="code in countryInfo.borders" :key="code">
                    <CountryLink :countryCode="code.toLowerCase()" />
                </el-row>
            </CountryProperty>
            <CountryProperty name="Area">
                {{ countryInfo.area }} km²
            </CountryProperty>
            <CountryProperty name="Demonym">
                <span v-if="countryInfo.demonyms.eng.m === countryInfo.demonyms.eng.f">
                    {{ countryInfo.demonyms.eng.m }}
                </span>
                <span v-else>{{ countryInfo.demonyms.eng.m }} - {{ countryInfo.demonyms.eng.f }}</span>
            </CountryProperty>
        </el-col>
    </el-row>
    <el-row><el-col :span="24">
        <el-row><h2>Translations</h2></el-row>
        <CountryProperty name="Country Name" v-if="countryInfo?.translations">
            <el-row v-for="(translation, code) in countryInfo.translations" :key="code">
                <el-col :span="12">
                    {{ convertCodeToLanguage(code) }}
                </el-col>
                <el-col :span="12">
                    <span v-if="official">{{ translation.official }}</span>
                    <span v-else>{{ translation.common }}</span>
                </el-col>
            </el-row>
        </CountryProperty>
        <CountryProperty name="Demonym" v-if="countryInfo?.demonyms">
            <template v-for="(translation, lang) in countryInfo.demonyms" :key="lang">
                <el-row v-if="lang !== 'eng'" >
                    <el-col :span="12">
                        {{ convertCodeToLanguage(lang) }}
                    </el-col>
                    <el-col :span="12">
                        <span>{{ translation.m }}</span>
                        <span v-if="translation.m !== translation.f">{{ translation.f }}</span>
                    </el-col>
                </el-row>
            </template>
        </CountryProperty>
    </el-col></el-row> -->
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'

import { useRouter, useRoute } from 'vue-router'

import CountryLink from '../components/CountryLink.vue'
import CountryProperty from '../components/CountryProperty.vue'

import { getCountry } from '../services/CountriesService'

// import iso6393 from '@freearhey/iso-639-3'

import { Country } from '../types/Country'

export default defineComponent({
    name: "Country",
    components: { CountryLink, CountryProperty },
    props: {
        countryCode: { type: String, required: true }
    },
    setup(props) {
        const router = useRouter()
        const route = useRoute()

        const countryInfo = ref<null | Country>(null)
        const official = ref<boolean>(false)

        const flagAlt = computed(() => `Flag of ${countryInfo.value?.name.common}`)
        const nativeNames = computed(() => {
            if (typeof countryInfo.value?.name.nativeName === "object") {
                if (Object.keys(countryInfo.value?.name.nativeName).length > 0) {
                    return Object.keys(countryInfo.value?.name.nativeName)
                }
                return null
            }
        })

        const getCountryInfo = async (isoCode: string) => {
            try {
                let info = await getCountry(isoCode)
                countryInfo.value = info
                document.title= `${info.name.common.toString()} - ${import.meta.env.VITE_APP_TITLE}`
            } catch (error) {
                console.log(error)
                //Navigation guard
                router.replace({
                    name: 'NotFound',
                    params: { path: route.path.substring(1).split('/') }
                })
            }
        }

        const convertCodeToLanguage = (code: string) => iso6393.find(lang => lang.code === code )?.name

        convertCodeToLanguage('eng')
        getCountryInfo(props.countryCode)

        //Watcher for refreshing country info after clicking a link
        watch(
            () => route.params.countryCode,
            (toIsoCode) => { if (typeof toIsoCode === "string") getCountryInfo(toIsoCode) }
        )

        return {
            countryInfo,
            flagAlt,
            nativeNames,
            official,
            getCountryInfo,
            convertCodeToLanguage
        }
    }
    
})
</script>

<style lang="scss" scoped>
.country-flag {
    max-width: 100%;
    max-height: 50vh
}
</style>