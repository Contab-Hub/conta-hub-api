import { SaveFileInput } from '@/file-system/domain/inputs/save-file.input'

export interface IFileSystemRepository {
  saveFile(storagePath: string, input: SaveFileInput): Promise<void>
}
