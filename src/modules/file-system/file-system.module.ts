import { Module } from '@nestjs/common'
import { FileSystemController } from './adapters/in/file-system.controller'
import { SaveFileUseCase } from './adapters/in/save-file.usecase'
import { FileSystemRepository } from './adapters/out/file-system.repository'
import { SAVE_FILE_USE_CASE } from './ports/in/ISaveFileUseCase'
import { FILE_SYSTEM_REPOSITORY } from './ports/out/IFileSystemRepository'

@Module({
  controllers: [FileSystemController],
  providers: [
    {
      provide: SAVE_FILE_USE_CASE,
      useClass: SaveFileUseCase,
    },
    {
      provide: FILE_SYSTEM_REPOSITORY,
      useClass: FileSystemRepository,
    },
  ],
})
export class FileSystemModule {}
