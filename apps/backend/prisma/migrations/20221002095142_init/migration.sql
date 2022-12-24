-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'DONE', 'CANCELED');

-- CreateEnum
CREATE TYPE "TaskRepeatance" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "Day" (
    "date" DATE NOT NULL,
    "tasksOrder" INTEGER[],

    CONSTRAINT "Day_pkey" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'TODO',
    "date" DATE NOT NULL,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "durationInMinutes" INTEGER,
    "previousDates" DATE[],
    "externalItemId" TEXT,
    "fromTemplateId" INTEGER,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskTemplate" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "durationInMinutes" INTEGER,
    "repeats" "TaskRepeatance"[],
    "firstDay" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastDay" DATE,
    "externalItemId" TEXT,

    CONSTRAINT "TaskTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "isRelevant" BOOLEAN NOT NULL DEFAULT true,
    "url" TEXT,
    "scheduledAt" TIMESTAMP(3),
    "durationInMinutes" INTEGER,

    CONSTRAINT "ExternalItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_date_fkey" FOREIGN KEY ("date") REFERENCES "Day"("date") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_externalItemId_fkey" FOREIGN KEY ("externalItemId") REFERENCES "ExternalItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_fromTemplateId_fkey" FOREIGN KEY ("fromTemplateId") REFERENCES "TaskTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskTemplate" ADD CONSTRAINT "TaskTemplate_externalItemId_fkey" FOREIGN KEY ("externalItemId") REFERENCES "ExternalItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
