export const POST_YOUR_PLAN = "post-your-plan";

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
