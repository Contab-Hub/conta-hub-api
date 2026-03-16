import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BucketModule } from './modules/bucket/bucket.module'
import { PrismaModule } from './modules/database/prisma.module'
import { FileSystemModule } from './modules/file-system/file-system.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [PrismaModule, BucketModule, FileSystemModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
