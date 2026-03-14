import { PrismaService } from '@/database/prisma.service'
import { FileSystemTypeEnum } from '@/modules/file-system/domain/enums/file-system-type-enum'
import { SaveFileInput } from '@/modules/file-system/domain/inputs/save-file.input'
import { IFileSystemRepository } from '@/modules/file-system/ports/out/IFileSystemRepository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FileSystemRepository implements IFileSystemRepository {
  constructor(private prismaService: PrismaService) {}
  async saveFile(storagePath: string, input: SaveFileInput) {
    const result = await this.prismaService.fileSystemNode.create({
      data: {
        fileSystemType: FileSystemTypeEnum.FILE,
        mimeType: '',
        storagePath,
        ...input,
      },
    })
    return result.id
  }
}
