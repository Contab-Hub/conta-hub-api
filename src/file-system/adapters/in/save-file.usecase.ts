import { SaveFileInput } from '@/file-system/domain/inputs/save-file.input'
import { ISaveFileUseCase } from '@/file-system/ports/in/ISaveFileUseCase'
import { IFileSystemRepository } from '@/file-system/ports/out/IFileSystemRepository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SaveFileUseCase implements ISaveFileUseCase {
  constructor(private readonly fileSystemRepository: IFileSystemRepository) {}
  execute(file, input: SaveFileInput): Promise<void> {
    return this.fileSystemRepository.saveFile('storagePath', input)
  }
}
