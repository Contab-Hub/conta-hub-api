import { PrismaService } from '@/database/prisma.service'
import { FileSystemTypeEnum } from '@/file-system/domain/enums/file-system-type-enum'
import { SaveFileInput } from '@/file-system/domain/inputs/save-file.input'
import { IFileSystemRepository } from '@/file-system/ports/out/IFileSystemRepository'

export class FileSystemRepository implements IFileSystemRepository {
  constructor(private prismaService: PrismaService) {}
  async saveFile(storagePath: string, input: SaveFileInput): Promise<void> {
    return await this.prismaService.fileSystemNode.create({
      data: {
        fileSystemType: FileSystemTypeEnum.FILE,
        mimeType: '',
        storagePath,
        ...input,
      },
    })
  }
}
