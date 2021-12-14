
 <template>
  <view class="m-search"
    :style="{background}">
    <input type="text"
      class="m-search-input"
      :value="txt"
      :placeholder="ph"
      :style="inputStyle" />
  </view>
</template>
<script lang="ts">
import "./index.css"
import type { PropType } from "vue"
import { onMounted, computed, defineComponent, ref } from "vue"

export default defineComponent({
  props: {
    placeholder: { type: String, default: "关键字搜索" },
    background: { type: String, default: "#cccccc" },
    inputBackground: { type: String, default: "#f1f1f1" },
    icon: { type: String, default: "" },
    data: { type: Array as PropType<string[]>, default: () => [] },
  },
  setup(props, ctx) {
    const txt = ref("")
    const ph = ref("")
    const interval = ref()
    function loop() {
      if (props.data && props.data.length) {
        let i = 0
        interval.value = setInterval(() => {
          ph.value = props.data[i % props.data.length]

          i++
        }, 1500)
      } else {
        ph.value = props.placeholder
      }
    }
    onMounted(loop)
    return {
      txt,
      ph,
      loop,
      inputStyle: computed(() => {
        return `background:${props.inputBackground}`
      }),
    }
  },
})
</script>
