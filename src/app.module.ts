import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './database/prisma.module'
import { FileSystemModule } from './file-system/file-system.module'

@Module({
  imports: [PrismaModule, FileSystemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
