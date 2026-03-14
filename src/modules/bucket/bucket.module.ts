import { Module } from '@nestjs/common'
import { BUCKET_SERVICE_TOKEN } from './interfaces/bucket-service.interface'
import { MinioStorageService } from './services/minio-storage.service'

@Module({
  providers: [
    {
      provide: BUCKET_SERVICE_TOKEN,
      useClass: MinioStorageService,
    },
  ],
  exports: [BUCKET_SERVICE_TOKEN],
})
export class BucketModule {}
