<template>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
    setup () {
        const drawer = ref<boolean>(false)

        return { drawer }
    }
})
</script>

<style lang="scss" scoped>

</style>