<template>
    <el-col :xs="24" :sm="11" class="country-property">
        <el-row align="middle">
            <el-col :xs="12" :sm="24" class="name">{{ name }}</el-col>
            <el-col :xs="12" :sm="24" class="contents"><slot></slot></el-col>
        </el-row>
    </el-col>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "CountryProperty",
    props: {
        name: { type: String, required: true }
    },
    setup () {
        

        return {}
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