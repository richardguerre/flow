import { useFragment, graphql } from "@flowdev/relay";
import { ComponentType, Suspense, useState } from "react";
import {
  RenderItemCardDetails_item$data,
  RenderItemCardDetails_item$key,
} from "../relay/__generated__/RenderItemCardDetails_item.graphql";
import { usePlugins } from "../getPlugin";
import { useAsyncEffect } from "../useAsyncEffect";
import { DurationBadge } from "./Badges";
import { Tooltip, TooltipContent, TooltipTrigger } from "@flowdev/ui/Tooltip";
import { pluralize } from "../utils";
import { Badge } from "@flowdev/ui/Badge";

type Props = {
  item: RenderItemCardDetails_item$key;
};
export const RenderItemCardDetails = (props: Props) => {
  const item = useFragment(
    graphql`
      fragment RenderItemCardDetails_item on Item {
        scheduledAt
        inboxPoints
        durationInMinutes
        pluginDatas {
          pluginSlug
          min
        }
        tasks {
          id
        }
      }
    `,
    props.item
  );

  const flowDetails = (
    <>
      {item.durationInMinutes && <DurationBadge durationInMinutes={item.durationInMinutes} />}
      {item.inboxPoints && (
        <Tooltip>
          <TooltipTrigger>
            <Badge>+{item.inboxPoints}</Badge>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {item.inboxPoints} inbox {pluralize("point", item.inboxPoints)}
          </TooltipContent>
        </Tooltip>
      )}
      {!!item.tasks.length && (
        <Tooltip>
          <TooltipTrigger>
            <Badge>
              {item.tasks.length} {pluralize("task", item.tasks.length)}
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {item.tasks.length} {pluralize("task", item.tasks.length)} linked to this item
          </TooltipContent>
        </Tooltip>
      )}
      {item.scheduledAt && <div>{item.scheduledAt}</div>}
    </>
  );

  return (
    <Suspense fallback={<div className="flex flex-wrap gap-2">{flowDetails}</div>}>
      <RenderItemCardDetailsPlugins item={item} nativeDetails={flowDetails} />
    </Suspense>
  );
};

type RenderItemCardDetailsPluginsProps = {
  item: RenderItemCardDetails_item$data;
  nativeDetails: React.ReactNode;
};
const RenderItemCardDetailsPlugins = (props: RenderItemCardDetailsPluginsProps) => {
  const { plugins } = usePlugins();
  const [blockDetails, setBlockDetails] = useState<Details[]>([]);
  const [inlineDetails, setInlineDetails] = useState<Details[]>([]);

  useAsyncEffect(async () => {
    const updatedDetails: Details[] = [];
    for (const plugin of Object.values(plugins)) {
      if (!plugin.renderItemCardDetails) continue;
      const result = await plugin.renderItemCardDetails({ item: props.item });
      if (!result) continue;
      updatedDetails.push(...result);
    }
    setBlockDetails(updatedDetails.filter((d) => d.fullWidth));
    setInlineDetails(updatedDetails.filter((d) => !d.fullWidth));
  }, [plugins, props.item]);

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

export type PluginRenderItemCardDetails = (input: {
  item: RenderItemCardDetails_item$data;
}) => Promise<Details[] | null>;

type Details = {
  component: ComponentType;
  /** If true, the component will be rendered in display block and take the full width of the card. */
  fullWidth?: boolean;
};
