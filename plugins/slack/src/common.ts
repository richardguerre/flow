export const POST_TO_SLACK = "post-to-slack";

export const getDefaultPlanYourDayTemplate = (props?: { withLinear?: boolean }) => {
  const linearLink = props?.withLinear
    ? `- <a href="{{linear-issue-link}}">{{linear-issue-id}}</a>`
    : "";
  return `Plan for today
{{#tasks}}
  <ul>
    <li>
      <p>{{slack-status}} {{title}} ${linearLink}</p>
    </li>
  </ul>
{{else}}
  <p>No tasks today</p>
{{/tasks}}`;
};
