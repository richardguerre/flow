/**
 * This is the default script for seeding the database.
 *
 * This script will do the following:
 * - Create a list called "Bucket list".
 * - Create item "Go skydiving" in list "Bucket list".
 * - Create item "Make new friends" in list "Bucket list" with a scheduled time for today.
 * - Add a completed task for today.
 * - Add an incomplete task for today linked to the item "Make new friends".
 * - Add a canceled task for today.
 * - Add a completed task for yesterday.
 * - Add a canceled task for yesterday.
 * - Add an incomplete task for tomorrow.
 *   - Add a subtask to that task.
 * - Add an incomplete task for the day after tomorrow.
 * - Install the essentials plugin
 * - Adds a morning routine using the flow-essential steps
 */

import { PrismaClient } from "@prisma/client";
import { addDays, startOfDay } from "../src/utils/getDays";
import { dayjs } from "../src/utils/dayjs";
const prisma = new PrismaClient();

const yesterday = addDays(startOfDay(), -1);
const today = startOfDay();
const tomorrow = addDays(startOfDay(), 1);
const dayAfterTomorrow = addDays(startOfDay(), 2);

const list = await prisma.list.create({
  data: {
    slug: "bucket-list",
    name: "Bucket list",
    description: "This is a random bucket list",
    items: {
      create: {
        title: "Go skydiving",
        scheduledAt: null,
        color: "blue",
        durationInMinutes: 30,
        isRelevant: true,
        inboxPoints: 10,
      },
    },
  },
});

// this item is linked to a task
const item = await prisma.item.create({
  data: {
    listId: list.id,
    title: "Make new friends",
    scheduledAt: new Date(),
    color: "green",
    durationInMinutes: 120,
    isRelevant: true,
  },
});

await prisma.day.create({
  data: {
    date: yesterday,
    tasks: {
      createMany: {
        data: [
          {
            status: "DONE",
            title: "Task 4 which was completed yesterday",
            durationInMinutes: 30,
            completedAt: dayjs(yesterday).add(14, "hour").toDate(),
          },
          {
            status: "CANCELED",
            title: "Task 5 which was canceled yesterday",
            durationInMinutes: 120,
          },
        ],
      },
    },
  },
});

await prisma.day.create({
  data: {
    date: today,
    tasks: {
      createMany: {
        data: [
          {
            status: "TODO",
            title: "Make a new friend",
            durationInMinutes: 120,
            itemId: item.id,
          },
          {
            status: "DONE",
            title: "Task 1 with a long title that will wrap to the next line",
            durationInMinutes: 30,
            completedAt: dayjs(today).add(12, "hour").toDate(),
          },
          {
            status: "CANCELED",
            title: "Task 3 which was initially canceled",
            durationInMinutes: 60,
          },
        ],
      },
    },
  },
});

await prisma.day.create({
  data: {
    date: tomorrow,
    tasks: {
      create: {
        status: "TODO",
        title: "Task 6 which is scheduled for tomorrow",
        durationInMinutes: 45,
        subtasks: {
          create: {
            date: tomorrow, // this has to be added manually as it's not a direct relation
            status: "TODO",
            title: "Subtask of task 6",
            durationInMinutes: 45,
          },
        },
      },
    },
  },
});

await prisma.day.create({
  data: {
    date: dayAfterTomorrow,
    tasks: {
      createMany: {
        data: [
          {
            status: "TODO",
            title: "Task 7 which is scheduled for the day after tomorrow",
            durationInMinutes: 20,
          },
        ],
      },
    },
  },
});

await prisma.store.create({
  data: {
    key: "installed-plugins",
    pluginSlug: "flow",
    value: [
      {
        slug: "essentials",
        url: "https://cdn.jsdelivr.net/gh/richardguerre/flow@main/plugins/essentials/out",
        web: true,
        server: true,
      },
    ],
  },
});

await prisma.routine.create({
  data: {
    name: "Morning routine",
    actionName: "Plan",
    time: "1970-01-01T08:00:00.000Z",
    repeats: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"],
    isActive: true,
    firstDay: new Date(),
    stepsOrder: [0, 1, 2, 3, 4, 5, 6],
    steps: {
      createMany: {
        data: [
          {
            pluginSlug: "essentials",
            stepSlug: "intro-to-yesterday",
            shouldSkip: true,
          },
          {
            pluginSlug: "essentials",
            stepSlug: "retro-on-yesterday",
            shouldSkip: true,
          },
          {
            pluginSlug: "essentials",
            stepSlug: "intro-to-today",
            shouldSkip: false,
          },
          {
            pluginSlug: "essentials",
            stepSlug: "plan-for-today",
            shouldSkip: false,
          },
          {
            pluginSlug: "essentials",
            stepSlug: "today-tomorrow-next-week",
            shouldSkip: false,
          },
          {
            pluginSlug: "essentials",
            stepSlug: "todays-plan",
            shouldSkip: false,
          },
        ],
      },
    },
  },
});

await prisma.shortcut.create({
  data: {
    slug: "test",
    pluginSlug: "flow",
    elementId: "Global",
    trigger: ["meta+k"],
  },
});

console.log("✅ Seeding complete!");
