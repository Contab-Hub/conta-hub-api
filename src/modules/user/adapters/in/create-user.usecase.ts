import { UserRoleEnum } from '@/modules/user/domain/enums/user-role.enum'
import { CreateUserInput } from '@/modules/user/domain/inputs/create-user.input'
import { PasswordService } from '@/modules/user/domain/services/password.service'
import { AuthResponseDto } from '@/modules/user/dto/auth-response.dto'
import {
  CREATE_USER_USE_CASE,
  ICreateUserUseCase,
} from '@/modules/user/ports/in/ICreateUserUseCase'
import { ITokenService, TOKEN_SERVICE } from '@/modules/user/ports/out/ITokenService'
import { IUserRepository, USER_REPOSITORY } from '@/modules/user/ports/out/IUserRepository'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(TOKEN_SERVICE)
    private readonly tokenService: ITokenService,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(input: CreateUserInput): Promise<AuthResponseDto> {
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

    const accessToken = await this.tokenService.sign({
      sub: user.id,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }
  }
}

export { CREATE_USER_USE_CASE }
