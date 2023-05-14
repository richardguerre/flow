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

export const pluginOptions = {
  components: {
    Button,
    NoteEditor,
  },
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
