import { Module } from '@nestjs/common'
import { BucketModule } from '../bucket/bucket.module'
import { CreateFolderUseCase } from './adapters/in/create-folder.usecase'
import { FileSystemController } from './adapters/in/file-system.controller'
import { SaveFileUseCase } from './adapters/in/save-file.usecase'
import { FileSystemRepository } from './adapters/out/file-system.repository'
import { UniqueNameService } from './domain/services/unique-name.service'
import { CREATE_FOLDER_USE_CASE } from './ports/in/ICreateFolderUseCase'
import { SAVE_FILE_USE_CASE } from './ports/in/ISaveFileUseCase'
import { FILE_SYSTEM_REPOSITORY } from './ports/out/IFileSystemRepository'

@Module({
  imports: [BucketModule],
  controllers: [FileSystemController],
  providers: [
    UniqueNameService,
    {
      provide: SAVE_FILE_USE_CASE,
      useClass: SaveFileUseCase,
    },
    {
      provide: CREATE_FOLDER_USE_CASE,
      useClass: CreateFolderUseCase,
    },
    {
      provide: FILE_SYSTEM_REPOSITORY,
      useClass: FileSystemRepository,
    },
  ],
})
export class FileSystemModule {}
