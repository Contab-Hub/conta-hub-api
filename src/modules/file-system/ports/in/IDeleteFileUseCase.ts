export const DELETE_FILE_USE_CASE = 'DELETE_FILE_USE_CASE'

export interface IDeleteFileUseCase {
  execute(fileId: string): Promise<void>
}
