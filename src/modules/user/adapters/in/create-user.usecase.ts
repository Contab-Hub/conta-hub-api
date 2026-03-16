import { UserRoleEnum } from '@/modules/user/domain/enums/user-role.enum'
import { CreateUserInput } from '@/modules/user/domain/inputs/create-user.input'
import { PasswordService } from '@/modules/user/domain/services/password.service'
import { CREATE_USER_USE_CASE, ICreateUserUseCase } from '@/modules/user/ports/in/ICreateUserUseCase'
import { IUserRepository, USER_REPOSITORY } from '@/modules/user/ports/out/IUserRepository'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(input: CreateUserInput): Promise<string> {
    const existingUser = await this.userRepository.findByEmail(input.email)

    if (existingUser) {
      throw new BadRequestException('E-mail already in use')
    }

    const hashedPassword = await this.passwordService.hash(input.password)

    const user = await this.userRepository.create({
      ...input,
      role: input.role ?? UserRoleEnum.ACCOUNTANT,
      password: hashedPassword,
    })

    return user.id
  }
}

export { CREATE_USER_USE_CASE }
