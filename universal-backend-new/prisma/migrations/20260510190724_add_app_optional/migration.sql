-- AlterTable
ALTER TABLE "LAFFItem" 
ADD COLUMN "app" TEXT;

-- AlterTable
ALTER TABLE "Post" 
ADD COLUMN "app" TEXT;

-- Backfill existing rows
UPDATE "Post" 
SET "app" = 'universal' 
WHERE "app" IS NULL;

UPDATE "LAFFItem" 
SET "app" = 'lafflab' 
WHERE "app" IS NULL;
