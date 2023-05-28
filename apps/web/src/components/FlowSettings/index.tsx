import { graphql, useFragment } from "@flowdev/relay";
import { FlowSettings_data$key } from "@flowdev/web/relay/__generated__/FlowSettings_data.graphql";
import { RoutinesSettings } from "./RoutinesSettings";

type FlowSettingsProps = {
  data: FlowSettings_data$key;
};

export const FlowSettings = (props: FlowSettingsProps) => {
  const data = useFragment(
    graphql`
      fragment FlowSettings_data on Query {
        # TODO: add this back when there are flow settings
        # pluginSlug: null ensures we only get the flow settings, not the plugins' settings
        # storeItems(input: { pluginSlug: null }) {
        #   key
        #   value
        # }
        ...RoutinesSettings_data
      }
    `,
    props.data
  );
  // const storeItemsMap = new Map(data.storeItems.map((item) => [item.key, item.value]));

  return (
    <div className="flex flex-col gap-8">
      <RoutinesSettings data={data} />
    </div>
  );
};
