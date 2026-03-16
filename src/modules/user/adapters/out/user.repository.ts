import { PrismaService } from '@/modules/database/prisma.service'
import { User } from '@/modules/user/domain/entities/user'
import { UserRoleEnum } from '@/modules/user/domain/enums/user-role.enum'
import { CreateUserInput } from '@/modules/user/domain/inputs/create-user.input'
import { ListUsersInput } from '@/modules/user/domain/inputs/list-users.input'
import { UpdateUserInput } from '@/modules/user/domain/inputs/update-user.input'
import { IUserRepository } from '@/modules/user/ports/out/IUserRepository'
import { Injectable } from '@nestjs/common'
import { Role } from '@generated/prisma'

function mapRoleToDomain(role: Role): UserRoleEnum {
  return role as UserRoleEnum
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: CreateUserInput): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: input.password,
        role: (input.role ?? UserRoleEnum.ACCOUNTANT) as Role,
      },
    })

    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      mapRoleToDomain(user.role),
      user.createdAt,
      user.updatedAt,
      user.deletedAt,
    )
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
        deletedAt: null,
      },
    })

    if (!user) {
      return null
    }

    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      mapRoleToDomain(user.role),
      user.createdAt,
      user.updatedAt,
      user.deletedAt,
    )
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
        deletedAt: null,
      },
    })

    if (!user) {
      return null
    }

    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      mapRoleToDomain(user.role),
      user.createdAt,
      user.updatedAt,
      user.deletedAt,
    )
  }

  async update(userId: string, input: UpdateUserInput): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: userId,
        deletedAt: null,
      },
      data: {
        ...input,
        ...(input.role && { role: input.role as Role }),
      },
    })
  }

  async softDelete(userId: string): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: userId,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }

  async list(input: ListUsersInput): Promise<{ users: User[]; total: number }> {
    const where = {
      deletedAt: null,
      ...(input.searchTerm
        ? {
            OR: [
              { name: { contains: input.searchTerm, mode: 'insensitive' as const } },
              { email: { contains: input.searchTerm, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    }

    const [users, total] = await Promise.all([
      this.prismaService.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: input.skip ?? 0,
        take: input.take ?? 10,
      }),
      this.prismaService.user.count({ where }),
    ])

    return {
      users: users.map(
        (user) =>
          new User(
            user.id,
            user.name,
            user.email,
            user.password,
            mapRoleToDomain(user.role),
            user.createdAt,
            user.updatedAt,
            user.deletedAt,
          ),
      ),
      total,
    }
  }
}
