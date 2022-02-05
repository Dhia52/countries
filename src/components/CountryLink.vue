<template>
    <router-link v-if="country" :to="link" class="country-neighbour">
        {{ country.flag }} {{ country.name.common }}
    </router-link>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

import { getCountry } from '../services/CountriesService'

import { Country } from '../types/Country'

export default defineComponent({
    name: 'CountryLink',
    props: {
        countryCode: { type: String, required: true }
    },
    setup (props) {
        const country = ref<null | Country>(null)
        const link = ref(`/country/${props.countryCode}`)

        const getCountryName = async () => {
            try {
                let response = await getCountry(props.countryCode)
                country.value = response
            } catch (error) {
                console.log(error)
            }
        }

        getCountryName()

        return { country, link, getCountryName }
    }
})
</script>

<style lang="scss" scoped>
.country-neighbour {
    text-decoration: none;
    color: inherit;
    &:hover {
        text-decoration: underline;
    }
}
</style>