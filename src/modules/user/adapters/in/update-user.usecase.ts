import { UpdateUserInput } from '@/modules/user/domain/inputs/update-user.input'
import { PasswordService } from '@/modules/user/domain/services/password.service'
import { IUpdateUserUseCase, UPDATE_USER_USE_CASE } from '@/modules/user/ports/in/IUpdateUserUseCase'
import { IUserRepository, USER_REPOSITORY } from '@/modules/user/ports/out/IUserRepository'
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(userId: string, input: UpdateUserInput): Promise<void> {
    const existingUser = await this.userRepository.findById(userId)

    if (!existingUser || !existingUser.isActive()) {
      throw new NotFoundException('User not found')
    }

    if (input.email && input.email !== existingUser.email) {
      const emailInUse = await this.userRepository.findByEmail(input.email)
      if (emailInUse && emailInUse.id !== userId) {
        throw new BadRequestException('E-mail already in use')
      }
    }

    const updateData: UpdateUserInput = { ...input }

    if (updateData.password) {
      updateData.password = await this.passwordService.hash(updateData.password)
    }

    await this.userRepository.update(userId, updateData)
  }
}

export { UPDATE_USER_USE_CASE }
