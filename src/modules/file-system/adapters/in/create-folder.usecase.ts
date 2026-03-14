import { CreateFolderInput } from '@/modules/file-system/domain/inputs/create-folder.input'
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
  ) {}

  async execute(input: CreateFolderInput): Promise<string> {
    return this.fileSystemRepository.createFolder(input)
  }
}
