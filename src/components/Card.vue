<template>
    <router-link :to="cardLink">
        <div class="card">
            <h3>{{ cardTitle }}</h3>
            <img :alt="image.alt" :src="image.img" />
        </div>
    </router-link>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

export default defineComponent({
    name: "Card",
    props: {
        cardTitle: { type: String, required: true },
        image: { type: Object, required: true },
        linkType: { type: String, required: true}
    },
    setup(props) {
        const cardLink = computed(() => `/${props.linkType}/${props.cardTitle.toLowerCase()}`)

        return { cardLink }
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