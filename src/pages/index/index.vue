<script lang="ts">
import { ref, onMounted } from "vue";
import "./index.css";
//组件可全局引入。此处只是测试
import MSearch from "../../components/common/MSearch/index.vue";
import MPage from "../../components/common/MPage/index.vue";
import MGoods from "../../components/common/MGoods/index.vue";
import MTxt from "../../components/common/MTxt";
import compiler from "../../compiler";
export default {
  components: {
    MSearch,
    MPage,
    MGoods,
    MTxt
    // MSearch: defineAsyncComponent(() =>
    //   import("../../components/common/MSearch/index.vue")
    // ),
  },
  setup() {
    const pageComponents = ref({});

    onMounted(() => {
      pageComponents.value = {
        componentName: "MPage",
        options: {
          style: {
            background: "#e1e1e1"
          }
        },
        children: {
          //其实是插槽，default是默认插槽
          header: {
            componentId: "1",
            componentName: "MSearch",
            icon: "w-icon-add",
            name: "搜索",
            options: {
              placeholder: "开始搜索吧",
              background: "white",
              inputBackground: "#ccc"
            },
            data: ["婴幼儿奶粉", "奶嘴", "尿不湿"],
            children: {}
          },

          default: [
            {
              componentName: "MTxt",
              name: "标题/文本",
              options: {
                content: "商品列表",
                style: {
                  "font-size": "28px",
                  "font-weight": "bold",
                  padding: "10px 15px",
                  marginBottom: "0",
                  textAlign: "center"
                }
              }
            },
            {
              componentId: "1",
              componentName: "MGoods",
              name: "搜索",
              options: {
                api: "/goods/list",
                navigateTo: "/pages/goods-preview/index"
              },

              children: {}
            }
          ]
        }
      };
    });
    return () => compiler(pageComponents.value);
  }
};
</script>
