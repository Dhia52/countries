<template>
    <el-row class="cards-group" justify="center">
        <Card v-for="countryCard in countriesCards"
            :key="countryCard.cca3"
            :country="countryCard"
        />
    </el-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"

import Card from "./Card.vue"

import { CountryCard } from '../types/CountryCard'

export default defineComponent ({
    name: "CardsGroup",
    components: { Card },
    props: {
        countriesCards: { type: Array as PropType<CountryCard[]>, required: true }
    }
})
</script>

<style lang="scss" scoped>
.cards-group {
    margin: 0 10px;
    flex-wrap: wrap;
}
</style>