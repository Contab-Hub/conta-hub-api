import { SaveFileInput } from '@/file-system/domain/inputs/save-file.input'

export interface ISaveFileUseCase {
  execute(file: Express.Multer.File, input: SaveFileInput): Promise<void>
}
