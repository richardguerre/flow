export const POST_TO_SLACK = "post-to-slack";

export const getDefaultPlanYourDayTemplate = (props?: { withLinear?: boolean }) => {
  const linearLink = props?.withLinear
    ? `- <a href="{{linear-issue-link}}">{{linear-issue-id}}</a>`
    : "";
  return `Plan for today
<ul>{{#tasks}}
  <li>{{slack-status}} {{title}} ${linearLink}</li>
{{else}}
  <li>No tasks</li> 
{{/tasks}}</ul>`;
};
