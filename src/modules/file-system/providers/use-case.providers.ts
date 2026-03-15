import { CreateFolderUseCase } from '../adapters/in/create-folder.usecase'
import { DownloadFileUseCase } from '../adapters/in/download-file.usecase'
import { SaveFileUseCase } from '../adapters/in/save-file.usecase'
import { FileSystemRepository } from '../adapters/out/file-system.repository'
import { UniqueNameService } from '../domain/services/unique-name.service'
import { CREATE_FOLDER_USE_CASE } from '../ports/in/ICreateFolderUseCase'
import { DOWNLOAD_FILE_USE_CASE } from '../ports/in/IDownloadFileUseCase'
import { SAVE_FILE_USE_CASE } from '../ports/in/ISaveFileUseCase'
import { FILE_SYSTEM_REPOSITORY } from '../ports/out/IFileSystemRepository'

export const fileSystemProviders = [
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
    provide: DOWNLOAD_FILE_USE_CASE,
    useClass: DownloadFileUseCase,
  },
  {
    provide: FILE_SYSTEM_REPOSITORY,
    useClass: FileSystemRepository,
  },
]
