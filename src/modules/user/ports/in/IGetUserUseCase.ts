import { UserResponseDto } from '@/modules/user/dto/user-response.dto'

export const GET_USER_USE_CASE = 'GET_USER_USE_CASE'

export interface IGetUserUseCase {
  execute(userId: string): Promise<UserResponseDto>
}
