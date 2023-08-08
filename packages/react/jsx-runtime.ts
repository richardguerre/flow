// @ts-ignore as these are not in @types/react but are in the runtime
import { jsx as _jsx, jsxs as _jsxs, Fragment } from "react/jsx-runtime";

export const jsx = (type: any, props: any, ...rest: any) => {
  props.className && window.__unocss_runtime?.extract(props.className);
  return _jsx(type, props, ...rest);
};

export const jsxs = (type: any, props: any, ...rest: any) => {
  props.className && window.__unocss_runtime?.extract(props.className);
  return _jsxs(type, props, ...rest);
};

export { Fragment };
