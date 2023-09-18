import React from "react";
import { Button } from "@flowdev/ui/Button";
import * as framerMotion from "framer-motion";
import * as tiptap from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Document } from "@tiptap/extension-document";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";
import { Mention } from "@tiptap/extension-mention";
import { History } from "@tiptap/extension-history";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { ListItem } from "@tiptap/extension-list-item";
import { dayjs } from "@flowdev/web/dayjs";
import { getDays, getDaysMax10 } from "./getDays";
import { NoteEditor } from "../components/NoteEditor";
import { Day, DayContent } from "../components/Day";
import { CardActionButton, TaskCard } from "../components/TaskCard";
import { ItemCard } from "../components/ItemCard";
import { Lists } from "../components/Lists";
import { useAsyncLoader } from "../useAsyncLoader";
import { useDebounce } from "../useDebounce";
import { useAsyncEffect } from "../useAsyncEffect";
import { createItem } from "./createItem";
import { createTask } from "./createTask";
import { getStoreUtils } from "./getStoreUtils";
import { getPluginOperationUtils } from "./pluginOperation";
import { FormInput } from "@flowdev/ui/FormInput";
import { FormSelect } from "@flowdev/ui/FormSelect";
import { Input } from "@flowdev/ui/Input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "@flowdev/ui/DropdownMenu";
import { useForm, Controller } from "react-hook-form";
import { tw } from "@flowdev/ui/tw";
import { Badge } from "@flowdev/ui/Badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@flowdev/ui/Select";

export const getPluginOptions = (slug: string) => ({
  /** The plugin's slug. There is no difference with the one passed into `definePlugin`. It can be used to not repeat it throughout the plugin's code. */
  pluginSlug: slug,
  /**
   * React version that Flow uses.
   */
  React: {
    ...React,
    createElement: (type: any, props: any, ...rest: any) => {
      if (!("unocssExtracted" in window) || !window.unocssExtracted) {
        window.unocssExtracted = new Set<string>();
      }
      if (props?.className && !window.unocssExtracted?.has(props.className)) {
        window.__unocss_runtime?.extract(props.className);
        window.unocssExtracted?.add(props.className);
      }
      return React.createElement(type, props, ...rest);
    },
  },
  /** The tailwind merge function that Flow uses. It's the same as clsx. */
  tw,
  /**
   * Components that Flow uses you can re-use in your plugin views to feel more integrated.
   *
   * Some components will change appearance depending on the theme the user chooses.
   */
  components: {
    Button,
    NoteEditor,
    /**
     * Shows a Day along with actions to create tasks within the day.
     * If you just want to render the day's content (i.e. it's tasks),
     * use `DayContent` instead.
     */
    Day,
    /**
     * Shows a Day's content (i.e. it's tasks) with no actions to create tasks.
     * If you want to render the day along with actions to create tasks within the day,
     * use `Day` instead.
     */
    DayContent,
    TaskCard,
    ItemCard,
    Lists,
    Input,
    FormInput,
    FormSelect,
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    DropdownMenu,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuRadioGroup,
    DropdownMenuTrigger,
    DropdownMenuSubContent,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    Badge,
    CardActionButton,
  },
  hooks: {
    /**
     * This hook is useful to do an async process on initial load.
     */
    useAsyncLoader,
    /**
     * This hook is useful to debounce a value.
     */
    useDebounce,
    /**
     * This hook is useful to do async operations in a useEffect.
     */
    useAsyncEffect,
  },
  /**
   * Utilities for interacting with the store.
   */
  store: getStoreUtils(slug),
  /**
   * Utilities to interact with the plugin's server API.
   */
  operations: getPluginOperationUtils(slug),
  /**
   * Get days between 2 dates (inclusive) by passing `from` and `to` as part of the options.
   * If you want to get specific/discreate days, use `getDaysMax10` instead.
   */
  getDays,
  /**
   * Get specific/discrete days by passing an array of Date objects (maximum 10).
   * If you want to get more than 10 days, use `getDays` instead or make multiple calls to `getDaysMax10`.
   * If you want to get a range of days (i.e. get all days between 2 dates), use `getDays` instead.
   */
  getDaysMax10,
  /**
   * Create an item and pluginDatas that should be linked to the item.
   */
  createItem,
  /**
   * Create a task.
   */
  createTask,
  /**
   * The framer-motion package.
   * This prevents double-bundling it in both the web app and in individual plugins.
   */
  framerMotion,
  /**
   * The @tiptap/react package.
   * This prevents double bundling it in both the web app and in individual plugins.
   *
   * You can also use the TextEditor component in `options.components`.
   */
  tiptap,
  /**
   * The tiptap extensions. Using these extensions in plugins prevents double bundling them.
   *
   * If this object is missing an extension you need, you will have to npm install it in your plugin.
   */
  tiptapExtensions: {
    StarterKit,
    Document,
    Paragraph,
    Text,
    Mention,
    History,
    BulletList,
    OrderedList,
    ListItem,
  },
  /**
   * The dayjs package. This prevents double bundling it in both the web app and in individual plugins.
   */
  dayjs,
  /** The react-hook-form package. This prevents double bundling it in both the web app and in individual plugins. */
  reactHookForm: {
    useForm,
    Controller,
  },
});

export type WebPluginOptions = ReturnType<typeof getPluginOptions>;
