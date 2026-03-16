import { UpdateUserInput } from '@/modules/user/domain/inputs/update-user.input'

export const UPDATE_USER_USE_CASE = 'UPDATE_USER_USE_CASE'

export interface IUpdateUserUseCase {
  execute(userId: string, input: UpdateUserInput): Promise<void>
}
