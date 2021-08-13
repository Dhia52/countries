<template>
    <router-link :to="link">
        <div class="neighbour-country">
                {{ countryName }}
        </div>
    </router-link>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

import { getCountry } from '../services/CountriesService'

export default defineComponent({
    name: 'CountryLink',
    props: {
        countryCode: { type: String, required: true }
    },
    setup (props) {
        const countryName = ref('Country')
        const link = ref(`/country/${props.countryCode}`)

        const getCountryName = async () => {
            try {
                let country = await getCountry(props.countryCode)
                countryName.value = country.name.toString()
            } catch (error) {
                console.log(error)
            }
        }

        getCountryName()

        return { countryName, link, getCountryName }
    }
})
</script>

<style lang="scss" scoped>

</style>