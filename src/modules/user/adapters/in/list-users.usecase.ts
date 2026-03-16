import { mapToUserResponseDto } from '@/modules/user/adapters/in/get-user.usecase'
import { ListUsersInput } from '@/modules/user/domain/inputs/list-users.input'
import { IListUsersUseCase, LIST_USERS_USE_CASE } from '@/modules/user/ports/in/IListUsersUseCase'
import { IUserRepository, USER_REPOSITORY } from '@/modules/user/ports/out/IUserRepository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ListUsersUseCase implements IListUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: ListUsersInput) {
    const { users, total } = await this.userRepository.list(input)

    return {
      users: users.map(mapToUserResponseDto),
      total,
    }
  }
}

export { LIST_USERS_USE_CASE }
