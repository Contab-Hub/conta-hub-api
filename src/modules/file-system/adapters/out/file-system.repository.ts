import { PrismaService } from '@/modules/database/prisma.service'
import { FileSystemTypeEnum } from '@/modules/file-system/domain/enums/file-system-type-enum'
import { CreateFolderInput } from '@/modules/file-system/domain/inputs/create-folder.input'
import { SaveFileInput } from '@/modules/file-system/domain/inputs/save-file.input'
import { IFileSystemRepository } from '@/modules/file-system/ports/out/IFileSystemRepository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FileSystemRepository implements IFileSystemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async saveFile(mimeType: string, storageKey: string, input: SaveFileInput) {
    const result = await this.prismaService.fileSystemNode.create({
      data: {
        fileSystemType: FileSystemTypeEnum.FILE,
        mimeType,
        storageKey,
        ...input,
      },
    })
    return result.id
  }

  async createFolder(input: CreateFolderInput): Promise<string> {
    const result = await this.prismaService.fileSystemNode.create({
      data: {
        fileSystemType: FileSystemTypeEnum.DIRECTORY,
        ...input,
      },
    })
    return result.id
  }
}
