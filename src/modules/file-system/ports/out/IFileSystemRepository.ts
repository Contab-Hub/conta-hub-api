import { FileSystemNode } from '@/modules/file-system/domain/entities/file-system-node'
import { FileSystemTypeEnum } from '@/modules/file-system/domain/enums/file-system-type-enum'
import { CreateFolderInput } from '@/modules/file-system/domain/inputs/create-folder.input'
import { SaveFileInput } from '@/modules/file-system/domain/inputs/save-file.input'

export const FILE_SYSTEM_REPOSITORY = 'FILE_SYSTEM_REPOSITORY'

export interface IFileSystemRepository {
  saveFile(mimeType: string, storageKey: string, input: SaveFileInput): Promise<string>
  createFolder(input: CreateFolderInput): Promise<string>
  findExistingNames(
    parentId: string,
    fileSystemType: FileSystemTypeEnum,
    baseName: string,
  ): Promise<string[]>
  findFile(fileId: string): Promise<FileSystemNode | null>
}
