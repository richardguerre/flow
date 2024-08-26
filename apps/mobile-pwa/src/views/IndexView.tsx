import {
  PreloadedQuery,
  graphql,
  useMutation,
  usePreloadedQuery,
  useQueryLoader,
} from "@flowdev/relay";
import { dayjs } from "../dayjs";
import { useEffect, useRef, useState } from "react";
import { Day } from "../components/Day";
import { IndexViewQuery } from "../relay/__generated__/IndexViewQuery.graphql";
import { BsCalendar, BsClock, BsPlusLg } from "@flowdev/icons";
import { Drawer, DrawerContent, DrawerTrigger } from "@flowdev/ui/Drawer";
import {
  CatchNewLines,
  Editor,
  EditorContent,
  Mention,
  MinimumKit,
  OnEscape,
  useEditor,
} from "@flowdev/tiptap";
import "./IndexView.scss";
import { Button } from "@flowdev/ui/Button";
import { Controller, useForm } from "react-hook-form";
import { durationOptions } from "../components/TaskCard";
import { IndexViewCreateTaskMutation } from "../relay/__generated__/IndexViewCreateTaskMutation.graphql";

export const START_HOUR = 4;
export const getStartOfToday = () => {
  const startHour = dayjs().startOf("day").add(START_HOUR, "hours");
  return dayjs().isBefore(startHour) ? startHour.subtract(1, "day") : startHour;
};

const indexViewQuery = graphql`
  query IndexViewQuery($afterDay: ID!) {
    days(after: $afterDay, first: 1) {
      edges {
        node {
          tasks {
            id
            status
          }
          ...Day_day
        }
      }
    }
  }
`;

const IndexView = () => {
  const today = useRef(getStartOfToday());
  const { queryRef, loadQuery } = useQueryLoader<IndexViewQuery>(indexViewQuery, {
    afterDay: today.current.subtract(1, "day").format("YYYY-MM-DD"),
  });

  const handleCreatedTask = (task: IndexViewCreateTaskMutation["response"]["createTask"]) => {
    if (task.date !== today.current.format("YYYY-MM-DD")) return;
    loadQuery(
      { afterDay: today.current.subtract(1, "day").format("YYYY-MM-DD") },
      { fetchPolicy: "store-and-network" },
    );
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        today.current = getStartOfToday();
        loadQuery(
          { afterDay: today.current.subtract(1, "day").format("YYYY-MM-DD") },
          { fetchPolicy: "store-and-network" },
        );
      },
      1000 * 60 * 60,
    ); // every hour
    return () => clearInterval(interval);
  }, []);

  if (!queryRef) return null;

  return <IndexViewContent queryRef={queryRef} onCreatedTask={handleCreatedTask} />;
};

const IndexViewContent = (props: {
  queryRef: PreloadedQuery<IndexViewQuery>;
  onCreatedTask?: (task: IndexViewCreateTaskMutation["response"]["createTask"]) => void;
}) => {
  const data = usePreloadedQuery(indexViewQuery, props.queryRef);
  const day = data.days.edges[0].node;

  if (!day) {
    return <div>Something went wrong loading today's plan.</div>;
  }

  const lastNonTerminalTaskIndex = day.tasks.findIndex((task) => task.status === "DONE") - 1;

  return (
    <div className="h-dvh relative">
      <Day day={day} />
      <CreateTaskDrawer
        onCreatedTask={props.onCreatedTask}
        lastNonTerminalTaskIndex={lastNonTerminalTaskIndex}
      />
    </div>
  );
};

type FormValues = {
  title: string;
  date: string;
  durationInMinutes: number | null;
};

const CreateTaskDrawer = (props: {
  lastNonTerminalTaskIndex: number;
  onCreatedTask?: (task: IndexViewCreateTaskMutation["response"]["createTask"]) => void;
}) => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const defaultValues: FormValues = {
    title: "",
    date: dayjs().format("YYYY-MM-DD"),
    durationInMinutes: null,
  };
  const { handleSubmit, control, reset } = useForm<FormValues>({defaultValues
  });

  const [$createTask, creatingTask] = useMutation<IndexViewCreateTaskMutation>(graphql`
    mutation IndexViewCreateTaskMutation($input: MutationCreateTaskInput!) {
      createTask(input: $input) {
        id
        title
        durationInMinutes
        date
        status
      }
    }
  `);

  const onSubmit = (values: FormValues) => {
    const date = dayjs(values.date).format("YYYY-MM-DD");
    const durationInMinutes = Number.isNaN(values.durationInMinutes)
      ? null
      : values.durationInMinutes;
    $createTask({
      variables: {
        input: {
          title: values.title,
          date,
          durationInMinutes,
          status: "TODO",
          atIndex: props.lastNonTerminalTaskIndex + 1,
        },
      },
      onCompleted: (res) => {
        props.onCreatedTask?.(res.createTask);
        reset();
        setOpenDrawer(false);
      },
    });
  };

  const handleClose = (open: boolean) => {
    if (!open) reset();
    setOpenDrawer(open);
  }

  return (
    <Drawer open={openDrawer} onOpenChange={handleClose}>
      <DrawerTrigger className="absolute rounded-full bottom-4 right-4 bg-primary-500 h-16 w-16 flex items-center justify-center z-1 shadow-2xl focus:outline-none">
        <BsPlusLg className="text-primary-50" size={24} />
      </DrawerTrigger>
      <DrawerContent className="h-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 p-4 h-full">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TaskTitleInput
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                onSave={handleSubmit(onSubmit)}
              />
            )}
          />
          <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-2 items-center w-30 overflow-hidden">
              <BsCalendar size={16} stroke="2px" className="shrink-0" />
              {/* Had to use Controller here as the default value wasn't being set properly when using register(). */}
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <input
                    type="date"
                    className="appearance-none bg-background-50 focus:outline-none"
                    name={field.name}
                    value={field.value}
                    min={dayjs().format("YYYY-MM-DD")}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </div>
            <div className="flex gap-2 items-center">
              <BsClock size={16} stroke="2px" />
              {/* Had to use Controller here as the default value wasn't being set properly when using register(). */}
              <Controller
                name="durationInMinutes"
                control={control}
                render={({ field }) => (
                  <select
                    className="appearance-none bg-background-50 focus:outline-none"
                    name={field.name}
                    value={field.value ?? undefined}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                  >
                    {durationOptions.map((op) => (
                      <option key={op.value} value={op.value ?? undefined}>
                        {op.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
          </div>
          <Button lg type="submit" loading={creatingTask}>
            Save
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

const TaskTitleInput = (props: {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  onSave: () => void;
}) => {
  const editorRef = useRef<Editor | null>(null);
  editorRef.current = useEditor({
    content: props.value,
    onBlur: ({ editor }) => {
      props.onChange(editor.getHTML());
      props.onBlur();
    },
    onUpdate: ({ editor }) => {
      props.onChange(editor.getHTML());
    },
    extensions: [
      MinimumKit.configure({
        placeholder: {
          placeholder: "Add a task",
        },
      }),
      CatchNewLines(() => {
        editorRef.current!.commands.blur();
        props.onSave();
      }),
      OnEscape(() => editorRef.current!.commands.blur()),
      Mention.configure({
        suggestion: {
          char: "#",
        },
      }),
    ],
  });

  useEffect(() => {
    setTimeout(() => {
      if (!editorRef.current) return;
      editorRef.current.setEditable(true);
      editorRef.current.commands.focus("end");
    }, 300);
    if (!editorRef.current) return;
    editorRef.current.commands.focus("end");
  }, [editorRef.current]);

  return (
    <EditorContent
      editor={editorRef.current}
      className="TaskTitleInput bg-background-100 p-3 rounded"
    />
  );
};

export default IndexView;
