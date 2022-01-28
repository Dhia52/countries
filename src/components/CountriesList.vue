<template>
    <div class="countries-list grid-container">
        <h2>Search by country name</h2>
        <div class="alphabet">
            <span class="letter" v-for="([letter]) in sortedCountries" :key="letter" @click="selectGroup(letter)">
                {{ letter }}
            </span>
        </div>
        <CardsGroup v-if="selectedGroup" :countriesCards="selectedGroup" />
        <div v-else class="click-prompt">Please, select a letter above.</div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from 'vue'

import CardsGroup from '../components/CardsGroup.vue'

import { CountryCard } from '../types/CountryCard'

import { sortCountries } from '../functions/SortCountries'

export default defineComponent({
    components: { CardsGroup },
    props: {
        countries: { type: Array as PropType<CountryCard[]>, required: true }
    },
    setup (props) {
        const sortedCountries = ref(sortCountries(props.countries))
        const selectedGroup = ref<null | CountryCard[]>(null)
        
        function selectGroup (letter: string) {
            selectedGroup.value = sortedCountries.value.get(letter)
        }
        
        return { sortedCountries, selectedGroup, selectGroup }
    }
})
</script>

<style lang="scss" scoped>
h2 {
    text-align: center;
    grid-column: 1 / span 12;
}

.alphabet {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    grid-column: 1 / span 12;
    margin-bottom: 20px;

    > .letter {
        padding: 0 10px;
        font-weight: bold;
        font-size: 14pt;
        cursor: pointer;
    }
}

.click-prompt {
    grid-column: 1 / span 12;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    text-align: center;
    font-weight: 600;
    font-size: 1.5em;
}
</style>