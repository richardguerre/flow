// @ts-ignore as these are not in @types/react but are in the runtime
import { jsxDEV as _jsxDEV, Fragment } from "react/jsx-dev-runtime";

window.unocssExtracted = new Set<string>();
export const jsxDEV = (type: any, props: any, ...rest: any) => {
  if (props.className && window.unocssExtracted && !window.unocssExtracted.has(props.className)) {
    window.__unocss_runtime?.extract(props.className);
    window.unocssExtracted.add(props.className);
  }
  return _jsxDEV(type, props, ...rest);
};

export { Fragment };
