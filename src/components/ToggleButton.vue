<template>
    <div class="switch" :class="onOffClass" @click="toggle">
        <span><slot name="on-icon"></slot></span>
        <span><slot name="off-icon"></slot></span>
        <div class="slider"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
    name: "ToggleButton",
    props: {
        on: { type: Boolean, default: false}
    },
    setup (props) {
        const onOff = ref(props.on);

        const onOffClass = computed(() => onOff.value ? "on" : "off");

        const toggle = () => { onOff.value = !onOff.value; }

        return { onOff, onOffClass, toggle }
    }
})
</script>

<style scoped lang="scss">
.switch{
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 25px;
    position: relative;
    height: 34px;
    width: 60px;
    cursor: pointer;

    &.off {
        background-color: white;
        color: black;
    }

    &.on {
        background-color: black;
        color: white;
        >.slider {
            transform: translateX(100%);
        }
    }

    >.slider {
        position: absolute;
        width: 50%;
        height: 90%;
        transition: .4s;
        border-radius: 50%;
        background-color: #ccc;
        left: 0;
    }
}
</style>