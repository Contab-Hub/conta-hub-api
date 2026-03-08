import { SaveFileInput } from '@/file-system/domain/inputs/save-file.input'

export const FILE_SYSTEM_REPOSITORY = 'FILE_SYSTEM_REPOSITORY'

export interface IFileSystemRepository {
  saveFile(storagePath: string, input: SaveFileInput): Promise<string>
}
