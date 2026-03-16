import { UserRoleEnum } from '@/modules/user/domain/enums/user-role.enum'
import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty({ enum: UserRoleEnum })
  role: UserRoleEnum

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
