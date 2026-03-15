/*
  Warnings:

  - A unique constraint covering the columns `[name,parentId,fileSystemType]` on the table `FileSystemNode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FileSystemNode_name_parentId_fileSystemType_key" ON "FileSystemNode"("name", "parentId", "fileSystemType") WHERE ("deletedAt" IS NULL);
