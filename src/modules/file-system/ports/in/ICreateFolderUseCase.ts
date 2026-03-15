import { CreateFolderInput } from '@/modules/file-system/domain/inputs/create-folder.input'

export const CREATE_FOLDER_USE_CASE = 'CREATE_FOLDER_USE_CASE'

export interface ICreateFolderUseCase {
  execute(input: CreateFolderInput): Promise<string>
}
