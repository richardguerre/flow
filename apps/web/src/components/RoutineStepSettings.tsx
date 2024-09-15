import { BsGear } from "@flowdev/icons";
import { Dialog, DialogContent, DialogTrigger } from "@flowdev/ui/Dialog";
import { Textarea } from "@flowdev/ui/Textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@flowdev/ui/Tabs";
import { Suspense, useState } from "react";
import { graphql, useLazyLoadQuery } from "@flowdev/relay";
import { RoutineStepSettingsPreviewTemplateQuery } from "../relay/__gen__/RoutineStepSettingsPreviewTemplateQuery.graphql";
import { EditorContent, StarterKit, useEditor } from "@flowdev/tiptap";
import { usePlugins } from "../getPlugin";

export const RoutineStepSettings = () => {
  const [templates, setTemplates] = useState<Template>({ template: "", data: {} });
  const [tab, setTab] = useState<Tab>("write");

  return (
    <Dialog>
      <DialogTrigger>
        <BsGear />
      </DialogTrigger>
      <DialogContent>
        <Tabs value={tab} onValueChange={(t) => setTab(t as Tab)}>
          <TabsList>
            <TabsTrigger value={"write" as Tab}>Write</TabsTrigger>
            <TabsTrigger value={"preview" as Tab}>Preview</TabsTrigger>
          </TabsList>
          <TabsContent value={"write" as Tab}>
            <WriteTemplate value={templates} onChange={setTemplates} />
          </TabsContent>
          <TabsContent value={"preview" as Tab}>
            <Suspense>
              <PreviewTemplate template={templates} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

type Tab = "write" | "preview";

type Template = {
  template: string;
  data: Record<string, any>;
};

const WriteTemplate = (props: { value: Template; onChange: (template: Template) => void }) => {
  return (
    <div>
      <Textarea
        value={props.value.template}
        onChange={(e) => props.onChange({ ...props.value, template: e.target.value })}
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
  const data = useLazyLoadQuery<RoutineStepSettingsPreviewTemplateQuery>(
    graphql`
      query RoutineStepSettingsPreviewTemplateQuery($input: QueryRenderTemplateInput!) {
        renderTemplate(input: $input)
      }
    `,
    { input: { template: props.template.template, data: props.template.data } },
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
