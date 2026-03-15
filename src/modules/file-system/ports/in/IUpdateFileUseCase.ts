import { UpdateFileInput } from '@/modules/file-system/domain/inputs/update-file.input'

export const UPDATE_FILE_USE_CASE = 'UPDATE_FILE_USE_CASE'

export interface IUpdateFileUseCase {
  execute(fileId: string, input: UpdateFileInput): Promise<void>
}
