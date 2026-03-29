import { mapToUserResponseDto } from '@/modules/user/adapters/in/mappers/user-response.mapper'
import { UserResponseDto } from '@/modules/user/dto/user-response.dto'
import { GET_USER_USE_CASE, IGetUserUseCase } from '@/modules/user/ports/in/IGetUserUseCase'
import { IUserRepository, USER_REPOSITORY } from '@/modules/user/ports/out/IUserRepository'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class GetUserUseCase implements IGetUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(userId)

    if (!user || !user.isActive()) {
      throw new NotFoundException('User not found')
    }

    return mapToUserResponseDto(user)
  }
}

export { GET_USER_USE_CASE }
