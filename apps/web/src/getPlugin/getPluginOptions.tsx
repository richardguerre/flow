import React from "react";
import { Button } from "@flowdev/ui/Button";
import * as framerMotion from "framer-motion";
import * as tiptap from "@flowdev/tiptap";
import { dayjs } from "@flowdev/web/dayjs";
import { getDays, getDaysMax10 } from "./getDays";
import { NoteEditor } from "../components/NoteEditor";
import { Day, DayContent } from "../components/Day";
import { CardActionButton, TaskCard, TaskDurationButtonDropdown } from "../components/TaskCard";
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
import {
  useForm,
  Controller,
  useFormContext,
  useController,
  useFieldArray,
  useFormState,
  useWatch,
} from "react-hook-form";
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
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxSelected,
  ComboboxTrigger,
  ComboboxValue,
} from "@flowdev/ui/Combobox";
import { FormCombobox } from "@flowdev/ui/FormCombobox";
import { FormCheckbox } from "@flowdev/ui/FormCheckbox";
import { Checkbox, CheckboxWithLabel } from "@flowdev/ui/Checkbox";
import { ErrorBoundary } from "@flowdev/error-boundary";
import { toast } from "@flowdev/ui/Toast";
import { Textarea } from "@flowdev/ui/Textarea";
import { FormTextarea } from "@flowdev/ui/FormTextarea";
import { TaskTitleInput } from "../components/TaskTitle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@flowdev/ui/Tooltip";

export const getPluginOptions = (slug: string) => ({
  /**
   * The server's origin when working locally. In production, this is an empty string as the server is on the same origin as the web app.
   * @example "http://localhost:4000"
   * @example ""
   */
  serverOrigin: import.meta.env.PROD ? "" : "http://localhost:4000",
  /** The plugin's slug. There is no difference with the one passed into `definePlugin`. It can be used to not repeat it throughout the plugin's code. */
  pluginSlug: slug,
  /**
   * React version that Flow uses.
   */
  React,
  /** The tailwind merge function that Flow uses. It's the same as clsx and cn. */
  tw,
  /** The tailwind merge function that Flow uses. It's the same as tw and cn. */
  clsx: tw,
  /** The tailwind merge function that Flow uses. It's the same as tw and clsx. */
  cn: tw,
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
    TaskTitleInput,
    TaskDurationButtonDropdown,

    // UI components
    Input,
    FormInput,
    Textarea,
    FormTextarea,
    FormSelect,
    FormCombobox,
    FormCheckbox,
    Checkbox,
    CheckboxWithLabel,
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
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxSelected,
    ComboboxTrigger,
    ComboboxValue,
    ErrorBoundary,
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
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
   * The @flowdev/tiptap package which is a wrapper around a lot of tiptap packages and extensions.
   * This prevents double bundling it in both the web app and in individual plugins.
   */
  tiptap,
  /**
   * The dayjs package. This prevents double bundling it in both the web app and in individual plugins.
   */
  dayjs,
  /** The react-hook-form package. This prevents double bundling it in both the web app and in individual plugins. */
  reactHookForm: {
    useForm,
    useFormContext,
    useFieldArray,
    useFormState,
    useWatch,
    useController,
    Controller,
  },
  /**
   * The toast export of the react-hot-toast package.
   * This prevents double bundling it in both the web app and in individual plugins.
   * @link https://react-hot-toast.com/
   */
  toast,
});

export type WebPluginOptions = ReturnType<typeof getPluginOptions>;
