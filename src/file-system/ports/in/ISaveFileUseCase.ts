import { SaveFileInput } from '@/file-system/domain/inputs/save-file.input'

export const SAVE_FILE_USE_CASE = 'SAVE_FILE_USE_CASE'

export interface ISaveFileUseCase {
  execute(file: Express.Multer.File, input: SaveFileInput): Promise<string>
}
