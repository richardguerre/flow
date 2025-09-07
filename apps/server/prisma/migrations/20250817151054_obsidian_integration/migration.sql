-- AlterTable
ALTER TABLE "Day" ADD COLUMN     "noteId" INTEGER;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "noteId" INTEGER;

-- CreateTable
CREATE TABLE "NoteLink" (
    "sourceNoteId" INTEGER NOT NULL,
    "noteId" INTEGER NOT NULL,

    CONSTRAINT "NoteLink_pkey" PRIMARY KEY ("sourceNoteId","noteId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Day_noteId_key" ON "Day"("noteId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_noteId_key" ON "Task"("noteId");

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteLink" ADD CONSTRAINT "NoteLink_sourceNoteId_fkey" FOREIGN KEY ("sourceNoteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteLink" ADD CONSTRAINT "NoteLink_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;
