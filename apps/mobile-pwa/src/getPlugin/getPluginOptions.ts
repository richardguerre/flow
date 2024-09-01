import React from "react";
import { Button } from "@flowdev/ui/Button";
import * as framerMotion from "framer-motion";
import * as tiptap from "@flowdev/tiptap";
import { dayjs } from "@flowdev/mobile-pwa/dayjs";
import { Day, DayContent } from "../components/Day";
import { CardActionButton, TaskCard, TaskDurationButtonDropdown } from "../components/TaskCard";
import { useAsyncLoader } from "../useAsyncLoader";
import { useDebounce } from "../useDebounce";
import { useAsyncEffect } from "../useAsyncEffect";
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
  SelectUnstyledTrigger,
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@flowdev/ui/Tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogLoading,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@flowdev/ui/Dialog";
import { nearestTailwindColor } from "@flowdev/nearest-color";
import { Spinner } from "@flowdev/ui/Spinner";
import { Loading } from "@flowdev/ui/Loading";

export const getPluginOptions = (slug: string) => ({
  /**
   * The server's origin when working locally. In production, this is an empty string as the server is on the same origin as the mobile app.
   * @example "http://localhost:4000"
   * @example ""
   */
  serverOrigin: import.meta.env.PROD ? "" : "http://localhost:4000",
  /** The plugin's slug. There is no difference with the one passed into `definePlugin`. It can be used to not repeat it throughout the plugin's code. */
  pluginSlug: slug,
  /**
   * React version that Flow uses, so you don't have a conflicting version of it in your plugin.
   *
   * You can simply do the following at the start of your plugin to use the same version of React as Flow.
   * ```
   * const React = opts.React;
   * ```
   * Otherwise, when bundling your plugin with a tool like Vite, it will bundle your version of React in your plugin making it bigger and potentially incompatible with Flow.
   */
  React,
  /** The tailwind merge function that Flow uses. It's the same as clsx and cn. */
  tw,
  /** The tailwind merge function that Flow uses. It's the same as tw and cn. */
  clsx: tw,
  /** The tailwind merge function that Flow uses. It's the same as tw and clsx. */
  cn: tw,
  /** Get the nearest tailwind color from a hex string. */
  nearestTailwindColor,
  /**
   * Components that Flow uses you can re-use in your plugin views to feel more integrated.
   *
   * Some components will change appearance depending on the theme the user chooses.
   */
  components: {
    Button,
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
    SelectUnstyledTrigger,
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogLoading,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
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
    Spinner,
    Loading,
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
   * The framer-motion package.
   * This prevents double-bundling it in both the mobile app and in individual plugins.
   */
  framerMotion,
  /**
   * The @flowdev/tiptap package which is a wrapper around a lot of tiptap packages and extensions.
   * This prevents double bundling it in both the mobile app and in individual plugins.
   */
  tiptap,
  /**
   * The dayjs package. This prevents double bundling it in both the mobile app and in individual plugins.
   */
  dayjs,
  /** The react-hook-form package. This prevents double bundling it in both the mobile app and in individual plugins. */
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
   * This prevents double bundling it in both the mobile app and in individual plugins.
   * @link https://react-hot-toast.com/
   */
  toast,
});

export type MobilePluginOptions = ReturnType<typeof getPluginOptions>;
