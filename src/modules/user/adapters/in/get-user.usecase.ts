import { User } from '@/modules/user/domain/entities/user'
import { UserResponseDto } from '@/modules/user/dto/user-response.dto'
import { GET_USER_USE_CASE, IGetUserUseCase } from '@/modules/user/ports/in/IGetUserUseCase'
import { IUserRepository, USER_REPOSITORY } from '@/modules/user/ports/out/IUserRepository'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'

function mapToUserResponseDto(user: User): UserResponseDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

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

export { GET_USER_USE_CASE, mapToUserResponseDto }
