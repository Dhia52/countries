<template>
    <Card :cardTitle="cardTitle" :image="image" />
</template>

<script lang="ts">
import { defineComponent } from "vue"

import Card from "../components/Card.vue"

import Africa from "../assets/images/continents/africa.svg"

export default defineComponent ({
    name: "Home",

    setup() {
        const cardTitle = "Africa"
        const image = { alt: "African Continent", img: Africa }

        return { cardTitle, image }
    }
})
</script>

<style scoped>

</style>