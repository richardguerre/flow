import { BsPencilFill, BsSearch, BsX } from "@flowdev/icons";
import {
  ConnectionHandler,
  graphql,
  useFragment,
  useLazyLoadQuery,
  useMutation,
} from "@flowdev/relay";
import { Button } from "@flowdev/ui/Button";
import { FormInput } from "@flowdev/ui/FormInput";
import { FormSelect } from "@flowdev/ui/FormSelect";
import { Input } from "@flowdev/ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@flowdev/ui/Popover";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@flowdev/ui/Select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@flowdev/ui/Tooltip";
import { tw } from "@flowdev/ui/tw";
import { TaskSettingsViewQuery } from "@flowdev/web/relay/__generated__/TaskSettingsViewQuery.graphql";
import {
  Color,
  TaskSettingsView_tag$key,
} from "@flowdev/web/relay/__generated__/TaskSettingsView_tag.graphql";
import { TaskSettingsViewCreateTagMutation } from "@flowdev/web/relay/__generated__/TaskSettingsViewCreateTagMutation.graphql";
import { TaskSettingsViewUpdateTagMutation } from "@flowdev/web/relay/__generated__/TaskSettingsViewUpdateTagMutation.graphql";
import { TaskSettingsViewDeleteTagMutation } from "@flowdev/web/relay/__generated__/TaskSettingsViewDeleteTagMutation.graphql";
import { TaskSettingsViewDeleteTagButton_tag$key } from "@flowdev/web/relay/__generated__/TaskSettingsViewDeleteTagButton_tag.graphql";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@flowdev/ui/Dialog";

export default () => {
  const [filter, setFilter] = useState("");
  const data = useLazyLoadQuery<TaskSettingsViewQuery>(
    graphql`
      query TaskSettingsViewQuery {
        taskTags {
          __id
          edges {
            node {
              id
              name
              ...TaskSettingsView_tag
            }
          }
        }
      }
    `,
    {},
  );

  const tags = data.taskTags.edges
    .map((edge) => edge.node)
    .filter((tag) => tag.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="bg-background-50 max-h-screen w-full overflow-auto">
      <div className="flex flex-col gap-4 max-w-3xl p-8">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <div className="text-foreground-700">Manage task settings</div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold" id="tags">
            Tags
          </h2>
          <div className="text-foreground-700">
            Use <span className="text-green-700">#tags</span> to organize your tasks. Plugins can
            use these tags to do cool things like automations based on tags and their privacy
            setting.
          </div>
          <div className="text-foreground-700 mt-2">
            Any task with a private tag will be considered private and will not be shown in
          </div>
          <div className="mt-2 flex flex-col gap-2">
            <div className="flex items-center gap-2 justify-between">
              <Input
                leftIcon={<BsSearch />}
                type="text"
                placeholder="Find your tag..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <NewTaskTagButton connectionId={data.taskTags.__id} />
            </div>
            {tags.length === 0 && (
              <div className="text-foreground-700 text-sm w-full text-center py-6">
                {filter.length > 0 ? "No tags found" : "No tags yet"}
              </div>
            )}
            {tags.map((tag) => (
              <TaskTag key={tag.id} tag={tag} connectionId={data.taskTags.__id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

type NewTagFormValues = {
  name: string;
  color: Color;
  private: "private" | "public";
};

const NewTaskTagButton = (props: { connectionId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, control, formState } = useForm<NewTagFormValues>();
  const [createTaskTag, creating] = useMutation<TaskSettingsViewCreateTagMutation>(graphql`
    mutation TaskSettingsViewCreateTagMutation($input: MutationCreateTaskTagInput!) {
      createTaskTag(input: $input) {
        ...TaskSettingsView_tag
        ...TaskTagsNode_tag
      }
    }
  `);
  const onSubmit = (values: NewTagFormValues) => {
    const isPrivate = values.private === "private";
    createTaskTag({
      variables: {
        input: {
          name: values.name,
          color: values.color,
          isPrivate,
        },
      },
      onCompleted: () => {
        setIsOpen(false);
      },
      updater: (store) => {
        const connection = store.get(props.connectionId);
        if (!connection) return;
        const createdTaskTag = store.getRootField("createTaskTag");

        const edge = ConnectionHandler.createEdge(
          store,
          connection,
          createdTaskTag,
          "QueryTaskTagsConnectionEdge",
        );
        ConnectionHandler.insertEdgeBefore(connection, edge);
      },
    });
  };

  const randomColor = useMemo(() => {
    return COLORS[Math.floor(Math.random() * COLORS.length)].color;
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>New tag</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New tag</DialogTitle>
          <DialogDescription>Create a new tag to organize your tasks.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-4">
          <FormInput
            {...register("name")}
            label="Name"
            placeholder="Make it short..."
            error={formState.errors.name}
          />
          <Controller
            name="color"
            control={control}
            defaultValue={randomColor}
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <div className="text-foreground-900 text-base font-medium">Color</div>
                <ColorPicker
                  withLabel
                  color={field.value}
                  onChange={(color) => field.onChange(color)}
                />
              </div>
            )}
          />
          <FormSelect
            name="private"
            control={control}
            error={formState.errors.private}
            defaultValue="private"
            label="Private or public?"
            description="If set to private, any task with this tag will be considered private."
          >
            <SelectTrigger className="w-min">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="public">Public</SelectItem>
            </SelectContent>
          </FormSelect>
          <div className="flex gap-2 items-center self-end">
            <Button secondary type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={creating}>
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

type EditTagFormValues = {
  color: Color;
  name: string;
  private: "private" | "public";
};

const TaskTag = (props: { tag: TaskSettingsView_tag$key; connectionId: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, control, formState } = useForm<EditTagFormValues>();
  const tag = useFragment(
    graphql`
      fragment TaskSettingsView_tag on TaskTag {
        id
        name
        color
        isPrivate
        ...TaskSettingsViewDeleteTagButton_tag
      }
    `,
    props.tag,
  );

  const [updateTag, updating] = useMutation<TaskSettingsViewUpdateTagMutation>(graphql`
    mutation TaskSettingsViewUpdateTagMutation($input: MutationUpdateTaskTagInput!) {
      updateTaskTag(input: $input) {
        ...TaskSettingsView_tag
        ...TaskTagsNode_tag
      }
    }
  `);

  const onSubmit = (data: EditTagFormValues) => {
    const isPrivate = data.private === "private";
    updateTag({
      variables: {
        input: {
          id: tag.id,
          name: data.name,
          color: data.color,
          isPrivate,
        },
      },
      onCompleted: () => {
        setIsEditing(false);
      },
    });
  };

  if (isEditing) {
    return (
      <form
        className="flex gap-2 items-center justify-between p-2 bg-background-100"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-2">
          <Controller
            name="color"
            control={control}
            defaultValue={tag.color}
            render={({ field }) => (
              <ColorPicker color={field.value} onChange={(color) => field.onChange(color)} />
            )}
          />
          <FormInput
            {...register("name")}
            placeholder="Name"
            defaultValue={tag.name}
            error={formState.errors.name}
          />
          <FormSelect
            name="private"
            control={control}
            error={formState.errors.private}
            defaultValue={tag.isPrivate ? "private" : "public"}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="public">Public</SelectItem>
            </SelectContent>
          </FormSelect>
        </div>
        <div className="flex gap-2 items-center">
          <Button type="button" secondary onClick={() => setIsEditing(false)} disabled={updating}>
            Cancel
          </Button>
          <Button type="submit" loading={updating}>
            Save
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="group flex items-center gap-2 justify-between rounded-md px-4 py-1.5 bg-background-100">
      <div className="flex items-center gap-2">
        <div className={`bg-${tag.color}-700 rounded-full h-2.5 w-2.5`} />
        {tag.name}
        {tag.isPrivate && (
          <Tooltip>
            <TooltipTrigger className="text-foreground-700 text-sm">Private</TooltipTrigger>
            <TooltipContent>Any task with this tag will be considered private.</TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex gap-2 items-center opacity-0 group-hover:opacity-100">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button tertiary sm onClick={() => setIsEditing(true)}>
              <BsPencilFill size={12} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit tag</TooltipContent>
        </Tooltip>
        <DeleteTagButton tag={tag} connectionId={props.connectionId} />
      </div>
    </div>
  );
};

const DeleteTagButton = (props: {
  tag: TaskSettingsViewDeleteTagButton_tag$key;
  connectionId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const tag = useFragment(
    graphql`
      fragment TaskSettingsViewDeleteTagButton_tag on TaskTag {
        id
      }
    `,
    props.tag,
  );

  const [$deleteTaskTag, deleting] = useMutation<TaskSettingsViewDeleteTagMutation>(graphql`
    mutation TaskSettingsViewDeleteTagMutation($input: MutationDeleteTaskTagInput!) {
      deleteTaskTag(input: $input) {
        id
      }
    }
  `);

  const deleteTaskTag = () => {
    $deleteTaskTag({
      variables: { input: { id: tag.id } },
      onCompleted: () => setIsOpen(false),
      updater: (store) => {
        const connection = store.get(props.connectionId);
        if (!connection) return;
        ConnectionHandler.deleteNode(connection, tag.id);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button tertiary sm>
          <BsX size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete tag</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this tag? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button secondary onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button danger loading={deleting} onClick={deleteTaskTag}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const COLORS: { color: Color; label: string }[] = [
  { color: "yellow", label: "Yellow" },
  { color: "amber", label: "Amber" },
  { color: "orange", label: "Orange" },
  { color: "red", label: "Red" },
  { color: "rose", label: "Rose" },
  { color: "pink", label: "Pink" },
  { color: "fuchsia", label: "Fuchsia" },
  { color: "purple", label: "Purple" },
  { color: "violet", label: "Violet" },
  { color: "indigo", label: "Indigo" },
  { color: "cyan", label: "Cyan" },
  { color: "sky", label: "Sky" },
  { color: "blue", label: "Blue" },
  { color: "emerald", label: "Emerald" },
  { color: "green", label: "Green" },
  { color: "lime", label: "Lime" },
  { color: "teal", label: "Teal" },
  { color: "gray", label: "Gray" },
  { color: "neutral", label: "Neutral" },
  { color: "zinc", label: "Zinc" },
  { color: "slate", label: "Slate" },
  { color: "stone", label: "Stone" },
];

const ColorPicker = (props: {
  color: Color;
  onChange: (color: Color) => void;
  className?: string;
  withLabel?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (color: Color) => {
    props.onChange(color);
    setIsOpen(false);
  };

  const color = useMemo(() => {
    return COLORS.find((c) => c.color === props.color);
  }, [props.color]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className={tw(
          "flex items-center justify-center h-9 px-2 rounded border transition-colors border-background-300 hover:border-primary-300 flex items-center gap-2",
          props.className,
        )}
      >
        <div className={`w-2.5 h-2.5 rounded-full bg-${props.color}-700`} />
        {props.withLabel && (
          <div className="text-foreground-700">{color?.label ?? props.color}</div>
        )}
      </PopoverTrigger>
      <PopoverContent className="flex flex-wrap gap-1 max-w-63" align="start">
        {COLORS.map((color) => (
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-1">
              <button
                key={color.color}
                className={tw(
                  "flex items-center justify-center h-9 w-9 rounded border border-background-200/50 hover:border-background-300 transition-colors",
                  props.color === color.color && "border-background-300",
                )}
                onClick={() => handleSelect(color.color)}
              >
                <div className={`w-2.5 h-2.5 rounded-full bg-${color.color}-700`} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{color.label}</TooltipContent>
          </Tooltip>
        ))}
      </PopoverContent>
    </Popover>
  );
};
