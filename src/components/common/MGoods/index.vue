<template>
  <view class="mGoods">
    <view class="mGoodsItem"
      v-for="(item,index) in data"
      :key="index">
      <view>

        <image mode="scaleToFill"
          style="width: 100%;height: 200px;background-color:#fff;" />
      </view>
      <text>{{item.name}}</text>
    </view>
  </view>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
export default defineComponent({
  props: {
    api: { type: String, default: "" },
    //其他参数略
  },
  setup(props, ctx) {
    const data = ref<Record<any, any>>([])
    onMounted(() => {
      //数据请求，请求的api地址可以写在组件的说明里，传入api即可
      console.log("你传入的api地址是：", props.api)
      data.value = [
        {
          name: "爱他美奶粉1罐",
          price: "￥300",
        },
        {
          name: "某某某奶粉",
          price: "￥200",
        },
        {
          name: "奶嘴",
          price: "￥50",
        },
      ]
    })
    return {
      data,
    }
  },
})
</script>

<style >
.mGoods {
  display: flex;
  justify-content: space-between;
  margin: 15px 30px;
  flex-wrap: wrap;
}
.mGoods .mGoodsItem {
  width: calc((100% - 3px -60px) / 2);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  border-radius: 10px;
}
</style>