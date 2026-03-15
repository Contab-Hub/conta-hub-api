import { UpdateFileInput } from '@/modules/file-system/domain/inputs/update-file.input'
import { IUpdateFileUseCase } from '@/modules/file-system/ports/in/IUpdateFileUseCase'
import {
  FILE_SYSTEM_REPOSITORY,
  IFileSystemRepository,
} from '@/modules/file-system/ports/out/IFileSystemRepository'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class UpdateFileUseCase implements IUpdateFileUseCase {
  constructor(
    @Inject(FILE_SYSTEM_REPOSITORY)
    private readonly fileSystemRepository: IFileSystemRepository,
  ) {}

  async execute(fileId: string, input: UpdateFileInput): Promise<void> {
    const file = await this.fileSystemRepository.findFile(fileId)

    if (!file) {
      throw new NotFoundException(`File not found: ${fileId}`)
    }

    await this.fileSystemRepository.updateFile(fileId, input)
  }
}
