import Taro from "@tarojs/taro";
import { createVNode, resolveComponent } from "vue";
const isArray = (v: any) => Array.isArray(v);
const isObject = (v: any) => Object.prototype.toString.call(v);

function transform_inline_px(style: Record<string, any>): object {
  let s = JSON.stringify(style);
  let p = /\d+px/g;
  let e = s.match(p);
  let p1 = /\d+/;
  if (e) {
    e.forEach((item) => {
      if (item) {
        let d: any = item.match(p1);
        s = s.replace(item, Taro.pxTransform(d[0]));
      }
    });
  }
  return JSON.parse(s);
}
function createOptions(component) {
  return { ...component.options, data: component.data };
}

function createChildren(component, compiler) {
  const slots: Record<string, any> = {};

  for (const slot in component.children) {
    if (isArray(component.children[slot])) {
      slots[slot] = () => component.children[slot].map((c) => compiler(c));
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

  if (component.options) {
    if (Object.keys(component.options).length) {
      component.options = transform_inline_px(component.options);
    }
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
      createOptions(component),
      createChildren(component, compiler)
    );
  } else if (component.children) {
    return createChildren(component, compiler);
  }
}
