<template>
  <el-container>
    <el-header>
      <el-menu mode="horizontal">
        <el-menu-item>
          <router-link to="/">
            <el-avatar
              alt="World flags globe"
              src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GDJ-World-Flags-Globe.svg"
              size="large"
              fit="fill"
            >
            </el-avatar>
            Countries
          </router-link>
        </el-menu-item>
        <!-- <el-menu-item>
          <el-icon :size="20" color="#FFFFFF">
            <sunny />
          </el-icon>
          <el-switch v-model="darkMode" active-color="#FFFFFF" inactive-color="#000000"></el-switch>
          <el-icon :size="20" color="#FFFFFF">
            <moon />
          </el-icon>
        </el-menu-item> -->
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
      <!-- <router-view
        v-loading.fullscreen.lock="isLoading"
        element-loading-text="Loading. Please wait..."
        element-loading-background="#000000"
      ></router-view> -->
    </el-main>
    <el-footer>©{{ currentYear }}</el-footer>
  </el-container>
</template>

<script lang="ts">
  import { ref, defineComponent, computed } from 'vue'
  import { useStore } from './store/index'

  export default defineComponent({
    name: "App",
    setup() {
      const store = useStore()
      const currentYear = ref(new Date().getFullYear())

      const darkMode = ref(true)

      const isLoading = computed(() => store.state.isLoading)

      return { currentYear, isLoading, darkMode }
    }
  })

</script>

<style lang="scss">
.el-container {
  min-height: 100vh;
}
</style>