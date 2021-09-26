<template>
    <el-row v-if="countries">
        <el-button v-for="([letter]) in countries" :key="letter">{{ letter }}</el-button>
    </el-row>
    <el-row>
    </el-row>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

import { CountryCard } from '../types/CountryCard'

export default defineComponent({
    props: {
        countries: { type: Map, required: true }
    },
    setup (props) {
        const countriesCards = ref<CountryCard[]>([])
        
        function displayCards (letter: string) {
            // countriesCards.value = props.countries.get(letter)
        }
        return { countriesCards, displayCards }
    }
})
</script>

<style scoped>

</style>