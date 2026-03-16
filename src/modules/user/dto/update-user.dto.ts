import { UserRoleEnum } from '@/modules/user/domain/enums/user-role.enum'
import { UpdateUserInput } from '@/modules/user/domain/inputs/update-user.input'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsOptional, IsString, Matches, MinLength } from 'class-validator'

export class UpdateUserDto implements UpdateUserInput {
  @ApiPropertyOptional({ description: 'User name' })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({ description: 'User e-mail' })
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiPropertyOptional({ description: 'Password (min 8, uppercase, lowercase and number)' })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'password must contain at least one uppercase letter, one lowercase letter and one number',
  })
  password?: string

  @ApiPropertyOptional({ enum: UserRoleEnum })
  @IsOptional()
  @IsEnum(UserRoleEnum)
  role?: UserRoleEnum
}
