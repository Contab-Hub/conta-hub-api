import { ListUsersInput } from '@/modules/user/domain/inputs/list-users.input'
import { UserResponseDto } from '@/modules/user/dto/user-response.dto'

export const LIST_USERS_USE_CASE = 'LIST_USERS_USE_CASE'

export interface IListUsersUseCase {
  execute(input: ListUsersInput): Promise<{ users: UserResponseDto[]; total: number }>
}
