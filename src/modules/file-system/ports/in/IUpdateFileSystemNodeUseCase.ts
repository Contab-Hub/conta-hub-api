import { UpdateFileInput } from '@/modules/file-system/domain/inputs/update-file.input'

export const UPDATE_FILE_SYSTEM_NODE_USE_CASE = 'UPDATE_FILE_SYSTEM_NODE_USE_CASE'

export interface IUpdateFileSystemNodeUseCase {
  execute(fileId: string, input: UpdateFileInput): Promise<void>
}
