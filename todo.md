[X] Fix create task UX (no optmistic update)
[ ] Fix create task UX (flicker between optimistic update state and real data state)
   1. create the task when they click on the button.
   2. If they end up bailing on creating the task, simply hide it in the frontend.
   3. Re-use the same task if they click on the button again.
[ ] Change items/tasks relationship to feel like items are just tasks not imported into a day yet. Clicking on alt when dragging creates duplicate tasks linked to the same item.
[ ] Theme plugins. Dark mode.
[X] Google calendar plugin: set task to DONE after the event is over.
[X] Fix UI is stale after coming back a while later. Make it auto refresh if last update was 1 hour ago.
[X] Fix white screen when loading.
[X] Errors at useFragment level instead of usePreloadedQuery or useLazyLoadedQuery
[ ] pg boss is using it's own DB connection instead of the existing prisma connection.
[X] Fix index view tab always selected.
[ ] Maybe change inbox system to use reference (i.e. `afterTaskInInbox`) instead of points.
  Reason: moving 1 item to be at the top requires reading the list first to know what is the highest number of points and then updating to be on top of that. Also there can be ties between 2 items.
[ ] Mobile friendly version.