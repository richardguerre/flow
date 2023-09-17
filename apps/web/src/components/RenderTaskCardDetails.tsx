import { graphql, useFragment } from "@flowdev/relay";
import { ComponentType, ReactNode, Suspense, useState } from "react";
import { useAsyncEffect } from "../useAsyncEffect";
import { usePlugins } from "../getPlugin";
import {
  RenderTaskCardDetails_task$data,
  RenderTaskCardDetails_task$key,
} from "../relay/__generated__/RenderTaskCardDetails_task.graphql";
import { DurationBadge, TimeBadge } from "./Badges";

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
          scheduledAt
        }
        pluginDatas {
          id
          pluginSlug
          min
        }
      }
    `,
    props.task
  );

  const flowDetails = (
    <>
      {task.durationInMinutes && <DurationBadge durationInMinutes={task.durationInMinutes} />}
      {task.item?.scheduledAt && <TimeBadge time={task.item.scheduledAt} />}
    </>
  );

  return (
    <Suspense fallback={<div className="flex flex-wrap gap-2">{flowDetails}</div>}>
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
    const updatedBlockDetails = updatedDetails.filter((d) => d.fullWidth);
    const updatedInlineDetails = updatedDetails.filter((d) => !d.fullWidth);
    setBlockDetails((prev) => [...prev, ...updatedBlockDetails]);
    setInlineDetails((prev) => [...prev, ...updatedInlineDetails]);
  }, [plugins]);

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
