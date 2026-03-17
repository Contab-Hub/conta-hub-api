import { CreateUserInput } from '@/modules/user/domain/inputs/create-user.input'
import { AuthResponseDto } from '@/modules/user/dto/auth-response.dto'

export const CREATE_USER_USE_CASE = 'CREATE_USER_USE_CASE'

export interface ICreateUserUseCase {
  execute(input: CreateUserInput): Promise<AuthResponseDto>
}
