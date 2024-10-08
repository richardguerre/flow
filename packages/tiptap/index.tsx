import { Extension, type Range, Node, mergeAttributes } from "@tiptap/core";
import { Document } from "@tiptap/extension-document";
import {
  useEditor,
  Editor,
  EditorContent,
  ReactNodeViewRenderer,
  NodeViewWrapper,
} from "@tiptap/react";
import { Blockquote as $Blockquote, BlockquoteOptions } from "@tiptap/extension-blockquote";
import { BulletList as $BulletList, BulletListOptions } from "@tiptap/extension-bullet-list";
import { CodeBlock as $CodeBlock, CodeBlockOptions } from "@tiptap/extension-code-block";
import { HardBreak, HardBreakOptions } from "@tiptap/extension-hard-break";
import { Heading as $Heading, HeadingOptions } from "@tiptap/extension-heading";
import { HorizontalRule, HorizontalRuleOptions } from "@tiptap/extension-horizontal-rule";
import { ListItem as $ListItem, ListItemOptions } from "@tiptap/extension-list-item";
import { OrderedList as $OrderedList, OrderedListOptions } from "@tiptap/extension-ordered-list";
import { Paragraph as $Paragraph, ParagraphOptions } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";
import { Link as $Link, LinkOptions } from "@tiptap/extension-link";
import { Bold, BoldOptions } from "@tiptap/extension-bold";
import { Code as $Code, CodeOptions } from "@tiptap/extension-code";
import { Italic, ItalicOptions } from "@tiptap/extension-italic";
import { Strike, StrikeOptions } from "@tiptap/extension-strike";
import { Dropcursor, DropcursorOptions } from "@tiptap/extension-dropcursor";
import { Gapcursor } from "@tiptap/extension-gapcursor";
import { History, HistoryOptions } from "@tiptap/extension-history";
import { Mention, MentionOptions } from "@tiptap/extension-mention";
import { Markdown as MarkdownExtension } from "tiptap-markdown";
import { Placeholder as $Placholder, PlaceholderOptions } from "@tiptap/extension-placeholder";
import { Plugin, PluginKey } from "prosemirror-state";
import { EditorView } from "@tiptap/pm/view";

export {
  Document,
  useEditor,
  Editor,
  EditorContent,
  HardBreak,
  HorizontalRule,
  Text,
  Bold,
  Italic,
  Strike,
  Dropcursor,
  Gapcursor,
  History,
  Mention,
  type MentionOptions,
  MarkdownExtension,
  type Range,
  Node,
  mergeAttributes,
  ReactNodeViewRenderer,
  NodeViewWrapper,
};

export const Paragraph = $Paragraph.configure({
  HTMLAttributes: {
    ...$Paragraph.options?.HTMLAttributes,
    class: $Paragraph.options?.HTMLAttributes?.class ?? "mb-2",
  },
});

export const Heading = $Heading.extend({
  renderHTML(props) {
    const level = props.node.attrs.level as 1 | 2 | 3 | 4 | 5 | 6;
    const classes = {
      1: "text-4xl font-semibold mb-2",
      2: "text-3xl font-semibold mb-2",
      3: "text-2xl font-semibold mb-2",
      4: "text-xl font-semibold mb-2",
      5: "text-lg font-semibold mb-2",
      6: "text-base font-semibold mb-2",
    } as const;
    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, props.HTMLAttributes, {
        class: `${classes[level]}`,
      }),
      0,
    ];
  },
});

export const BulletList = $BulletList.configure({
  HTMLAttributes: {
    ...$BulletList.options?.HTMLAttributes,
    class: $BulletList.options?.HTMLAttributes?.class ?? "list-disc ml-5 mb-2",
  },
});

export const OrderedList = $OrderedList.configure({
  HTMLAttributes: {
    ...$OrderedList.options?.HTMLAttributes,
    class: $OrderedList.options?.HTMLAttributes?.class ?? "list-decimal ml-6 mb-2",
  },
});

export const ListItem = $ListItem.configure({
  HTMLAttributes: {
    ...$ListItem.options?.HTMLAttributes,
    class: $ListItem.options?.HTMLAttributes?.class ?? "!*:mb-0",
  },
});

export const Blockquote = $Blockquote.configure({
  HTMLAttributes: {
    ...$Blockquote.options?.HTMLAttributes,
    class:
      $Blockquote.options?.HTMLAttributes?.class ??
      "border-l-4 border-background-300 bg-background-300/30 text-foreground-800 px-3 py-1 rounded",
  },
});

export const Link = $Link.configure({
  HTMLAttributes: {
    ...$Link.options?.HTMLAttributes,
    class: $Link.options?.HTMLAttributes?.class ?? "text-primary-600 hover:underline no-underline",
  },
});

export const Code = $Code.configure({
  HTMLAttributes: {
    ...$Code.options?.HTMLAttributes,
    class:
      $Code.options?.HTMLAttributes?.class ??
      "text-sm font-mono bg-background-200 text-foreground-900 rounded py-0.5 px-1 not-prose",
  },
});

export const CodeBlock = $CodeBlock.configure({
  HTMLAttributes: {
    ...$CodeBlock.options?.HTMLAttributes,
    class:
      $CodeBlock.options?.HTMLAttributes?.class ??
      "text-sm font-mono bg-background-200 text-foreground-900 rounded px-2 py-1 not-prose",
  },
});

export const Placeholder = $Placholder.configure({
  emptyNodeClass:
    "cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-0 before:left-0 before:text-foreground-700 before:opacity-50 before:transition-opacity before:duration-300 before:pointer-events-none", // got it from here: https://github.com/ueberdosis/tiptap/issues/2659#issuecomment-1230954941
});

export const OnKeydown = (
  onKeyDown?: (view: EditorView, event: KeyboardEvent) => boolean | undefined,
  extensionName = "onKeyDown",
) =>
  Extension.create({
    name: extensionName,
    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey(extensionName),
          props: {
            handleKeyDown: (view, event) => {
              return onKeyDown?.(view, event);
            },
          },
        }),
      ];
    },
  });

export const OnEscape = (onEscape?: () => void) =>
  OnKeydown((_view, event) => {
    if (event.key === "Escape") {
      onEscape?.();
      return true;
    }
  }, "onEscape");

export const CatchNewLines = (onNewLine?: () => void) =>
  OnKeydown((view, event) => {
    if (event.key === "Enter") {
      onNewLine?.();
      return true;
    }
  }, "onNewLine");

interface MinimumKitOptions {
  document: false;
  paragraph: false;
  text: false;
  link: Partial<LinkOptions> | false;
  bold: Partial<BoldOptions> | false;
  code: Partial<CodeOptions> | false;
  italic: Partial<ItalicOptions> | false;
  strike: Partial<StrikeOptions> | false;
  history: Partial<HistoryOptions> | false;
  placeholder: Partial<PlaceholderOptions> | false;
}

/**
 * Similar to TipTap's StarterKit extension, but only includes the minimum extensions to create a single line text input. So it wouldn't include extensions like Blockquote, BulletList, etc.
 *
 * It includes:
 * - Document
 * - Paragraph
 * - Text
 * - Link
 * - Bold
 * - Code
 * - Italic
 * - Strike
 * - History
 * - Placeholder
 */
export const MinimumKit = Extension.create<MinimumKitOptions>({
  name: "minimumKit",
  addExtensions() {
    const extensions = [];

    if (this.options.document !== false) {
      extensions.push(Document.configure(this.options?.document));
    }
    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options?.paragraph));
    }
    if (this.options.text !== false) {
      extensions.push(Text.configure(this.options?.text));
    }
    if (this.options.link !== false) {
      extensions.push(Link.configure(this.options?.link));
    }
    if (this.options.bold !== false) {
      extensions.push(Bold.configure(this.options?.bold));
    }
    if (this.options.code !== false) {
      extensions.push(Code.configure(this.options?.code));
    }
    if (this.options.italic !== false) {
      extensions.push(Italic.configure(this.options?.italic));
    }
    if (this.options.strike !== false) {
      extensions.push(Strike.configure(this.options?.strike));
    }
    if (this.options.history !== false) {
      extensions.push(History.configure(this.options?.history));
    }
    if (this.options.placeholder !== false) {
      extensions.push(Placeholder.configure(this.options?.placeholder));
    }

    return extensions;
  },
});

// StarterKit copied from tiptap/packages/starter-kit/src/index.ts
// Copied so that the extensions used in the starter kit can be configured.
export interface StarterKitOptions {
  blockquote: Partial<BlockquoteOptions> | false;
  bold: Partial<BoldOptions> | false;
  bulletList: Partial<BulletListOptions> | false;
  link: Partial<LinkOptions> | false;
  code: Partial<CodeOptions> | false;
  codeBlock: Partial<CodeBlockOptions> | false;
  document: false;
  dropcursor: Partial<DropcursorOptions> | false;
  gapcursor: false;
  hardBreak: Partial<HardBreakOptions> | false;
  heading: Partial<HeadingOptions> | false;
  history: Partial<HistoryOptions> | false;
  horizontalRule: Partial<HorizontalRuleOptions> | false;
  italic: Partial<ItalicOptions> | false;
  listItem: Partial<ListItemOptions> | false;
  orderedList: Partial<OrderedListOptions> | false;
  paragraph: Partial<ParagraphOptions> | false;
  strike: Partial<StrikeOptions> | false;
  text: false;
  placeholder: Partial<PlaceholderOptions> | false;
}

export const StarterKit = Extension.create<StarterKitOptions>({
  name: "starterKit",

  addExtensions() {
    const extensions = [];

    if (this.options.blockquote !== false) {
      extensions.push(Blockquote.configure(this.options?.blockquote));
    }
    if (this.options.bold !== false) {
      extensions.push(Bold.configure(this.options?.bold));
    }
    if (this.options.bulletList !== false) {
      extensions.push(BulletList.configure(this.options?.bulletList));
    }
    if (this.options.link !== false) {
      extensions.push(Link.configure(this.options?.link));
    }
    if (this.options.code !== false) {
      extensions.push(Code.configure(this.options?.code));
    }
    if (this.options.codeBlock !== false) {
      extensions.push(CodeBlock.configure(this.options?.codeBlock));
    }
    if (this.options.document !== false) {
      extensions.push(Document.configure(this.options?.document));
    }
    if (this.options.dropcursor !== false) {
      extensions.push(Dropcursor.configure(this.options?.dropcursor));
    }
    if (this.options.gapcursor !== false) {
      extensions.push(Gapcursor.configure(this.options?.gapcursor));
    }
    if (this.options.hardBreak !== false) {
      extensions.push(HardBreak.configure(this.options?.hardBreak));
    }
    if (this.options.heading !== false) {
      extensions.push(Heading.configure(this.options?.heading));
    }
    if (this.options.history !== false) {
      extensions.push(History.configure(this.options?.history));
    }
    if (this.options.horizontalRule !== false) {
      extensions.push(HorizontalRule.configure(this.options?.horizontalRule));
    }
    if (this.options.italic !== false) {
      extensions.push(Italic.configure(this.options?.italic));
    }
    if (this.options.listItem !== false) {
      extensions.push(ListItem.configure(this.options?.listItem));
    }
    if (this.options.orderedList !== false) {
      extensions.push(OrderedList.configure(this.options?.orderedList));
    }
    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options?.paragraph));
    }
    if (this.options.strike !== false) {
      extensions.push(Strike.configure(this.options?.strike));
    }
    if (this.options.text !== false) {
      extensions.push(Text.configure(this.options?.text));
    }
    if (this.options.placeholder !== false) {
      extensions.push($Placholder.configure(this.options?.placeholder));
    }

    return extensions;
  },
});

/**
 * A component to render Markdown text using the same styles as the Editor component.
 */
export const Markdown = (props: { children: string }) => {
  const editor = useEditor({
    editable: false,
    content: props.children,
    extensions: [
      StarterKit,
      MarkdownExtension.configure({
        // docs: https://github.com/aguingand/tiptap-markdown#options
        html: false, // default is true and will allow the user to add whatever html they want
        linkify: true, // create links from "https://..." text
        breaks: true, // New lines (\n) in markdown input are converted to <br>
        transformPastedText: true, // Allows pasting markdown text in the editor and it get's rendered as HTML
      }),
    ],
  });

  return <EditorContent editor={editor} />;
};
