import { CreateUserDto } from '@/modules/user/dto/create-user.dto'
import { ListUsersDto } from '@/modules/user/dto/list-users.dto'
import { UpdateUserDto } from '@/modules/user/dto/update-user.dto'
import {
  CREATE_USER_USE_CASE,
  ICreateUserUseCase,
} from '@/modules/user/ports/in/ICreateUserUseCase'
import {
  DELETE_USER_USE_CASE,
  IDeleteUserUseCase,
} from '@/modules/user/ports/in/IDeleteUserUseCase'
import { GET_USER_USE_CASE, IGetUserUseCase } from '@/modules/user/ports/in/IGetUserUseCase'
import { IListUsersUseCase, LIST_USERS_USE_CASE } from '@/modules/user/ports/in/IListUsersUseCase'
import {
  IUpdateUserUseCase,
  UPDATE_USER_USE_CASE,
} from '@/modules/user/ports/in/IUpdateUserUseCase'
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserUseCase: ICreateUserUseCase,
    @Inject(GET_USER_USE_CASE)
    private readonly getUserUseCase: IGetUserUseCase,
    @Inject(LIST_USERS_USE_CASE)
    private readonly listUsersUseCase: IListUsersUseCase,
    @Inject(UPDATE_USER_USE_CASE)
    private readonly updateUserUseCase: IUpdateUserUseCase,
    @Inject(DELETE_USER_USE_CASE)
    private readonly deleteUserUseCase: IDeleteUserUseCase,
  ) {}

  @Post()
  create(@Body() input: CreateUserDto) {
    return this.createUserUseCase.execute(input)
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.getUserUseCase.execute(id)
  }

  @Get()
  list(@Query() query: ListUsersDto) {
    return this.listUsersUseCase.execute(query)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, input)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteUserUseCase.execute(id)
  }
}
