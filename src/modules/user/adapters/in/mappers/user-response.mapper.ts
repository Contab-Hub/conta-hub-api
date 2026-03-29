import { User } from '@/modules/user/domain/entities/user'
import { UserResponseDto } from '@/modules/user/dto/user-response.dto'

export function mapToUserResponseDto(user: User): UserResponseDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}
