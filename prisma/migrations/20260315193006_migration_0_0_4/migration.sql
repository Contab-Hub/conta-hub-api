-- CreateTable
CREATE TABLE "FileSystemPermissionConfig" (
    "id" TEXT NOT NULL,
    "fileSystemNodeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FileSystemPermissionConfig_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FileSystemPermissionConfig" ADD CONSTRAINT "FileSystemPermissionConfig_fileSystemNodeId_fkey" FOREIGN KEY ("fileSystemNodeId") REFERENCES "FileSystemNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileSystemPermissionConfig" ADD CONSTRAINT "FileSystemPermissionConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
