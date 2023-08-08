// @ts-ignore as these are not in @types/react but are in the runtime
import { jsxDEV as _jsxDEV, Fragment } from "react/jsx-dev-runtime";

export const jsxDEV = (type: any, props: any, ...rest: any) => {
  props.className && window.__unocss_runtime?.extract(props.className);
  return _jsxDEV(type, props, ...rest);
};

export { Fragment };
