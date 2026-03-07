import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FileSystemModule } from './file-system/file-system.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [PrismaModule, FileSystemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
