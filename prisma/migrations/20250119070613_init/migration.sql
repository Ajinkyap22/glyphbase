-- CreateTable
CREATE TABLE "HtmlEntity" (
    "id" TEXT NOT NULL,
    "glyph" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unicode" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "HtmlEntity_pkey" PRIMARY KEY ("id")
);
