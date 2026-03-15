import { Module } from '@nestjs/common'
import { BucketModule } from '../bucket/bucket.module'
import { FileSystemController } from './adapters/in/file-system.controller'
import { fileSystemProviders } from './providers/use-case.providers'

@Module({
  imports: [BucketModule],
  controllers: [FileSystemController],
  providers: fileSystemProviders,
})
export class FileSystemModule {}
