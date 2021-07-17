<template>
    <div class="card">
        <!-- <h4>{{ cardTitle }}</h4>
        <img :alt="image.alt" :src="image.img" /> -->
        Hello !
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "Card",
    // props: {
    //     cardTitle: { type: String, required: true },
    //     image: { type: Object, required: true }
    // }
})
</script>

<style scoped>
.card {
    background-color: grey;
}

</style>