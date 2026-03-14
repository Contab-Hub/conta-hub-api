import { SaveFileInput } from '@/modules/file-system/domain/inputs/save-file.input'

export const FILE_SYSTEM_REPOSITORY = 'FILE_SYSTEM_REPOSITORY'

export interface IFileSystemRepository {
  saveFile(mimeType: string, storageKey: string, input: SaveFileInput): Promise<string>
}
