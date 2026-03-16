import { DELETE_USER_USE_CASE, IDeleteUserUseCase } from '@/modules/user/ports/in/IDeleteUserUseCase'
import { IUserRepository, USER_REPOSITORY } from '@/modules/user/ports/out/IUserRepository'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    const existingUser = await this.userRepository.findById(userId)

    if (!existingUser || !existingUser.isActive()) {
      throw new NotFoundException('User not found')
    }

    await this.userRepository.softDelete(userId)
  }
}

export { DELETE_USER_USE_CASE }
