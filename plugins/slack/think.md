# Doc to think about how I want the Slack plugin to work

## What can the user do with the Slack plugin?

- Post their plan for the day (or whatever they want to Slack) from a routine step
- Automatically update Slack messages when they complete/cancel tasks 
- Post a message to a channel when they start a task
- Post a message to a channel when they are focusing on a task
  - TODO: need to create a "Focus" plugin and have it communicate to the Slack plugin
  - In Slack:
    - Pause notifications
    - Set status emoji
    - Set status message with task details
- Post a message to a channel when they complete a task
- Receive Slack messages as items in their inbox
  - These messages can be summarized and ordered correctly by an AI.
- Create a task from a Slack message (from Slack)
- Auto-reply to Slack messages
- Add Slack reminders as items in the Flow inbox

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

Plugins, like Slack or Linear, can register their own handlebars helpers to use in the template.

## Slack message summarization

TL;DR, the user can get a summary of the Slack messages from the last X days, and be able to ask follow up questions and create tasks from the messages.

2 scenarios the user can benefit:
- They want to get a summary of all the slack messages from the last X days (they select the date range).
- On a daily cron that runs before the user's day start routine, they can get a summary of the Slack messages from the previous day

In either scenario, the user will get a summary of the Slack messages, with references to the messages, and be able to ask follow up questions.

Inline with the summary, they will be able to create tasks from the messages by just clicking on some inline buttons.

In my head, there is a "function" with input:
- fromDate
- toDate
- channelsToIgnore
And outputs enhanced markdown text with references as links and the following tokens like:
- <slack-message ts="1234567890" user="user" avatar="https://avatar.com/avatar.png" channel="channel" thread_ts="1234567890" thread_summary="1 line summary of the thread">message text</slack-message>
- <task message_ts="ts of action item originating message">summarized action item</task>

Users should be able to quickly reply to a message without going to Slack.

Then there is another "function" that allows getting the summary of a single thread.