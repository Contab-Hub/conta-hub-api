import { CreateUserUseCase } from '@/modules/user/adapters/in/create-user.usecase'
import { DeleteUserUseCase } from '@/modules/user/adapters/in/delete-user.usecase'
import { GetUserUseCase } from '@/modules/user/adapters/in/get-user.usecase'
import { ListUsersUseCase } from '@/modules/user/adapters/in/list-users.usecase'
import { LoginUseCase } from '@/modules/user/adapters/in/login.usecase'
import { UpdateUserUseCase } from '@/modules/user/adapters/in/update-user.usecase'
import { JwtTokenService } from '@/modules/user/adapters/out/jwt-token.service'
import { UserRepository } from '@/modules/user/adapters/out/user.repository'
import { PasswordService } from '@/modules/user/domain/services/password.service'
import { CREATE_USER_USE_CASE } from '@/modules/user/ports/in/ICreateUserUseCase'
import { DELETE_USER_USE_CASE } from '@/modules/user/ports/in/IDeleteUserUseCase'
import { GET_USER_USE_CASE } from '@/modules/user/ports/in/IGetUserUseCase'
import { LIST_USERS_USE_CASE } from '@/modules/user/ports/in/IListUsersUseCase'
import { LOGIN_USE_CASE } from '@/modules/user/ports/in/ILoginUseCase'
import { UPDATE_USER_USE_CASE } from '@/modules/user/ports/in/IUpdateUserUseCase'
import { TOKEN_SERVICE } from '@/modules/user/ports/out/ITokenService'
import { USER_REPOSITORY } from '@/modules/user/ports/out/IUserRepository'

export const userProviders = [
  PasswordService,
  {
    provide: CREATE_USER_USE_CASE,
    useClass: CreateUserUseCase,
  },
  {
    provide: GET_USER_USE_CASE,
    useClass: GetUserUseCase,
  },
  {
    provide: LIST_USERS_USE_CASE,
    useClass: ListUsersUseCase,
  },
  {
    provide: LOGIN_USE_CASE,
    useClass: LoginUseCase,
  },
  {
    provide: UPDATE_USER_USE_CASE,
    useClass: UpdateUserUseCase,
  },
  {
    provide: DELETE_USER_USE_CASE,
    useClass: DeleteUserUseCase,
  },
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: TOKEN_SERVICE,
    useClass: JwtTokenService,
  },
]
