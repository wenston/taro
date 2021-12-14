import type { PropType } from "vue";
import { defineComponent, computed } from "vue";
import css from "./index.module.css";
export default defineComponent({
  props: {
    content: String,
    style: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
  },
  setup(props) {
    const options = computed(() => {
      return {
        style: props.style,
        class: [css.mTxt],
      };
    });
    return () => {
      return (
        <view {...options.value}>
          <text>{props.content}</text>
        </view>
      );
    };
  },
});
