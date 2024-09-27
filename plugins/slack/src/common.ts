export const POST_TO_SLACK = "post-to-slack";

export const getDefaultPlanYourDayTemplate = (props?: { withLinear?: boolean }) => {
  const linearLink = props?.withLinear
    ? `{{#linear-issue-exists}} - <a href="{{linear-issue-link}}">{{linear-issue-id}}</a>{{/linear-issue-exists}}`
    : "";
  return `Plan for today
<ul>
  {{#tasks}}
    <li>{{slack-status}} {{title}}${linearLink}</li>
  {{else}}
    <li>No tasks</li> 
  {{/tasks}}
  {{! Do not remove the extra curly braces around the slack-future-tasks block.}}
  {{{{slack-future-tasks}}}}
    <li>{{slack-status}} {{title}}${linearLink}</li>
  {{{{/slack-future-tasks}}}}
</ul>`;
};
