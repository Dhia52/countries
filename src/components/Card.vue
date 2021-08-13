<template>
    <router-link :to="cardLink">
        <div class="card">
            <h3>{{ content.name }}</h3>
            <img :alt="image.alt" :src="image.src" />
        </div>
    </router-link>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue"

import { Country } from '../types/Country'
import { Continent } from '../types/Continent'

export default defineComponent({
    name: "Card",
    props: {
        content: { type: Object as PropType<Country | Continent> , required: true }
    },
    setup(props) {
        const cardLink = computed(() => {
            if ( "code" in props.content ) {
                return `/region/${props.content.code}`
            }
            return `/country/${props.content.alpha3Code}`
        })

        const image = computed(() => {
            if ( "flag" in props.content ) {
                return { alt: `Flag of ${props.content.name}`, src: props.content.flag }
            }
            return { alt: props.content.name, src: props.content.img }
        })

        return { cardLink, image }
    }
})
</script>

<style lang="scss" scoped>
.card {
    width: 250px;
    background-color: grey;
    margin: 5px 5px;
    padding: 0px 5px 5px 5px;
    border-color: grey;
    border-width: 2px;
    border-style: solid;
    border-radius: 10px;
    text-align: center;
    > h3 {
        color: unset;
        text-decoration: unset;
    }
    > img {
        width: 100%;
    }

}
</style>