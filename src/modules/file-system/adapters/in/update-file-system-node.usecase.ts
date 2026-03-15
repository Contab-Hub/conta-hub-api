import { UpdateFileInput } from '@/modules/file-system/domain/inputs/update-file.input'
import { UniqueNameService } from '@/modules/file-system/domain/services/unique-name.service'
import { IUpdateFileSystemNodeUseCase } from '@/modules/file-system/ports/in/IUpdateFileSystemNodeUseCase'
import {
  FILE_SYSTEM_REPOSITORY,
  IFileSystemRepository,
} from '@/modules/file-system/ports/out/IFileSystemRepository'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class UpdateFileSystemNodeUseCase implements IUpdateFileSystemNodeUseCase {
  constructor(
    @Inject(FILE_SYSTEM_REPOSITORY)
    private readonly fileSystemRepository: IFileSystemRepository,
    private readonly uniqueNameService: UniqueNameService,
  ) {}

  async execute(fileId: string, input: UpdateFileInput): Promise<void> {
    const file = await this.fileSystemRepository.findFile(fileId)

    if (!file) {
      throw new NotFoundException(`File not found: ${fileId}`)
    }

    if (input.name) {
      const parentId = input.parentId ?? file.parentId!
      const existingNames = await this.fileSystemRepository.findExistingNames(
        parentId,
        file.fileSystemType,
        input.name,
        fileId,
      )
      input.name = this.uniqueNameService.generateUniqueName(input.name, existingNames)
    }

    await this.fileSystemRepository.updateFile(fileId, input)
  }
}
