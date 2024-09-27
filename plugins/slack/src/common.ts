export const POST_TO_SLACK = "post-to-slack";

export const getDefaultPlanYourDayTemplate = (props?: { withLinear?: boolean }) => {
  const linearLink = props?.withLinear
    ? `{{#linear-issue-exists}} - <a href="{{linear-issue-link}}">{{linear-issue-id}}</a>{{/linear-issue-exists}}`
    : "";
  return `Plan for today
<ul>
  {{#tasks}}
    <li>{{slack-status}} {{title-without-tags}}${linearLink}</li>
  {{else}}
    <li>No tasks</li> 
  {{/tasks}}
  {{! Do not remove the extra curly braces around the slack-future-tasks block.}}
  {{{{slack-future-tasks}}}}
    <li>{{slack-status}} {{title-without-tags}}${linearLink}</li>
  {{{{/slack-future-tasks}}}}
</ul>`;
};

`<p class="mb-2">Friday</p><ul class="list-disc ml-5 mb-2"><li class="!*:mb-0"><p class="mb-2"><slack-status data-task-id="Task_4433"></slack-status> Product daily</p></li><li class="!*:mb-0"><p class="mb-2"><slack-status data-task-id="Task_6490"></slack-status> Prepare proposal to CE for Sprints/Work Creator Experience Improvements</p></li><li class="!*:mb-0"><p class="mb-2"><slack-status data-task-id="Task_6489"></slack-status> Release post about latest Ticket Suggestions updates</p></li><li class="!*:mb-0"><p class="mb-2"><slack-status data-task-id="Task_5690"></slack-status> Game Lab</p></li><li class="!*:mb-0"><p class="mb-2"><slack-future-tasks filter="{&quot;where&quot;:{&quot;tags&quot;:{&quot;some&quot;:{&quot;slug&quot;:&quot;gitstart&quot;}}}}">    <li>{{slack-status}} {{title-without-tags}}</li></slack-future-tasks></p></li></ul><slack-message data-team-id="T03BG136U4W" data-channel-id="C03BNHSQYUX" data-ts="1727428936.071949"></slack-message>`;
