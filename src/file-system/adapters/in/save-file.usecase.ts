import { SaveFileInput } from '@/file-system/domain/inputs/save-file.input'
import { ISaveFileUseCase } from '@/file-system/ports/in/ISaveFileUseCase'
import {
  FILE_SYSTEM_REPOSITORY,
  IFileSystemRepository,
} from '@/file-system/ports/out/IFileSystemRepository'
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
