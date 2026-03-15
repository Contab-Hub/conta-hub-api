import { IDeleteFileUseCase } from '@/modules/file-system/ports/in/IDeleteFileUseCase'
import {
  FILE_SYSTEM_REPOSITORY,
  IFileSystemRepository,
} from '@/modules/file-system/ports/out/IFileSystemRepository'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class DeleteFileUseCase implements IDeleteFileUseCase {
  constructor(
    @Inject(FILE_SYSTEM_REPOSITORY)
    private readonly fileSystemRepository: IFileSystemRepository,
  ) {}

  async execute(fileId: string): Promise<void> {
    const file = await this.fileSystemRepository.findFile(fileId)

    if (!file) {
      throw new NotFoundException(`File not found: ${fileId}`)
    }

    await this.fileSystemRepository.updateFile(fileId, { deletedAt: new Date() })
  }
}
