<template>
    <div class="countries-list">
        <h2>Search by country name</h2>
        <button type="text" v-for="([letter]) in sortedCountries" :key="letter" @click="selectGroup(letter)">
            {{ letter }}
        </button>
    </div>
    <!-- <el-container>
        <el-header height="auto">
        </el-header>
        <el-main>
            <el-row justify="center">
                <el-button type="text" v-for="([letter]) in sortedCountries" :key="letter" @click="selectGroup(letter)">
                    {{ letter }}
                </el-button>
            </el-row>
            <CardsGroup v-if="selectedGroup" :countriesCards="selectedGroup" />
            <el-row v-else class="click-prompt" justify="center" align="middle">Please, click on a letter above.</el-row>
        </el-main>
    </el-container> -->
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
}

.click-prompt {
    height: 200px;
    text-align: center;
    font-weight: 600;
    font-size: 1.5em;
}
</style>