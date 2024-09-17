import { useState, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@flowdev/ui/Tabs";
import { Textarea } from "@flowdev/ui/Textarea";
import { usePlugins } from "../getPlugin";
import { graphql, useLazyLoadQuery } from "@flowdev/relay";
import { EditorContent, StarterKit, useEditor } from "@flowdev/tiptap";
import { TemplateEditorQuery } from "../relay/__gen__/TemplateEditorQuery.graphql";

export const TemplateEditor = (props: {
  /** The initial template to render. */
  initialTemplate?: Template;
  /** The tab to show by default. */
  defaultTab?: Tab;
  /** Triggers when the template changes. */
  onChange?: (template: Template) => void;
  /** autofocus the editor. */
  autofocus?: boolean;
}) => {
  const [template, setTemplate] = useState<Template>({ content: "", data: {} });

  return (
    <Tabs defaultValue={props.defaultTab ?? "write"}>
      <TabsList>
        <TabsTrigger value={"write" as Tab} type="button">
          Write
        </TabsTrigger>
        <TabsTrigger value={"preview" as Tab} type="button">
          Preview
        </TabsTrigger>
      </TabsList>
      <TabsContent value={"write" as Tab}>
        <WriteTemplate value={template} onChange={setTemplate} />
      </TabsContent>
      <TabsContent value={"preview" as Tab}>
        <Suspense>
          <PreviewTemplate template={template} />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};

type Tab = "write" | "preview";

type Template = {
  content: string;
  data: Record<string, any>;
};

const WriteTemplate = (props: { value: Template; onChange: (template: Template) => void }) => {
  return (
    <div>
      <Textarea
        value={props.value.content}
        onChange={(e) => props.onChange({ ...props.value, content: e.target.value })}
      />
      <Textarea
        value={JSON.stringify(props.value.data, null, 2)}
        onChange={(e) => props.onChange({ ...props.value, data: JSON.parse(e.target.value) })}
      />
    </div>
  );
};

const PreviewTemplate = (props: { template: Template }) => {
  const { plugins } = usePlugins();
  const data = useLazyLoadQuery<TemplateEditorQuery>(
    graphql`
      query TemplateEditorQuery($input: QueryRenderTemplateInput!) {
        renderTemplate(input: $input)
      }
    `,
    { input: { template: props.template.content, data: props.template.data } },
    { fetchPolicy: "store-and-network" },
  );

  const pluginExtensions = Object.values(plugins).flatMap(
    (plugin) => plugin.noteEditorTipTapExtensions ?? [],
  );

  const editor = useEditor(
    {
      extensions: [StarterKit, ...pluginExtensions],
      editorProps: { attributes: { class: "prose" } },
      editable: false,
      content: data.renderTemplate,
    },
    [pluginExtensions.length],
  );

  return <EditorContent editor={editor} />;
};
