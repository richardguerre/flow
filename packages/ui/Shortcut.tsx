import { HTMLAttributes, useEffect } from "react";
import { tw } from "./tw";
import Mousetrap from "mousetrap";

export { Mousetrap };

const mousetrap = new Mousetrap();

function isMac() {
  const platform =
    navigator.platform ?? (navigator as any)["userAgentData"]?.platform ?? navigator.userAgent;
  return /mac/i.test(platform);
}

const macKeysMap = {
  meta: "⌘",
  mod: "⌘",
  ctrl: "⌃",
  alt: "⌥",
  shift: "shift",
};

const windowsKeysMap: Record<keyof typeof macKeysMap, string> = {
  meta: "Ctrl",
  mod: "◆",
  ctrl: "Ctrl",
  alt: "Alt",
  shift: "Shift",
};

export const Shortcut = (
  props: Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
    /** Whether the shortcuts should be enabled when focus is on an input-like element. */
    includeInputs?: boolean;
    children: string;
    onTrigger?: (e: Mousetrap.ExtendedKeyboardEvent, combo: string) => void;
  },
) => {
  const mac = isMac();
  const keysMap = mac ? macKeysMap : windowsKeysMap;
  const childrenTranslated = props.children
    .replace(/(mod|ctrl|alt|shift)/g, (match) => {
      return keysMap[match as keyof typeof keysMap];
    })
    .replace(/\+/g, " + ");
  mousetrap.stopCallback = (e, element) => {
    const includeInputs = typeof props?.includeInputs === "undefined" || props.includeInputs;
    return !includeInputs; // when true, we don't want to stop the callback
  };

  useEffect(() => {
    mousetrap.bind(props.children, (e, combo) => {
      props.onTrigger?.(e, combo);
    });

    return () => {
      mousetrap.unbind(props.children);
    };
  }, [props.children, props.onTrigger]);

  return (
    <span {...props} className={tw("text-foreground-600 text-xs tracking-widest", props.className)}>
      {childrenTranslated}
    </span>
  );
};
