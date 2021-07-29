<template>
    <div class="card">
        <h3>{{ cardTitle }}</h3>
        <img :alt="image.alt" :src="image.img" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "Card",
    props: {
        cardTitle: { type: String, required: true },
        image: { type: Object, required: true }
    }
})
</script>

<style lang="scss" scoped>
.card {
    width: 250px;
    background-color: grey;
    margin: 10px 10px;
    border-color: grey;
    border-width: 2px;
    border-style: solid;
    border-radius: 10px;
    text-align: center;
    img {
        width: 100%;
    }

}
</style>