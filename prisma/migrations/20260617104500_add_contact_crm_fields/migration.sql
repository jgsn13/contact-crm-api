-- AlterTable
ALTER TABLE "contact" ADD COLUMN "company" TEXT;
ALTER TABLE "contact" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'active';
