import { LoginInput } from '@/modules/user/domain/inputs/login.input'
import { AuthResponseDto } from '@/modules/user/dto/auth-response.dto'

export const LOGIN_USE_CASE = 'LOGIN_USE_CASE'

export interface ILoginUseCase {
  execute(input: LoginInput): Promise<AuthResponseDto>
}
