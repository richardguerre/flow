// @ts-ignore as these are not in @types/react but are in the runtime
import { jsx as _jsx, jsxs as _jsxs, Fragment } from "react/jsx-runtime";

window.unocssExtracted = new Set<string>();
export const jsx = (type: any, props: any, ...rest: any) => {
  if (props.className && window.unocssExtracted && !window.unocssExtracted.has(props.className)) {
    window.__unocss_runtime?.extract(props.className);
    window.unocssExtracted.add(props.className);
  }
  return _jsx(type, props, ...rest);
};

export const jsxs = (type: any, props: any, ...rest: any) => {
  if (props.className && window.unocssExtracted && !window.unocssExtracted.has(props.className)) {
    window.__unocss_runtime?.extract(props.className);
    window.unocssExtracted.add(props.className);
  }
  return _jsxs(type, props, ...rest);
};

export { Fragment };
