export const POST_TO_SLACK = "post-to-slack";

export const DEFAULT_PLAN_YOUR_DAY = `Plan for today
{{#tasks}}
  <ul>
    <li>
      <p>{{slack-status}} {{title}}</p>
    </li>
  </ul>
{{else}}
  <p>No tasks today</p>
{{/tasks}}
`;
