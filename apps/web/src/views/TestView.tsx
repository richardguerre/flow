import { EditorContent, MinimumKit, minimumStyles, useEditor } from "@flowdev/tiptap";
import { Tooltip, TooltipContent, TooltipTrigger } from "@flowdev/ui/Tooltip";
import { tw } from "@flowdev/ui/tw";
import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import { TaskTagsExtension } from "../components/TaskTags";
import { Suspense, useEffect, useRef, useState } from "react";

// Linear style labels and combobox for OnCreateTaskFromItem
import { BsCheck, BsCircleFill } from "@flowdev/icons";
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

export default function TestView() {
  return (
    <Suspense fallback="loading...">
      <TestViewContent />
    </Suspense>
  );
}

// export const TestViewContent = () => {
//   const ref = useRef<HTMLDivElement>(null);
//   const [enabled, setEnabled] = useState(false);
//   const editor = useEditor({
//     extensions: [
//       MinimumKit,
//       TaskTagsExtension.configure({ tags: [] }),
//       Node.create({
//         name: "slack-status",
//         inline: true,
//         group: "inline",
//         atom: true,
//         addAttributes: () => ({
//           innerHTML: {
//             default: null,
//             parseHTML: (element) => element.innerHTML,
//             rendered: false,
//           },
//           filter: {
//             default: null,
//             parseHTML: (element) => {
//               const rawFilter = element.getAttribute("filter");
//               if (!rawFilter) return null;
//               return JSON.parse(rawFilter);
//             },
//             renderHTML: (attrs) => {
//               if (!attrs.filter) return {};
//               return { filter: JSON.stringify(attrs.filter) };
//             },
//           },
//         }),
//         parseHTML: () => {
//           return [{ tag: "slack-status" }];
//         },
//         renderHTML({ HTMLAttributes, node }) {
//           const dom = document.createElement("slack-status");
//           dom.innerHTML = node.attrs.innerHTML;
//           for (const attr in HTMLAttributes) {
//             dom.setAttribute(attr, HTMLAttributes[attr]);
//           }
//           return { dom };
//         },
//         addNodeView() {
//           return ReactNodeViewRenderer(Component);
//         },
//       }),
//     ],
//     content: `<p>Single line editor</p>`,
//     // content: `<h1>Header 1</h1><p>paragraph under heeader</p><h2>Header 2</h2><p>paragraph under heeader</p><h3>Header 3</h3><p>paragraph under heeader</p><h4>Header 4</h4><p>paragraph under heeader</p><h5>Header 5</h5><p>paragraph under heeader</p><h6>Header 6</h6><p>paragraph under heeader</p><ul><li>list item 1</li><li>list item 2</li></ul><ol><li>list item 1</li><li>list item 2</li></ol><a href="https://www.google.com">link</a><blockquote><p>quote</p></blockquote><code>code</code><pre><code>code block</code></pre>`,
//     onUpdate: (props) => {
//       console.log(props.editor.getHTML());
//       // props.editor.state.doc.descendants((node) => {
//       //   if (node.type.name === "taskTag") {
//       //     console.log(node);
//       //   }
//       // });
//     },
//     editorProps: {
//       attributes: {
//         class: `h-full w-full ${minimumStyles} focus:outline-transparent`,
//       },
//     },
//     autofocus: true,
//   });
//   const handleClick = () => {
//     // if (enabled) Mousetrap.unbind("mod+k");
//     // else
//     // Mousetrap.bind("mod+k", (e) => {
//     //   console.log("mod+k", e);
//     // });
//     setEnabled(!enabled);
//   };
//   return (
//     <div className="flex h-screen items-center justify-center">
//       <div className="h-2/3 w-2/3 bg-background-50 gap-2 rounded-lg shadow-md p-4">
//         <EditorContent editor={editor} className="h-full w-full" autoFocus ref={ref} />
//       </div>
//     </div>
//   );
// };

// const Component = (props: any) => {
//   console.log(props.node.attrs);
//   return (
//     <NodeViewWrapper as="span">
//       <Tooltip>
//         <TooltipTrigger
//           className={tw(
//             "p-0.5 rounded-sm bg-background-200 hover:bg-background-300 transform translate-y-0.5 h-5 inline-flex items-center gap-1",
//             props.selected && "bg-background-300",
//           )}
//         >
//           <SlackMark />
//           <span className="text-foreground-700 select-none">New tasks will be added here.</span>
//         </TooltipTrigger>
//         <TooltipContent className="max-w-xs">
//           New tasks that match the filters you set in the <b>Post in Slack</b> routine step will be
//           added here (defaults to today's tasks).
//           <br />
//           <br />
//           New tasks will be rendered using this template:
//           <pre>
//             <code className="text-xs">{props.node.attrs.innerHTML}</code>
//           </pre>
//         </TooltipContent>
//       </Tooltip>
//     </NodeViewWrapper>
//   );
// };

// const SlackMark = () => (
//   <svg width="16" height="16" viewBox="0 0 123 123" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path
//       d="M25.8 77.6C25.8 84.7 20 90.5 12.9 90.5C5.8 90.5 0 84.7 0 77.6C0 70.5 5.8 64.7 12.9 64.7H25.8V77.6Z"
//       fill="#E01E5A"
//     />
//     <path
//       d="M32.3 77.6C32.3 70.5 38.1001 64.7 45.2001 64.7C52.3001 64.7 58.1 70.5 58.1 77.6V109.9C58.1 117 52.3001 122.8 45.2001 122.8C38.1001 122.8 32.3 117 32.3 109.9V77.6Z"
//       fill="#E01E5A"
//     />
//     <path
//       d="M45.2001 25.8C38.1001 25.8 32.3 20 32.3 12.9C32.3 5.8 38.1001 0 45.2001 0C52.3001 0 58.1 5.8 58.1 12.9V25.8H45.2001Z"
//       fill="#36C5F0"
//     />
//     <path
//       d="M45.2 32.3C52.3 32.3 58.1 38.1 58.1 45.2C58.1 52.3 52.3 58.1 45.2 58.1H12.9C5.8 58.1 0 52.3 0 45.2C0 38.1 5.8 32.3 12.9 32.3H45.2Z"
//       fill="#36C5F0"
//     />
//     <path
//       d="M97 45.2C97 38.1 102.8 32.3 109.9 32.3C117 32.3 122.8 38.1 122.8 45.2C122.8 52.3 117 58.1 109.9 58.1H97V45.2Z"
//       fill="#2EB67D"
//     />
//     <path
//       d="M90.5 45.2C90.5 52.3 84.6999 58.1 77.5999 58.1C70.4999 58.1 64.7 52.3 64.7 45.2V12.9C64.7 5.8 70.4999 0 77.5999 0C84.6999 0 90.5 5.8 90.5 12.9V45.2Z"
//       fill="#2EB67D"
//     />
//     <path
//       d="M77.5999 97C84.6999 97 90.5 102.8 90.5 109.9C90.5 117 84.6999 122.8 77.5999 122.8C70.4999 122.8 64.7 117 64.7 109.9V97H77.5999Z"
//       fill="#ECB22E"
//     />
//     <path
//       d="M77.5999 90.5C70.4999 90.5 64.7 84.7 64.7 77.6C64.7 70.5 70.4999 64.7 77.5999 64.7H109.9C117 64.7 122.8 70.5 122.8 77.6C122.8 84.7 117 90.5 109.9 90.5H77.5999Z"
//       fill="#ECB22E"
//     />
//   </svg>
// );

const TestViewContent = () => {
  return <ComboboxDemo />;
};

const types: Record<string, { label: string; iconClassName: string }> = {
  CODE: { label: "Code", iconClassName: "text-blue-600" },
  SPEC: { label: "Spec", iconClassName: "text-gray-600" },
  REVIEW: { label: "Review", iconClassName: "text-yellow-600" },
  QA: { label: "QA", iconClassName: "text-purple-600" },
  LEARNING: { label: "Learning", iconClassName: "text-green-700" },
};

function ComboboxDemo() {
  // useSimpleShortcuts([
  //   {
  //     trigger: "1",
  //     handler: (e) => {
  //       console.log("1", e);
  //     },
  //   },
  // ]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-75 bg-background-50 flex h-20 items-center justify-center gap-2 rounded-lg shadow-md">
        {/* <Shortcut onTrigger={() => console.log("triggered 2")}>2</Shortcut> */}
        <Combobox defaultValues={["CODE"]} multiselect>
          <ComboboxTrigger asChild>
            <button
              role="combobox"
              className="bg-background-50 ring-background-300 flex items-center gap-1 rounded-sm px-2 py-px text-sm  shadow-md ring"
            >
              <ComboboxValue
                renderValues={(values) => {
                  console.log(values);
                  return values.map((value) => types[value as keyof typeof types].label).join(", ");
                }}
              />
            </button>
          </ComboboxTrigger>
          <ComboboxContent className="w-50 p-0" align="start">
            <ComboboxInput placeholder="Search type..." />
            <ComboboxEmpty>No type found.</ComboboxEmpty>
            <ComboboxGroup>
              {Object.entries(types).map(([value, taskType], i) => (
                <ComboboxItem key={value} value={value} shortcut={`${i + 1}`}>
                  <ComboboxSelected
                    className="mr-2 h-4 w-4 opacity-0"
                    selectedClassName="opacity-100"
                  >
                    <BsCheck />
                  </ComboboxSelected>
                  {taskType.label}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          </ComboboxContent>
        </Combobox>
        <Combobox defaultValue="CODE">
          <ComboboxTrigger asChild>
            <button
              role="combobox"
              className="bg-background-50 ring-background-300 flex items-center gap-0.5 rounded-sm py-px pl-1 pr-2 text-sm  shadow-md ring"
            >
              <ComboboxValue
                renderValue={(value) => (
                  <>
                    <BsCircleFill
                      className={`${types[value as keyof typeof types].iconClassName} h-2`}
                    />
                    {types[value as keyof typeof types].label}
                  </>
                )}
              />
            </button>
          </ComboboxTrigger>
          <ComboboxContent className="w-50 p-0" align="start">
            <ComboboxInput placeholder="Search type..." />
            <ComboboxEmpty>No type found.</ComboboxEmpty>
            <ComboboxGroup>
              {Object.entries(types).map(([value, taskType]) => (
                <ComboboxItem key={value} value={value} className="flex items-center gap-1">
                  <ComboboxSelected className="opacity-0" selectedClassName="opacity-100">
                    <BsCheck className="text-foreground-900 h-6" />
                  </ComboboxSelected>
                  <BsCircleFill className={`${taskType.iconClassName} h-2`} />
                  {taskType.label}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  );
}
