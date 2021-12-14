<template>
  <view :class="css.mPage"
    :style="pageStyle">
    <view :class="css.mHeader"
      v-if="$slots.header">
      <slot name="header" />
    </view>
    <view :class="css.pageContent">
      <slot />
    </view>
    <view :class="css.mSupport"><text>链多多提供技术支持</text></view>
  </view>
</template>
<script lang="ts">
import css from "./index.module.css"
import { defineComponent, ref, computed } from "vue"
export default defineComponent({
  props: {
    style: { type: Object, default: () => ({}) },
  },
  setup(props, ctx) {
    return {
      pageStyle: computed(() => {
        return props.style
      }),
      css,
    }
  },
})
</script>