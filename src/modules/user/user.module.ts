import { environment } from '@/common/config/environment'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from '../database/prisma.module'
import { UserController } from './adapters/in/user.controller'
import { userProviders } from './providers/use-case.providers'

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: environment.JWT_SECRET,
      signOptions: {
        expiresIn: environment.JWT_EXPIRES_IN_SECONDS,
      },
    }),
  ],
  controllers: [UserController],
  providers: userProviders,
})
export class UserModule {}
