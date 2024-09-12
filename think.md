# Doc to think about how I want the Slack plugin to work

## What can the user do with the Slack plugin?

- Post their plan for the day from a routine step
- Update their plan for they as they complete/cancel tasks
- Post their retro of the day from a routine step
- Post a message to a channel when they start a task
- Post a message to a channel when are focusing on a task
  - In Slack:
    - Pause notifications
    - Set status emoji
    - Set status message with task details
- Post a message to a channel when they complete a task
- Receive Slack messages as items in their inbox
  - These messages can be summarized and ordered correctly by an AI.
- Create a task from a Slack message (from Slack)
- Auto-reply to Slack messages

## How does the user choose which channels to post into?

The user can specify default channels to post into in the plugin settings.

Then in the routine steps, the user can choose which channels to post into with the default channels already selected.

## How does a user choose the template to use for the routine step and slack message?

As part of the routine step settings, the user can specify a template to use for the routine step.

Example template:
```md
{{day}}

{{#each tasks as |task|}}
- {{slack-status}} {{task.title}} {{linear-link}}
{{/each}}
```

Plugins, like Slack, can register their own handlebars helpers to use in the template.

