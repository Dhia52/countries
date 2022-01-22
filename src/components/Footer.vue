<template>
    <footer>
        ©{{ currentYear }}
    </footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'Footer',
    setup() {
        const currentYear = ref(new Date().getFullYear())

        return { currentYear }
    }
})

</script>

<style scoped lang="scss">
footer {
    grid-column: 1 / span 12;
}
</style>