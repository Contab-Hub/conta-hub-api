import { Module } from '@nestjs/common'
import { PrismaModule } from '../database/prisma.module'
import { UserController } from './adapters/in/user.controller'
import { userProviders } from './providers/use-case.providers'

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: userProviders,
})
export class UserModule {}
