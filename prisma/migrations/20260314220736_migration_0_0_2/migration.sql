/*
  Warnings:

  - You are about to drop the column `storagePath` on the `FileSystemNode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FileSystemNode" DROP COLUMN "storagePath",
ADD COLUMN     "storageKey" TEXT;
