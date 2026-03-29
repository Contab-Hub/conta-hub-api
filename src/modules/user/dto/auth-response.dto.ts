import { UserRoleEnum } from '@/modules/user/domain/enums/user-role.enum'
import { ApiProperty } from '@nestjs/swagger'

export class AuthUserDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty({ enum: UserRoleEnum })
  role: UserRoleEnum
}

export class AuthResponseDto {
  @ApiProperty()
  accessToken: string

  @ApiProperty({ type: AuthUserDto })
  user: AuthUserDto
}
