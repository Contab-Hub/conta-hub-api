-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'ACCOUNTANT', 'ADMIN');

-- CreateEnum
CREATE TYPE "FileSystemType" AS ENUM ('FILE', 'DIRECTORY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ACCOUNTANT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileSystemNode" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fileSystemType" "FileSystemType" NOT NULL,
    "type" TEXT,
    "status" TEXT,
    "storagePath" TEXT,
    "mimeType" TEXT,
    "size" INTEGER,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FileSystemNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileSystemAuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FileSystemAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "FileSystemNode" ADD CONSTRAINT "FileSystemNode_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FileSystemNode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileSystemAuditLog" ADD CONSTRAINT "FileSystemAuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
