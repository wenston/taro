<template>
  <view :class="css.mGoods">
    <view :class="css.mGoodsItem"
      v-for="(item,index) in data"
      :key="index"
      @tap="goto(item)">
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
import Taro from "@tarojs/taro"
import css from "./index.module.css"
export default defineComponent({
  props: {
    api: { type: String, default: "" },
    navigateTo: { type: String, default: "" },
    //其他参数略
  },
  setup(props) {
    const data = ref<Record<any, any>>([])
    onMounted(() => {
      //数据请求，请求的api地址可以写在组件的说明里，传入api即可
      console.log("你传入的api地址是：", props.api)
      data.value = [
        {
          name: "爱他美奶粉1罐",
          price: "￥300",
          proId: "1123",
        },
        {
          name: "某某某奶粉",
          price: "￥200",
          proId: "2301",
        },
        {
          name: "奶嘴",
          price: "￥50",
          proId: "2190",
        },
      ]
    })
    return {
      data,
      css,
      goto: (item: Record<string, any>) => {
        if (props.navigateTo) {
          Taro.navigateTo({ url: `${props.navigateTo}?proId=${item.proId}` })
        }
      },
    }
  },
})
</script>
