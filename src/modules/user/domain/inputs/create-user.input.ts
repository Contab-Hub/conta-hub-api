import { UserRoleEnum } from '../enums/user-role.enum'

export interface CreateUserInput {
  name: string
  email: string
  password: string
  role?: UserRoleEnum
}
