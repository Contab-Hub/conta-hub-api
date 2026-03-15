import { FileSystemTypeEnum } from '@/modules/file-system/domain/enums/file-system-type-enum'
import { CreateFolderInput } from '@/modules/file-system/domain/inputs/create-folder.input'
import { UniqueNameService } from '@/modules/file-system/domain/services/unique-name.service'
import { ICreateFolderUseCase } from '@/modules/file-system/ports/in/ICreateFolderUseCase'
import {
  FILE_SYSTEM_REPOSITORY,
  IFileSystemRepository,
} from '@/modules/file-system/ports/out/IFileSystemRepository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateFolderUseCase implements ICreateFolderUseCase {
  constructor(
    @Inject(FILE_SYSTEM_REPOSITORY)
    private readonly fileSystemRepository: IFileSystemRepository,
    private readonly uniqueNameService: UniqueNameService,
  ) {}

  async execute(input: CreateFolderInput): Promise<string> {
    const existingNames = await this.fileSystemRepository.findExistingNames(
      input.parentId,
      FileSystemTypeEnum.DIRECTORY,
      input.name,
    )
    const uniqueName = this.uniqueNameService.generateUniqueName(input.name, existingNames)
    return this.fileSystemRepository.createFolder({ ...input, name: uniqueName })
  }
}
