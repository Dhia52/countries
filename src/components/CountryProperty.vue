<template>
    <div class="name">{{ name }}</div>
    <div class="contents"><slot></slot></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "CountryProperty",
    props: {
        name: { type: String, required: true }
    }
})
</script>

<style lang="scss" scoped>
.country-property {
    padding: 10px 2px;
    margin: 1px 1px;
    border: 2px solid #1a1a1a;

    .name {
        font-weight: bold;
        font-size: 1.17em;
    }
}
</style>