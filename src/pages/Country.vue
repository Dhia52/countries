<template>
    <template v-if="countryInfo">
        <!-- Country name, flag and coat of arms-->
        <h1 class="country-name">{{ countryName }}</h1>
        <img class="country-flag" :src="countryInfo.flags.png" :alt="flagAlt" />
        <img v-if="countryInfo.coatOfArms?.svg" class="country-coat-of-arms" :src="countryInfo.coatOfArms.svg" :alt="flagAlt" />
        <!-- Country name, flag and coat of arms END-->

        <!-- Country information table -->
        <h2>Country Information</h2>
        <!-- Dynamic span of property block (grid-row-end) -->
        <h3 class="property odd-line" :style="{ gridRowEnd: 'span ' + Object.keys(countryInfo.languages).length }">Official Languages</h3>
        <span class="data odd-line" v-for="(language, code) in countryInfo.languages" :key="code">{{ language }}</span>

        <!-- Dynamic span of property block (grid-row-end) -->
        <h3 class="property even-line" :style="{ gridRowEnd: 'span ' + Object.keys(countryInfo.languages).length }">Name in Native Languages</h3>
        <span class="data even-line" v-for="(name, languageCode) in countryInfo.name.nativeName" :key="languageCode">
            <template v-if="official">{{ name.official }}</template>
            <template v-else>{{ name.common }}</template>
        </span>

        <h3 class="property odd-line span-2">Region</h3>
        <span class="data odd-line">{{ countryInfo.region }}</span>
        <span class="data odd-line">{{ countryInfo.subregion }}</span>

        <h3 class="property even-line span-2">Coordinates</h3>
        <span class="data even-line">Latitude: {{ countryInfo.latlng[0] }}</span>
        <span class="data even-line">Longitude: {{ countryInfo.latlng[1] }}</span>

        <h3 class="property odd-line">Area</h3>
        <span class="data odd-line">{{ countryInfo.area }} km²</span>

        <h3 class="property even-line">Demonym</h3>
        <span class="data even-line">{{ countryInfo.demonyms.eng.m }}</span>
        
        <!-- Dynamic span of property block (grid-row-end) -->
        <h3 class="property odd-line" :style="{ gridRowEnd: 'span ' + countryInfo.capital.length }">Capital City</h3>
        <span class="data odd-line" v-for="(capital, index) in countryInfo.capital" :key="index">{{ capital }}</span>
        
        <!-- Dynamic span of property block (grid-row-end) -->
        <h3 class="property even-line" :style="{ gridRowEnd: 'span ' + Object.keys(countryInfo.currencies).length }">Currency</h3>
        <span class="data even-line" v-for="(currency, code) in countryInfo.currencies" :key="code">{{ code }} - {{ currency.name }} ({{ currency.symbol }})</span>

        <!-- Dynamic span of property block (grid-row-end) -->
        <h3 class="property odd-line" :style="{ gridRowEnd: 'span ' + countryInfo.borders.length }">Neighbouring Countries</h3>
        <CountryLink class="data odd-line" v-for="code in countryInfo.borders" :key="code" :countryCode="code.toLowerCase()"/>

        <h3 class="property even-line">United Nations Member</h3>
        <img class="UN-badge data even-line" v-if="countryInfo.unMember" src="https://upload.wikimedia.org/wikipedia/commons/e/ee/UN_emblem_blue.svg" alt="Logo of the United Nations" title="United Nations member"/>
        <span class="data even-line" v-else>No</span>
    <!-- Country Information table END -->

    <!-- Translations -->
        <h2>Translations</h2>
        <template v-for="(translation, code, index) in countryInfo.translations" :key="code">
            <span class="language-name" :class="{ 'odd-line': index%2 === 0, 'even-line': index%2 === 1 }"><b>{{ getLanguageFromCode(code) }}</b></span>
            <span class="translation" :class="{ 'odd-line': index%2 === 0, 'even-line': index%2 === 1 }">
                <template v-if="official">{{ translation.official }}</template>
                <template v-else>{{ translation.common }}</template>
            </span>
        </template>
    <!-- Translations END -->
        <div class="official-name-switch-container">
            <span>Official Names</span>
            <ToggleButton class="official-name-switch" @click="toggleOfficialNames" />
        </div>
    </template>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';

import { useRouter, useRoute } from 'vue-router';

import CountryLink from '../components/CountryLink.vue';
import CountryProperty from '../components/CountryProperty.vue';
import ToggleButton from '../components/ToggleButton.vue';

import { getCountry } from '../services/CountriesService';

import { Country } from '../types/Country';

import { iso_639_2 } from 'iso-639';

export default defineComponent({
    name: "Country",
    components: { CountryLink, CountryProperty, ToggleButton },
    props: {
        countryCode: { type: String, required: true }
    },
    setup(props) {
        console.log(iso_639_2);
        // Router
        const router = useRouter()
        const route = useRoute()

        // Data
        const countryInfo = ref<null | Country>(null)
        const official = ref<boolean>(false)

        // Computed properties
        const flagAlt = computed(() => `Flag of ${countryInfo.value?.name.common}`);
        const coatOfArmsAlt = computed(() => `Coat of Arms of ${countryInfo.value?.name.common}`);
        const countryName = computed(() => official.value ? countryInfo.value?.name.official : countryInfo.value?.name.common)

        // Methods
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
        const toggleOfficialNames = () => { official.value = !official.value }
        const getLanguageFromCode = (code: string) => iso_639_2[code] ? iso_639_2[code].en[0] : code;

        getCountryInfo(props.countryCode)

        //Watcher for refreshing country info after clicking a link
        watch(
            () => route.params.countryCode,
            (toIsoCode) => { if (typeof toIsoCode === "string") getCountryInfo(toIsoCode) }
        )

        return {
            countryInfo,
            flagAlt,
            coatOfArmsAlt,
            countryName,
            official,
            toggleOfficialNames,
            getLanguageFromCode,
            getCountryInfo
        }
    }
    
})
</script>

<style lang="scss" scoped>
@mixin text-vertical-center {
    display: flex;
    align-items: center;
}

.country-name {
    grid-column: 1 / span 12;
    text-align: center;
}
h2 {
    grid-column: 1 / span 12;
    text-align: center;
}
.property {
    margin: unset;
    padding: 10px 0 10px 5px;
    grid-column: 1 / span 6;
    @include text-vertical-center;

    &.span-2 {
        grid-row-end: span 2;
    }
}
.odd-line {
    background-color: #99aab5;
}
.data {
    grid-column: 7 / span 6;
    padding: 3px 0;
    @include text-vertical-center;
}
.UN-badge {
    width: 20px;
    height: 20px;
}

.country-flag {
    grid-column: 3 / span 8;
    border: 3px solid #42b883;
    margin: 10px 0;
    width: 100%;
}

.country-coat-of-arms {
    grid-column: 3 / span 8;
    margin: 10px 0;
    width: 100%;
}

.language-name {
    grid-column: 1 / span 4;
    padding: 3px 0 3px 3px;
    @include text-vertical-center;
}

.translation {
    grid-column: 5 / span 8;
    padding: 3px 0;
    @include text-vertical-center;
}
.official-name-switch-container {
    grid-column: 1 / span 12;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: sticky;
    bottom: 0;
    background-color: #42b883;
    padding: 10px 0;

    > span {
        font-weight: 800;
    }
}

</style>