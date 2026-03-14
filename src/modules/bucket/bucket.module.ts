import { Module } from '@nestjs/common'
import { BUCKET_SERVICE } from './interfaces/bucket-service.interface'
import { MinioStorageService } from './services/minio-storage.service'

@Module({
  providers: [
    {
      provide: BUCKET_SERVICE,
      useClass: MinioStorageService,
    },
  ],
  exports: [BUCKET_SERVICE],
})
export class BucketModule {}
