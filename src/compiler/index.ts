import Taro from "@tarojs/taro";
import { createVNode, resolveComponent } from "vue";
const isArray = (v: any) => Array.isArray(v);
const isObject = (v: any) => Object.prototype.toString.call(v);

//对内联样式进行转换
function transform_inline_px(
  style: Record<string, any>
): Record<string, any> | null | undefined {
  if (style) {
    const s = style && isObject(style) ? { ...style } : null;
    for (const prop in s) {
      let v = s[prop];
      if (typeof v === "string") {
        let pxs: string[] | null = v.match(/\d+px/g);
        if (pxs && pxs.length) {
          pxs.forEach(px => {
            const result = Taro.pxTransform(parseFloat(px));
            const reg = new RegExp(px, "g");
            v = v.replace(reg, result);
          });
        }
      }
      s[prop] = v;
    }
    return s;
  }
}

function createOptions(component) {
  let style: Record<string, any> | undefined | null;
  if ("options" in component) {
    if ("style" in component.options) {
      style = transform_inline_px(component.options.style);
    }
  }
  if (style) {
    return { ...component.options, style, data: component.data };
  }
  return { ...component.options, data: component.data };
}

function createChildren(component, compiler) {
  const slots: Record<string, any> = {};

  for (const slot in component.children) {
    if (isArray(component.children[slot])) {
      slots[slot] = () => component.children[slot].map(c => compiler(c));
    } else if (isObject(component.children[slot])) {
      slots[slot] = () => compiler(component.children[slot]);
    } else {
      slot["default"] = () => component.children[slot];
    }
  }
  return slots;
}

export default function compiler(component: Record<string, any>) {
  if (!component) {
    return null;
  }
  if (!component.componentName && !component.children) {
    return null;
  }
  if (component.componentName && component.children) {
    return createVNode(
      resolveComponent(component.componentName),
      createOptions(component),
      createChildren(component, compiler)
    );
  } else if (component.componentName) {
    return createVNode(
      resolveComponent(component.componentName),
      createOptions(component)
      // createChildren(component, compiler)
    );
  } else if (component.children) {
    return createChildren(component, compiler);
  }
}
