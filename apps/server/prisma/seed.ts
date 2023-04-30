/**
 * This is the default script for seeding the database.
 *
 * This script will do the following:
 * 1. Create a list called "Bucket list".
 * 1. Create item "Go skydiving" in list "Bucket list".
 * 1. Create item "Make new friends" in list "Bucket list" with a scheduled time for today.
 * 1. Add a completed task for today.
 * 1. Add an incomplete task for today linked to the item "Make new friends".
 * 1. Add a canceled task for today.
 * 1. Add a completed task for yesterday.
 * 1. Add a canceled task for yesterday.
 * 1. Add an incomplete task for tomorrow.
 * 1. Add an incomplete task for the day after tomorrow.
 */

import { PrismaClient } from "@prisma/client";
import { addDays, startOfDay } from "../src/utils/getDays";
const prisma = new PrismaClient();

async function script() {
  const yesterday = addDays(startOfDay(), -1);
  const today = startOfDay();
  const tomorrow = addDays(startOfDay(), 1);
  const dayAfterTomorrow = addDays(startOfDay(), 2);

  const list = await prisma.list.create({
    data: {
      slug: "my-list",
      name: "Bucket list",
      description: "This is a random bucket list",
      items: {
        create: {
          title: "Go skydiving",
          scheduledAt: null,
          color: "blue",
          durationInMinutes: 30,
          isRelevant: true,
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
              status: "DONE",
              title: "Task 1 with a long title that will wrap to the next line",
              durationInMinutes: 30,
            },
            {
              status: "CANCELED",
              title: "Task 3 which was initially canceled",
              durationInMinutes: 60,
            },
            {
              status: "TODO",
              title: "Make a new friend",
              durationInMinutes: 120,
              itemId: item.id,
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
        createMany: {
          data: [
            {
              status: "TODO",
              title: "Task 6 which is scheduled for tomorrow",
              durationInMinutes: 45,
            },
          ],
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
}

script();
