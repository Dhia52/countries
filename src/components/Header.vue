<template>
    <header>
        <router-link to="/" class="router-link">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GDJ-World-Flags-Globe.svg" alt="World flags globe" />
            <span id="website-name">Countries</span>
        </router-link>
        <ToggleButton :on="activeDarkTheme" @click="toggleDarkTheme">
            <template #on-icon>🌙</template>
            <template #off-icon>☀️</template>
        </ToggleButton>
    </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '../store';

import ToggleButton from './ToggleButton.vue';

export default defineComponent({
    name: "Header",
    components: { ToggleButton },
    setup() {
        const store = useStore();

        const activeDarkTheme = computed(() => store.state.darkTheme ? true : false)
        const toggleDarkTheme = () => store.commit('TOGGLE_DARK_THEME');

        return { activeDarkTheme, toggleDarkTheme }
    }
})

</script>

<style scoped lang="scss">

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #42b883;
    grid-column: 1 / span 12;
    
    >.router-link {
        display: flex;
        align-items: center;
        text-decoration: none;

        >img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }

        >#website-name {
            color: white;
            font-size: 20pt;
            font-weight: 800;
        }
    }
}
</style>