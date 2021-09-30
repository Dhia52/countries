<template>
    <router-link :to="cardLink" class="link-card">
        <div class="card">
            <h3>{{ country.name.common }}</h3>
            <img :alt="flagAlt" :src="country.flags.svg" />
        </div>
    </router-link>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue"

import { CountryCard } from '../types/CountryCard'

export default defineComponent({
    name: "Card",
    props: {
        country: { type: Object as PropType<CountryCard>, required: true }
    },
    setup(props) {
        const cardLink = computed(() => `/country/${props.country.cca3.toLowerCase()}`)
        const flagAlt = computed(() => `Flag of ${props.country.name.common}`)

        return { cardLink, flagAlt }
    }
})
</script>

<style lang="scss" scoped>
.link-card {
    // color: white;
    text-decoration: none;

    >.card {
        width: 200px;
        max-width: 100%;
        background-color: rgba(0, 0, 0, 0.05);
        margin: 5px 5px;
        padding: 0px 5px 5px 5px;
        border-color: grey;
        border-width: 2px;
        border-style: solid;
        border-radius: 10px;
        text-align: center;

        >h3 {
            height: 2.5em;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        > img {
            width: 100%;
            height: 100px;
            object-fit: contain;
        }
        
    }
}
</style>