import { PrismaModule } from '@/database/prisma.module'
import { Module } from '@nestjs/common'
import { FileSystemController } from './adapters/in/file-system.controller'
import { SaveFileUseCase } from './adapters/in/save-file.usecase'
import { FileSystemRepository } from './adapters/out/file-system.repository'

@Module({
  imports: [PrismaModule],
  controllers: [FileSystemController],
  providers: [SaveFileUseCase, FileSystemRepository],
})
export class FileSystemModule {}
