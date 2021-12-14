<template>
  <view class="mPage"
    :style="pageStyle">
    <view class="mHeader"
      v-if="$slots.header">
      <slot name="header" />
    </view>
    <view class="pageContent">
      <slot />
    </view>
    <view class="mSupport"><text>链多多提供技术支持</text></view>
  </view>
</template>
<script lang="ts">
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
    }
  },
})
</script>
<style module="css">
.mPage {
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}
.pageContent {
  flex: 1;
}
.mSupport {
  font-size: 20px;
  color: #aaa;
  padding: 30px;
  display: flex;
  justify-content: center;
}
</style>