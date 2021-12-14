
<script lang="ts">
import { ref, onMounted } from "vue"
import Taro from "@tarojs/taro"
import { useDidShow } from "@tarojs/taro"
import "./index.css"
//组件可全局引入。此处只是测试
import MSearch from "../../components/common/MSearch/index.vue"
import MPage from "../../components/common/MPage/index.vue"
import MGoods from "../../components/common/MGoods/index.vue"
import MTxt from "../../components/common/MTxt"
import compiler from "../../compiler"

export default {
  components: {
    MSearch,
    MPage,
    MGoods,
    MTxt,
    // MSearch: defineAsyncComponent(() =>
    //   import("../../components/common/MSearch/index.vue")
    // ),
  },
  setup() {
    // console.log(useDidShow)
    // useDidShow(() => {
    //   console.log("onShow 了")
    // })
    const currentInstance = Taro.getCurrentInstance()
    console.log(currentInstance)

    const pageComponents = ref({})
    onMounted(() => {
      console.log(currentInstance, currentInstance.router?.params)
      pageComponents.value = {
        componentName: "MPage",
        options: {
          style: {
            background: "#e1e1e1",
          },
        },
        children: {
          default: [
            {
              componentName: "MTxt",
              name: "标题/文本",
              options: {
                content: "商品详情",
                style: {
                  "font-size": "28px",
                  "font-weight": "bold",
                  padding: "10px 15px",
                  marginBottom: "0",
                  textAlign: "center",
                },
              },
            },
          ],
        },
      }
    })
    return () => compiler(pageComponents.value)
  },
}
</script>
