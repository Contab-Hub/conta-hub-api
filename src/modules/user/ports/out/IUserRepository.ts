import { User } from '@/modules/user/domain/entities/user'
import { CreateUserInput } from '@/modules/user/domain/inputs/create-user.input'
import { ListUsersInput } from '@/modules/user/domain/inputs/list-users.input'
import { UpdateUserInput } from '@/modules/user/domain/inputs/update-user.input'

export const USER_REPOSITORY = 'USER_REPOSITORY'

export interface IUserRepository {
  create(input: CreateUserInput): Promise<User>
  findById(userId: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  update(userId: string, input: UpdateUserInput): Promise<void>
  softDelete(userId: string): Promise<void>
  list(input: ListUsersInput): Promise<{ users: User[]; total: number }>
}
