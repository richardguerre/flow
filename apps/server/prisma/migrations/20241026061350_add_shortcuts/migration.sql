-- CreateTable
CREATE TABLE "Shortcut" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "slug" TEXT NOT NULL,
    "pluginSlug" TEXT NOT NULL,
    "elementId" TEXT NOT NULL,
    "trigger" TEXT[],
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Shortcut_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shortcut_slug_pluginSlug_key" ON "Shortcut"("slug", "pluginSlug");
