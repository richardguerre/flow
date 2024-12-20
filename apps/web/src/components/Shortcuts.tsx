import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { graphql, useLazyLoadQuery } from "@flowdev/relay";
import { usePlugins } from "../getPlugin";
import { ShortcutsQuery } from "@flowdev/web/relay/__gen__/ShortcutsQuery.graphql";
import { Mousetrap } from "@flowdev/ui/Shortcut";
import { DayShortcuts } from "./Day";
import { InboxListShortcuts } from "./InboxList";

type FocusedElements = {
  Day: DayShortcuts;
  InboxList: InboxListShortcuts;
  Global: { _id: "Global" };
};
type FocusedElement = FocusedElements[keyof FocusedElements];

type ShortcutHandler = <T extends keyof FocusedElements = keyof FocusedElements>(args: {
  element: FocusedElements[T];
  event: Mousetrap.ExtendedKeyboardEvent;
}) => void;
type Shortcut = { handler: ShortcutHandler };
export type ShortcutTrigger = string | string[];
type Shortcuts = {
  [elementId: string]: {
    [pluginSlugShortcutSlug: string]: Shortcut & {
      pluginSlug: string;
      shortcutSlug: string;
      trigger: ShortcutTrigger;
    };
  };
};
export type PluginShortcuts = {
  [shortcutSlug: string]: Shortcut & { elementId: string; defaultTrigger: ShortcutTrigger };
};

const defaultShortcuts: Shortcuts = {
  Day: {
    "flow-create-task": {
      pluginSlug: "flow",
      shortcutSlug: "create-task",
      trigger: ["c"],
      handler: ({ element }) => {
        if (element._id !== "Day") return;
        element.createVirtualTask({ date: element.date });
      },
    },
  },
  InboxList: {
    "flow-create-item": {
      pluginSlug: "flow",
      shortcutSlug: "create-item",
      trigger: ["c"],
      handler: ({ element }) => {
        if (element._id !== "InboxList") return;
        element.createVirtualItem();
      },
    },
  },
};

export type ShortcutsContext = {
  focusElement: (id: string, element: FocusedElement) => void;
  blurElement: (id: string) => void;
  shortcuts: Shortcuts;
  loading: boolean;
};

const shortcutsContext = createContext<ShortcutsContext>({
  focusElement: () => {},
  blurElement: () => {},
  shortcuts: defaultShortcuts,
  loading: true,
});

export const ShorcutsProvider = (props: { children: React.ReactNode }) => {
  const mousetrap = useMemo(() => new Mousetrap(), []);
  const [loading, setLoading] = useState(true);
  const [shortcuts, setShortcuts] = useState<Shortcuts>(defaultShortcuts);
  const { plugins, pk } = usePlugins();
  const data = useLazyLoadQuery<ShortcutsQuery>(
    graphql`
      query ShortcutsQuery {
        shortcuts {
          edges {
            node {
              slug
              pluginSlug
              elementId
              trigger
              enabled
            }
          }
        }
      }
    `,
    {},
  );

  const focusElement = (id: string, element: FocusedElement) => {
    const shortcutsOfElement = shortcuts[id];
    if (!shortcutsOfElement) return;

    for (const s in shortcutsOfElement) {
      const shortcut = shortcutsOfElement[s];
      mousetrap.bind(shortcut.trigger, (event) => shortcut.handler({ element, event }));
    }
  };

  const blurElement = (id: string) => {
    const shortcutsOfElement = shortcuts[id];
    if (!shortcutsOfElement) return;
    for (const s in shortcutsOfElement) {
      const shortcut = shortcutsOfElement[s];
      mousetrap.unbind(shortcut.trigger);
    }
  };

  useEffect(() => {
    setLoading(true);
    const shortcutSlugToTrigger: Record<string, ShortcutTrigger> = {};
    for (const { node: shortcut } of data.shortcuts.edges) {
      if (!shortcut.enabled) continue;
      shortcutSlugToTrigger[`${shortcut.pluginSlug}-${shortcut.slug}`] = Array.from(
        shortcut.trigger,
      );
    }

    const updatedShortcuts: Shortcuts = defaultShortcuts;
    for (const pluginSlug in plugins) {
      const plugin = plugins[pluginSlug];
      if (!plugin.shortcuts) continue;
      for (const shortcutSlug in plugin.shortcuts) {
        const shortcut = plugin.shortcuts[shortcutSlug];
        const trigger =
          shortcutSlugToTrigger[`${pluginSlug}-${shortcutSlug}`] ?? shortcut.defaultTrigger;
        const prevShortcuts = updatedShortcuts[shortcut.elementId];
        updatedShortcuts[shortcut.elementId] = {
          ...(prevShortcuts ?? {}),
          [`${pluginSlug}-${shortcutSlug}`]: {
            pluginSlug,
            shortcutSlug,
            trigger,
            handler: shortcut.handler,
          },
        };
      }
    }
    setShortcuts(updatedShortcuts);
    setLoading(false);
  }, [data.shortcuts.edges, pk]);

  return (
    <shortcutsContext.Provider value={{ focusElement, blurElement, shortcuts, loading }}>
      {props.children}
    </shortcutsContext.Provider>
  );
};

export const useShortcutsContext = () => useContext(shortcutsContext);

export const useShortcutsOnHover = (id: string, element: FocusedElement) => {
  const context = useShortcutsContext();
  const ref = useRef<any>(null);

  useEffect(() => {
    const htmlRef = ref.current as HTMLElement;
    if (ref.current) {
      htmlRef.addEventListener?.("mouseover", () => context.focusElement(id, element));
      htmlRef.addEventListener?.("mouseout", () => context.blurElement(id));
    }

    return () => {
      htmlRef.removeEventListener?.("mouseover", () => {});
      htmlRef.removeEventListener?.("mouseout", () => {});
    };
  }, []);

  return { ref };
};

export const useShortcutsOnFocus = (id: string, element: FocusedElement) => {
  const context = useShortcutsContext();
  const ref = useRef<any>(null);

  useEffect(() => {
    const htmlRef = ref.current as HTMLElement;
    if (ref.current) {
      htmlRef.addEventListener?.("focus", () => context.focusElement(id, element));
      htmlRef.addEventListener?.("blur", () => context.blurElement(id));
    }

    return () => {
      htmlRef.removeEventListener?.("focus", () => {});
      htmlRef.removeEventListener?.("blur", () => {});
    };
  }, []);

  return { ref };
};

export const useIsPressing = (trigger: "Alt" | (string & {})) => {
  const [isPressingShortcut, setIsPressingShortcut] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === trigger) {
        setIsPressingShortcut(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === trigger) {
        setIsPressingShortcut(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [trigger]);

  return isPressingShortcut;
};
