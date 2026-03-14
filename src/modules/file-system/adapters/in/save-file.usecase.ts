import { SaveFileInput } from '@/modules/file-system/domain/inputs/save-file.input'
import { ISaveFileUseCase } from '@/modules/file-system/ports/in/ISaveFileUseCase'
import {
  FILE_SYSTEM_REPOSITORY,
  IFileSystemRepository,
} from '@/modules/file-system/ports/out/IFileSystemRepository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class SaveFileUseCase implements ISaveFileUseCase {
  constructor(
    @Inject(FILE_SYSTEM_REPOSITORY)
    private readonly fileSystemRepository: IFileSystemRepository,
  ) {}
  execute(file, input: SaveFileInput) {
    return this.fileSystemRepository.saveFile('storagePath', input)
  }
}
