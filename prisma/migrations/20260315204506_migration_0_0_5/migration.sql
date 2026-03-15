/*
  Warnings:

  - Added the required column `fileSystemNodeId` to the `FileSystemAuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileSystemAuditLog" ADD COLUMN     "fileSystemNodeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FileSystemAuditLog" ADD CONSTRAINT "FileSystemAuditLog_fileSystemNodeId_fkey" FOREIGN KEY ("fileSystemNodeId") REFERENCES "FileSystemNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
