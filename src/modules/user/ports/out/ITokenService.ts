import { UserRoleEnum } from '@/modules/user/domain/enums/user-role.enum'

export const TOKEN_SERVICE = 'TOKEN_SERVICE'

export interface TokenPayload {
  sub: string
  id: string
  name: string
  email: string
  role: UserRoleEnum
}

export interface ITokenService {
  sign(payload: TokenPayload): Promise<string>
}
