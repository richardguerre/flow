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
import { NoteEditor } from "../components/NoteEditor";
import dayjs from "dayjs";
import { getDays, getDaysMax10 } from "./getDays";

export const pluginOptions = {
  components: {
    Button,
    NoteEditor,
  },
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
};

export type WebPluginOptions = typeof pluginOptions;
