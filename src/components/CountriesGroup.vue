<template>
    <div class="countries-group">
        <h2 @click="toggleDisplay">{{ groupName }}</h2>
        <div class="cards" v-show="display">
            <Card v-for="(country, index) in countries"
                :key="index"
                :cardTitle="country.name"
                :image="{alt: `Flag of ${country.name}`, img: country.flag}"
            />
        </div>
    </div>
</template>

<script>
import { ref, defineComponent } from "vue"

import Card from "./Card.vue"

export default defineComponent ({
    name: "CountriesGroup",
    components: { Card },
    props: {
        groupName: {type: String, required: true},
        countries: {type: Array, required: true},
    },
    setup () {
        let display = ref(false)

        const toggleDisplay = () => {
            display.value = !display.value
        }

        return { display, toggleDisplay }
    }
})
</script>

<style lang="scss" scoped>
.countries-group {
    > .cards {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    > h2 {
        text-align: center;
    }
}
</style>