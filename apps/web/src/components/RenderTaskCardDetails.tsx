import { graphql, useFragment } from "@flowdev/relay";
import { ComponentType, ReactNode, Suspense, useState } from "react";
import { useAsyncEffect } from "../useAsyncEffect";
import { usePlugins } from "../getPlugin";
import {
  RenderTaskCardDetails_task$data,
  RenderTaskCardDetails_task$key,
} from "../relay/__gen__/RenderTaskCardDetails_task.graphql";
import { DurationBadge, TimeBadge } from "./Badges";
import { Skeleton } from "@flowdev/ui/Skeleton";

type Props = {
  /** The details provided by Flow. */
  task: RenderTaskCardDetails_task$key;
};
export const RenderTaskCardDetails = (props: Props) => {
  const task = useFragment(
    graphql`
      fragment RenderTaskCardDetails_task on Task {
        durationInMinutes
        item {
          id
          scheduledAt
        }
        pluginDatas {
          id
          pluginSlug
          min
        }
      }
    `,
    props.task,
  );

  const flowDetails = (
    <>
      {task?.durationInMinutes && <DurationBadge durationInMinutes={task?.durationInMinutes} />}
      {task?.item?.scheduledAt && <TimeBadge time={task?.item.scheduledAt} />}
    </>
  );

  return (
    <Suspense
      fallback={
        <div className="flex flex-wrap gap-2">
          {flowDetails}
          {!!task?.item && skeletonBadges}
        </div>
      }
    >
      <RenderTaskCardDetailsPlugins task={task} nativeDetails={flowDetails} />
    </Suspense>
  );
};
type RenderTaskCardDetailsPluginsProps = {
  task: RenderTaskCardDetails_task$data;
  nativeDetails: ReactNode;
};
const RenderTaskCardDetailsPlugins = (props: RenderTaskCardDetailsPluginsProps) => {
  const { plugins } = usePlugins();
  const [blockDetails, setBlockDetails] = useState<Details[]>([]);
  const [inlineDetails, setInlineDetails] = useState<Details[]>([]);

  useAsyncEffect(async () => {
    const updatedDetails: Details[] = [];
    for (const plugin of Object.values(plugins)) {
      if (!plugin.renderTaskCardDetails) continue;
      const result = await plugin.renderTaskCardDetails({ task: props.task });
      if (!result) continue;
      updatedDetails.push(...result);
    }
    setBlockDetails(updatedDetails.filter((d) => d.fullWidth));
    setInlineDetails(updatedDetails.filter((d) => !d.fullWidth));
  }, [plugins, props.task]);

  return (
    <div className="flex w-full flex-col gap-2">
      {blockDetails.map(({ component: Detail }, i) => (
        <Detail key={i} />
      ))}
      <div className="flex flex-wrap gap-2">
        {props.nativeDetails}
        {inlineDetails.map(({ component: Detail }, i) => (
          <Detail key={i} />
        ))}
      </div>
    </div>
  );
};

export type PluginRenderTaskCardDetails = (input: {
  task: RenderTaskCardDetails_task$data; // TODO type
}) => Promise<null | Details[]>;

type Details = { component: ComponentType; fullWidth?: boolean };

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const skeletonBadges = (
  <>
    {new Array(randomInt(1, 3)).fill(0).map((_, i) => (
      <Skeleton key={i} className={`w-${randomInt(8, 12)} h-5.5`} />
    ))}
  </>
);
