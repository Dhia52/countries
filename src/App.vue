<template>
  <div id="container" class="grid-container" :class="dark">
    <Header />
    <div id="page-content" class="grid-container">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent, computed } from 'vue';
  import { useStore } from './store/index';

  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';

  export default defineComponent({
    name: "App",
    components: { Header, Footer },
    setup() {
      const store = useStore();

      const dark = computed(() => store.state.darkTheme ? "dark" : "");
      const isLoading = computed(() => store.state.isLoading);

      return { isLoading, dark };
    }
  })
</script>

<style lang="scss">
body {
  margin: 0;

  > #app {
    
    > #container {
      width: 100%;
      min-height: 100vh;
      display: grid;
      box-sizing: border-box;
      grid-template-rows: 70px auto 70px;

      * {
        box-sizing: border-box;
      }
      
      > * {
        padding: 8px;
      }

      > #page-content {
        grid-column: 1 / span 12;
      }


      &.dark {
        background-color: black;
        color: white;
      }
    }
  }
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 100%;
}
</style>