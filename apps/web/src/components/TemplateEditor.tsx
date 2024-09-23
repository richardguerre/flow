import { useState, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@flowdev/ui/Tabs";
import { Textarea } from "@flowdev/ui/Textarea";
import { usePlugins } from "../getPlugin";
import { graphql, useLazyLoadQuery } from "@flowdev/relay";
import { EditorContent, StarterKit, useEditor } from "@flowdev/tiptap";
import { TemplateEditorQuery } from "../relay/__gen__/TemplateEditorQuery.graphql";
import { Skeleton } from "@flowdev/ui/Skeleton";
import { ErrorBoundary } from "@flowdev/error-boundary";

export const TemplateEditor = (props: {
  /** The initial template to render. */
  initialTemplate?: Template;
  /** The tab to show by default. */
  defaultTab?: Tab;
  /** The value of the template if it needs to be controlled externally. */
  value?: Template;
  /** Triggers when the template changes. */
  onChange?: (template: Template) => void;
  /** autofocus the editor. */
  autofocus?: boolean;
}) => {
  const [templateState, setTemplate] = useState<Template>(
    props.initialTemplate ?? { content: "", data: {} },
  );
  const template = props.value ?? templateState;

  const handleChange = (template: Template) => {
    setTemplate(template);
    props.onChange?.(template);
  };

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
        <WriteTemplate value={template} onChange={handleChange} />
      </TabsContent>
      <TabsContent value={"preview" as Tab}>
        <ErrorBoundary fallbackRender={TemplateError}>
          <Suspense fallback={<TemplateLoading />}>
            <PreviewTemplate template={template} />
          </Suspense>
        </ErrorBoundary>
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
  const [data, setData] = useState(JSON.stringify(props.value.data));
  const [invalidData, setInvalidData] = useState(false);

  const handleDataChange = (data: string) => {
    setData(data);
    try {
      const parsedData = JSON.parse(data);
      props.onChange({ ...props.value, data: parsedData });
      setInvalidData(false);
    } catch {
      setInvalidData(true);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <Textarea
        value={props.value.content}
        onChange={(e) => props.onChange({ ...props.value, content: e.target.value })}
        rows={10}
      />
      <div className="flex flex-col gap-2">
        <div className="text-foreground-700 text-xs">
          Add additional data like filters to the template. This also accepts handlebars
          expressions. Example:{" "}
          {JSON.stringify({ tasksFilter: { where: { date: "{{today 'ISO'}}" } } })}
        </div>
        <Textarea value={data} onChange={(e) => handleDataChange(e.target.value)} rows={3} />
        {invalidData && (
          <div className="text-negative-600 text-xs">Invalid JSON. Please check the syntax.</div>
        )}
      </div>
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
      editable: false,
      content: data.renderTemplate,
    },
    [pluginExtensions.length],
  );

  return (
    <EditorContent
      editor={editor}
      className="min-h-85 border border-primary-200 rounded px-4 pt-4"
    />
  );
};

const TemplateLoading = () => {
  return (
    <div className="flex flex-col gap-2 h-85 pt-2">
      <Skeleton className="h-4" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
};

const errorEmojis = ["🙈", "🫠", "🙀", "😔", "🙃", "😮", "😞"];
export const TemplateError = (props: { error: any }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-85 rounded px-4 border border-primary-200">
      <div className="text-5xl">{errorEmojis[Math.floor(Math.random() * errorEmojis.length)]}</div>
      <div className="text-foreground-700 text-sm">{props.error.message}</div>
    </div>
  );
};
