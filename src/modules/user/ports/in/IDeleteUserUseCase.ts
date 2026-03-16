export const DELETE_USER_USE_CASE = 'DELETE_USER_USE_CASE'

export interface IDeleteUserUseCase {
  execute(userId: string): Promise<void>
}
