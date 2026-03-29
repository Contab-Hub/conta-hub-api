import { User } from '@/modules/user/domain/entities/user'
import { LoginInput } from '@/modules/user/domain/inputs/login.input'
import { PasswordService } from '@/modules/user/domain/services/password.service'
import { AuthResponseDto } from '@/modules/user/dto/auth-response.dto'
import { ILoginUseCase, LOGIN_USE_CASE } from '@/modules/user/ports/in/ILoginUseCase'
import { ITokenService, TOKEN_SERVICE } from '@/modules/user/ports/out/ITokenService'
import { IUserRepository, USER_REPOSITORY } from '@/modules/user/ports/out/IUserRepository'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'

function buildAuthResponse(user: User, accessToken: string): AuthResponseDto {
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

@Injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(TOKEN_SERVICE)
    private readonly tokenService: ITokenService,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(input: LoginInput): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(input.email)

    if (!user || !user.isActive()) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await this.passwordService.compare(input.password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const accessToken = await this.tokenService.sign({
      sub: user.id,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })

    return buildAuthResponse(user, accessToken)
  }
}

export { LOGIN_USE_CASE }
